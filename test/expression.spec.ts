import { expect, use } from '@esm-bundle/chai'
import { chaiString } from './chai/chaiString'
use(chaiString)
import { chaiAlmost } from "./chai/chaiAlmost"
use(chaiAlmost(0.00001))

import { mat4, vec3, quat2 } from 'gl-matrix'

import { FileSystemAdapter } from '../src/filesystem/FileSystemAdapter'
import { HTTPFSAdapter } from '../src/filesystem/HTTPFSAdapter'
import { loadSkeleton } from '../src/skeleton/loadSkeleton'
import { Human } from '../src/modifier/Human'
import { HumanMesh } from '../src/mesh/HumanMesh'
import { WavefrontObj } from '../src/mesh/WavefrontObj'
import { toEuler } from '../src/mesh/Collada'
import { calcWebGL, ExpressionManager } from '../src/ExpressionManager'

import { laugh01_IN, laugh01_mrg, laugh01_OUT } from '../src/laugh01'
import { python_bvh } from '../src/python_bvh'
import { base_anim_data } from '../src/base_anim_data'

// 2_posing_expression.py
//     class ExpressionTaskView(gui3d.TaskView, filecache.MetadataCacher):
//         def _load_pose_units(self):
//              self.base_bvh = bvh.load("data/poseunits/face-poseunits.bvh", allowTranslation="none"))
//              self.base_anim = self.base_bvh.createAnimationTrack(self.human.getBaseSkeleton(), name="Expression-Face-PoseUnits")
//              self.poseunit_names = loadJson("poseunits/face-poseunits.json").framemapping
//              self.base_anim = animation.PoseUnit(self.base_anim.name, self.base_anim._data, self.poseunit_names)
//         def chooseExpression(self, filename):
//             self.selectedPose = animation.poseFromUnitPose('expr-lib-pose', filename, self.base_anim)
// animation.py
//     def poseFromUnitPose(name, filename, poseUnit):
//         return Pose(name, emptyPose()).fromPoseUnit(filename, poseUnit)
//     class Pose(AnimationTrack):
//         def fromPoseUnit(self, filename, poseUnit):
//             self._data = poseUnit.getBlendedPose(list(self.unitposes.keys()), list(self.unitposes.values()), only_data=True)
//     class PoseUnit(AnimationTrack):
//         def getBlendedPose(self, poses, weights, additiveBlending=True, only_data=False):
//             ...

