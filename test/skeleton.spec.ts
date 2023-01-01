import { expect } from '@esm-bundle/chai'

import { loadSkeleton } from '../src/skeleton/loadSkeleton'
import { Skeleton } from '../src/skeleton/Skeleton'
import { FileSystemAdapter } from '../src/filesystem/FileSystemAdapter'
import { HTTPFSAdapter } from '../src/filesystem/HTTPFSAdapter'
import { Human } from '../src/Human'
import { WavefrontObj } from '../src/mesh/WavefrontObj'

import { vec4 } from 'gl-matrix'

function almost(left: number, right: number) {
    return Math.abs(left - right) <= 1e-6
}

// https://github.com/makehumancommunity/makehuman-utils/blob/master/io_mhrigging_mhskel/export_mh_rigging.py

// HOWTO CONTINUE
// * add a feature to display/toggle all meshes in the base.obj file, not just the body mesh
// * try to visualise how this relates to the joint data in the mhskel file
//   * draw the joints
//   * draw the bones
//   * draw the planes? maybe as x,y,z vectors on each joint?
// and also find out what's up with the joints with 1, 8, 16 or 24 vertices...
// maybe they are just different types, eg. with 1 to be represented a circle?
//   * rotate bones and re-render the skeleton (maybe start with just one bone and 3 axis)
//   * try to use the weights to adjust the mesh to the modified skeleton

describe("Skeleton", function () {
    this.beforeAll(function () {
        FileSystemAdapter.setInstance(new HTTPFSAdapter())
    })

    it("loads the default.mhskel", function () {
        // the skeleton references Human.meshData, hence we must load the mesh
        const human = Human.getInstance()
        const obj = new WavefrontObj()
        obj.load('data/3dobjs/base.obj')
        human.meshData = obj

        const skel = loadSkeleton("data/rigs/default.mhskel")
        expect(skel.roots).has.lengthOf(1)

        const rootBone = skel.roots[0]
        expect(rootBone.name).equal("root")
        // headPos and tailPost as in makehuman
        expect(rootBone.headPos).to.deep.equal([0, 0.5639, -0.7609])
        expect(rootBone.tailPos).to.deep.equal([0, 0.72685, 0.1445])

        // Bone.build() calculates length, yvector4, matRestGlobal, ...
        expect(rootBone.roll).to.equal("root____plane")
        expect(rootBone.length).to.equal(0.9199466816932041)
        expect(rootBone.yvector4).to.deep.equal(vec4.fromValues(0, 0.9199466816932041, 0, 1))

        // chai-almost isn't esm6 compatible
        const _0 = [
            1, 0, 0, 0,
            0, 0.1771298050880432, 0.9841874837875366, 0,
            0, -0.9841874837875366, 0.1771298050880432, 0,
            0, 0.5638999938964844, -0.7609000205993652, 1
        ].forEach((value, index) => {
            expect(almost(rootBone.matRestGlobal![index], value), `index: ${index} ${rootBone.matRestGlobal![index]} !== ${value}`).to.be.true
        })

        // matRestRelative
        // for the root bone matRestGlobal equals matRestRelative
        const _1 = [
            1, 0, 0, 0,
            0, 0.1771298050880432, 0.9841874837875366, 0,
            0, -0.9841874837875366, 0.1771298050880432, 0,
            0, 0.5638999938964844, -0.7609000205993652, 1
        ].forEach((value, index) => {
            expect(almost(rootBone.matRestRelative![index], value), `index: ${index} ${rootBone.matRestGlobal![index]} !== ${value}`).to.be.true
        })

        const spineBone = rootBone.children.find((bone) => bone.name === "spine05")!
        spineBone.matRestRelative?.forEach((a, i) => console.log(`${i}: ${a}`))
        const _2 = [
            1, 0, 0, 0,
            0, -0.29943329095840454, -0.9541172385215759, 0,
            0, 0.9541172385215759, -0.29943329095840454, 0,
            0, 0.9199466705322266, 0, 1
        ].forEach((value, index) => {
            expect(almost(spineBone.matRestRelative![index], value), `index: ${index} ${rootBone.matRestGlobal![index]} !== ${value}`).to.be.true
        })

        // further:
        // restPoseMatrix
        expect(skel.vertexWeights?.info.name).to.equal("MakeHuman weights")
        expect(skel.vertexWeights?.info.description).to.equal("Weights for default makehuman mesh")
        expect(skel.vertexWeights?.info.version).to.equal(110)
        expect(skel.vertexWeights?.info.license).to.equal("CC0")
        expect(skel.vertexWeights?.info.copyright).to.equal("(c) 2020 Data Collection AB, Joel Palmius, Jonas Hauquier")

        // weights
        //   "name": [{idx,weight}, ...]

    })

    xit("xxx", function () {
        new Skeleton("memory", {
            name: "bones",
            version: "1.0",
            tags: ["t1"],
            description: "desc",
            copyright: "copyleft",
            license: "gpl",

            "bones": {
                "root": {
                    "head": "root____head",             // -> joint
                    "parent": null,                     // -> bone | null
                    "reference": null,                  // -> [bone, ...] | null
                    "rotation_plane": "root____plane",  // -> plane
                    "tail": "root____tail"              // -> joint
                    // "roll": number // while the default mesh/skeleton has no roll, other rigs may need one
                    // "weights_reference": [...] // weights in default_weights.mhv to use?
                },
                "pelvis.L": {
                    "head": "pelvis.L____head",
                    "parent": "root",
                    "reference": null,
                    "rotation_plane": "pelvis.L____plane",
                    "tail": "pelvis.L____tail"
                },
            },

            // A helper joint is a little cube included in the base mesh,
            // that is always morphed accordingly the base mesh.
            // Helper joints are used to recalculate the skeleton after the morphing.
            // Each helper joint is represented by a list of eight vert indices,
            "joints": {
                "root____head": [
                    4223
                ],
                "root____tail": [ // 1, 8, 16 or 24 values -> vertex indices of a joint helper cube?
                    13622,
                    13623,
                    13624,
                    13625,
                    13626,
                    13627,
                    13628,
                    13629
                ],
                "pelvis.L____head": [
                    13622,
                    13623,
                    13624,
                    13625,
                    13626,
                    13627,
                    13628,
                    13629
                ],
                "pelvis.L____tail": [
                    13846,
                    13847,
                    13848,
                    13849,
                    13850,
                    13851,
                    13852,
                    13853
                ],
            },

            "planes": {
                "root____plane": [
                    "root____head",   // -> joint
                    "root____tail",   // -> joint
                    "spine05____tail" // -> joint
                ],
                "pelvis.L____plane": [
                    "upperleg01.L____tail",
                    "upperleg01.L____head",
                    "pelvis.L____head"
                ],
            },
        })
    })
})