describe("expression", function () {

    this.beforeAll(function () {
        FileSystemAdapter.setInstance(new HTTPFSAdapter())
    })

    function m2s(name: string, m: mat4) {
        return `${name} =
[${m[0]}, ${m[1]}, ${m[2]}, ${m[3]},
 ${m[4]}, ${m[5]}, ${m[6]}, ${m[7]},
 ${m[8]}, ${m[9]}, ${m[10]}, ${m[11]},
 ${m[12]}, ${m[13]}, ${m[14]}, ${m[15]}]`
    }

    function q22s(name: string, q: quat2) {
        return `${name} = [${q[0]}, ${q[1]}, ${q[2]}, ${q[3]}, ${q[4]}, ${q[5]}, ${q[6]}, ${q[7]}]`
    }

    it("python matrix order", function () {
        const poseMats = mat4.fromValues(
            0.36235777, 0., 0.9320391, 10.,
            0., 1., 0., 11.,
            -0.9320391, 0., 0.36235777, 12.,
            0., 0., 0., 1.)
        // console.log(m2s(poseMats))

        const matRestGlobal = mat4.fromValues(
            0.921061, -0.38941833, 0., 10.243435,
            0.38941833, 0.921061, 0., 27.130648,
            0., 0., 1., 22.,
            0., 0., 0., 1.)
        // console.log(m2s(matRestGlobal))

        let matPose = calcPython(poseMats, matRestGlobal)

        // console.log(m2s(matPose))

        const out = mat4.fromValues(
            0.45905408, 0.22870827, 0.8584649, 0.,
            0.22870828, 0.90330374, -0.3629531, 0.,
            -0.85846484, 0.3629531, 0.36235777, 0.,
            0., 0., 0., 1.)

        expect(matPose).to.deep.almost.equal(out)
    })

    it("webgl matrix order", function () {
        const poseMats = mat4.fromValues(
            0.36235777, 0., 0.9320391, 10.,
            0., 1., 0., 11.,
            -0.9320391, 0., 0.36235777, 12.,
            0., 0., 0., 1.)
        mat4.transpose(poseMats, poseMats)

        const matRestGlobal = mat4.fromValues(
            0.921061, -0.38941833, 0., 10.243435,
            0.38941833, 0.921061, 0., 27.130648,
            0., 0., 1., 22.,
            0., 0., 0., 1.)
        mat4.transpose(matRestGlobal, matRestGlobal)

        let matPose = calcWebGL(poseMats, matRestGlobal)

        const expectedValue = mat4.fromValues(
            0.45905408, 0.22870827, 0.8584649, 0.,
            0.22870828, 0.90330374, -0.3629531, 0.,
            -0.85846484, 0.3629531, 0.36235777, 0.,
            0., 0., 0., 1.)
        mat4.transpose(expectedValue, expectedValue)

        expect(matPose).to.deep.almost.equal(expectedValue)

        const { x, y, z } = toEuler(matPose)
        console.log(`x: ${x}, y: ${y}, z: ${z}`)
        console.log(m2s(`matPose`, matPose))
    })
    it("jaw (python)", function () {
        const matRestGlobal = mat4.fromValues(
            1.0000000e+00, 0.0000000e+00, -3.4035770e-09, 0.0000000e+00,
            -1.8546673e-09, -8.3848995e-01, -5.4491717e-01, 7.0325418e+00,
            -2.8538647e-09, 5.4491717e-01, -8.3848995e-01, 5.6428331e-01,
            0.0000000e+00, 0.0000000e+00, 0.0000000e+00, 1.0000000e+00)

        const z = -14.271322 // rotation relative to BVH
        // const poseMat = mat4.fromValues(
        //     1., 0., 0., 0,
        //     0., 0.9691392, -0.24651398, 0,
        //     0., 0.24651398, 0.9691392, 0,
        //     0, 0, 0, 1)
        const poseMat = mat4.fromRotation(mat4.create(), z / 360 * 2 * Math.PI, vec3.fromValues(1, 0, 0))
        // console.log(m2s(poseMat))

        const out = mat4.fromValues(
            1.0000000e+00, 8.3902929e-10, -1.0503709e-10, 0.0000000e+00,
            -8.3902907e-10, 9.6913916e-01, -2.4651399e-01, 0.0000000e+00,
            -1.0503731e-10, 2.4651399e-01, 9.6913916e-01, 0.0000000e+00,
            0.0000000e+00, 0.0000000e+00, 0.0000000e+00, 1.0000000e+00)

        let matPose = calcPython(poseMat, matRestGlobal)

        // console.log(m2s(matPose))
        // console.log(m2s(out))

        expect(matPose).to.deep.almost.equal(out)
    })

    it("jaw (webgl)", function () {
        // makehuman will have two skeletons.

        // this is jaws matRestGlobal from the 2nd skeleton
        const matRestGlobal = mat4.fromValues(
            1.0000000e+00, 0.0000000e+00, -3.4035770e-09, 0.0000000e+00,
            -1.8546673e-09, -8.3848995e-01, -5.4491717e-01, 7.0325418e+00,
            -2.8538647e-09, 5.4491717e-01, -8.3848995e-01, 5.6428331e-01,
            0.0000000e+00, 0.0000000e+00, 0.0000000e+00, 1.0000000e+00)
        mat4.transpose(matRestGlobal, matRestGlobal)
        const z = -14.271322 // rotation relative to BVH
        // const poseMat = mat4.fromValues(
        //     1., 0., 0., 0,
        //     0., 0.9691392, -0.24651398, 0,
        //     0., 0.24651398, 0.9691392, 0,
        //     0, 0, 0, 1)
        const poseMat = mat4.fromRotation(mat4.create(), -z / 360 * 2 * Math.PI, vec3.fromValues(1, 0, 0))
        // mat4.transpose(poseMat, poseMat)
        // console.log(m2s(poseMat))

        const out = mat4.fromValues(
            1.0000000e+00, 8.3902929e-10, -1.0503709e-10, 0.0000000e+00,
            -8.3902907e-10, 9.6913916e-01, -2.4651399e-01, 0.0000000e+00,
            -1.0503731e-10, 2.4651399e-01, 9.6913916e-01, 0.0000000e+00,
            0.0000000e+00, 0.0000000e+00, 0.0000000e+00, 1.0000000e+00)
        mat4.transpose(out, out)

        let matPose = calcWebGL(poseMat, matRestGlobal)

        // console.log(m2s(matPose))
        // console.log(m2s(out))

        expect(matPose).to.deep.almost.equal(out)
    })

    function calcPython(poseMat: mat4, matRestGlobal: mat4) {
        let matPose = mat4.fromValues(
            poseMat[0], poseMat[1], poseMat[2], 0,
            poseMat[4], poseMat[5], poseMat[6], 0,
            poseMat[8], poseMat[9], poseMat[10], 0,
            0, 0, 0, 1
        )
        const invRest = mat4.invert(mat4.create(), matRestGlobal)
        const m0 = mat4.multiply(mat4.create(), matRestGlobal, matPose)
        mat4.multiply(matPose, m0, invRest)
        matPose[3] = matPose[7] = matPose[11] = 0
        return matPose
    }

    xit("with real word data", async function () {
        this.timeout(10000)

        // python's matRestGlobal for root is (but only when doing the expression!!!)
        //  [[ 1.0000000e+00  5.9630129e-10 -8.2031509e-10  0.0000000e+00]
        //   [-8.5134000e-10  5.4039057e-02 -9.9853885e-01  5.1756668e-01]
        //   [-5.5110094e-10  9.9853879e-01  5.4039061e-02 -6.4773333e-01]
        //   [ 0.0000000e+00  0.0000000e+00  0.0000000e+00  1.0000000e+00]]

        const human = new Human()
        const obj = new WavefrontObj('data/3dobjs/base.obj')
        const scene = new HumanMesh(human, obj)
        const skeleton = loadSkeleton(scene, 'data/rigs/default.mhskel')
        // for (const bone of skeleton.boneslist!) {
        //     if (bone.name === "root" || bone.name === "jaw" || bone.name === "spine05") {
        //         console.log(m2s(`${bone.name}.matRestGlobal`, bone.matRestGlobal!))
        //     }
        // }

        let boneIdx = 0
        for (let mrgIdx = 0, pmIdx = 0, outIdx = 0; mrgIdx < laugh01_mrg.length;) {
            const bone = skeleton.boneslist![boneIdx++]

            // if (bone.name !== "root" && bone.name !== "spine05" && bone.name !== "jaw" && bone.name !== "head") {
            //     continue
            // }

            const mrg = mat4.create()
            for (let j = 0; j < 16; ++j) {
                mrg[j] = laugh01_mrg[mrgIdx++]
            }
            mat4.transpose(mrg, mrg)

            const pm = mat4.create()
            for (let j = 0; j < 12; ++j) {
                pm[j] = laugh01_IN[pmIdx++]
            }
            mat4.transpose(pm, pm)

            const pout = mat4.create()
            for (let j = 0; j < 16; ++j) {
                pout[j] = laugh01_OUT[outIdx++]
            }
            mat4.transpose(pout, pout)
            const out = calcWebGL(pm, mrg)

            let diff = false
            const epsilon = Number.EPSILON
            for (let i = 0; i < 16; ++i) {
                if (Math.abs(bone.matRestGlobal![i] - mrg[i]) >= epsilon) {
                    diff = true
                }
            }

            // console.log(`---------------------------------------- ${bone.name} ----------------------------------------`)
            // if (diff) {
            //     console.log(`matRestGlobal differs for bone ${bone.name}`)
            // }
            // console.log(m2s(`bone  .matRestGlobal`, bone.matRestGlobal!))
            // console.log(m2s(`python.matRestGlobal`, mrg))

            // console.log(m2s(`my     poseMat`, out))
            // console.log(m2s(`python poseMat`, pout))

        }

    })

    it("BVH.jointslists[].matrixPoses[]", function () {
        const human = new Human()
        const obj = new WavefrontObj('data/3dobjs/base.obj')
        const scene = new HumanMesh(human, obj)
        const skeleton = loadSkeleton(scene, "data/rigs/default.mhskel")

        const mgr = new ExpressionManager(skeleton)

        mgr.facePoseUnits.jointslist.forEach((joint, i) => {
            expect(joint.name).to.equal(python_bvh[i].name)
            expect(joint.frames, `frames for joint '${joint.name} at index ${i}'`).to.deep.almost.equal(python_bvh[i].frames)
            joint.matrixPoses.forEach((m, j) => {
                const a = python_bvh[i].matrixPoses[j] as number[]
                const e = mat4.fromValues(
                    a[0], a[1], a[2], a[3],
                    a[4], a[5], a[6], a[7],
                    a[8], a[9], a[10], a[11],
                    a[12], a[13], a[14], a[15]
                )
                mat4.transpose(e, e)
                expect(m, `matrixPoses mismatch for joint ${i} '${joint.name}', frame ${j}`).to.deep.almost.equal(e)
            })
        })
    })

    it("createAnimationTrack()", function () {
        // GIVEN some real world MH data
        
        const human = new Human()
        const obj = new WavefrontObj('data/3dobjs/base.obj')
        const scene = new HumanMesh(human, obj)
        const skeleton = loadSkeleton(scene, "data/rigs/default.mhskel")

        const mgr = new ExpressionManager(skeleton)

        const boneCount = skeleton.boneslist!.length
        const frameCount = mgr.facePoseUnits.frameCount

        // WHEN createAnimationTrack()
        const base_anim: mat4[] = mgr.facePoseUnits.createAnimationTrack(skeleton, "Expression-Face-PoseUnits")

        // THEN it's the same as in MH 1.2 (Python)
        let pythonIdx = 0, typescriptIdx = 0
        for (let frame = 0; frame < frameCount; ++frame) {
            for (let bone = 0; bone < boneCount; ++bone) {
                const e = mat4.create()
                for (let j = 0; j < 12; ++j) {
                    e[j] = base_anim_data[pythonIdx++]
                }
                mat4.transpose(e, e)
                const v = base_anim[typescriptIdx++]
                expect(v, `bone ${bone} '${skeleton.boneslist![bone].name}', frame ${frame}`).to.deep.almost.equal(e)
            }
        }
    })

    it("poseFromUnitPose()", function () {
        
        const human = new Human()
        const obj = new WavefrontObj('data/3dobjs/base.obj')
        const scene = new HumanMesh(human, obj)
        const skeleton = loadSkeleton(scene, "data/rigs/default.mhskel")

        const mgr = new ExpressionManager(skeleton)

        const result = mgr.fromPoseUnit("laugh01")

        // CHECK THE RESULT
        for (let frame = 0; frame < mgr.facePoseUnits.frameCount; ++frame) {
            for (let b_idx = 0, pmIdx = 0; b_idx < skeleton.boneslist!.length; ++b_idx) {
                const expectPoseMat = mat4.create()
                for (let j = 0; j < 12; ++j) {
                    expectPoseMat[j] = laugh01_OUT[pmIdx++]
                }
                mat4.transpose(expectPoseMat, expectPoseMat)

                expect(result[b_idx], m2s(`result[${b_idx}]`, result[b_idx]) + m2s(`\nexpectPoseMat`, expectPoseMat) + `\n`).to.deep.almost.equal(expectPoseMat)
            }
        }
    })
})
