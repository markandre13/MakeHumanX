import { calcWebGL } from "expression/calcWebGL"
import { mat4, quat2 } from "gl-matrix"
import { quaternion_slerp } from "lib/quaternion_slerp"
import { isZero } from "mesh/HumanMesh"
import { makeDefaultBlendshapeToPoseConfig } from "blendshapes/defaultBlendshapeToPoseConfig"
import { BlendshapeToPose } from "./BlendshapeToPose"
import { REST_QUAT } from "UpdateManager"
import { BlendshapeModel } from "./BlendshapeModel"
import { MHFacePoseUnits } from "./MHFacePoseUnits"
import { Skeleton } from "skeleton/Skeleton"
import { IBlendshapeConverter } from "./IBlendshapeConverter"
import { BlendshapeToPoseConfig } from "./BlendshapeToPoseConfig"

export class BlendshapeConverter implements IBlendshapeConverter {
    private blendshapes2quat2s?: BlendshapeToPose
    private faceposeunits?: MHFacePoseUnits
    private cfgset?: BlendshapeToPoseConfig

    convert(blendshapeModel: BlendshapeModel, skeleton: Skeleton) {
        if (this.blendshapes2quat2s === undefined) {
            this.blendshapes2quat2s = new BlendshapeToPose()
        }
        if (this.faceposeunits === undefined) {
            this.faceposeunits = new MHFacePoseUnits(skeleton)
        }
        if (this.cfgset === undefined) {
            this.cfgset = makeDefaultBlendshapeToPoseConfig(skeleton)
        }

        this.cfgset.convert(this.faceposeunits, this.blendshapes2quat2s)

        const ql = new Array<quat2 | undefined>(skeleton.boneslist!.length)
        ql.fill(undefined)
        blendshapeModel.forEach((name, weight) => {
            const boneQuatList = this.blendshapes2quat2s!.get(name)
            if (boneQuatList === undefined) {
                // console.log(`could not find ${name}`)
                return
            }
            // tweaks for mediapipe
            // if (name === "mouthFunnel") {
            //     weight *= 2.5
            // }
            // if (name === "jawOpen") {
            //     weight *= 1.5
            // }
            if (isZero(weight)) {
                return
            }
            // console.log(`${name} has weight ${weight}`)
            for (let bq of boneQuatList) {
                const q = quaternion_slerp(REST_QUAT, bq.q, weight)
                if (ql[bq.bone.index] === undefined) {
                    ql[bq.bone.index] = q
                } else {
                    quat2.multiply(ql[bq.bone.index]!, q, ql[bq.bone.index]!)
                }
            }
        })
        // copy to skeleton
        ql.forEach((q, i) => {
            if (q !== undefined) {
                const poseMat = mat4.fromQuat2(mat4.create(), q)
                const bone = skeleton.boneslist![i]
                bone.matPose = calcWebGL(poseMat, bone.matRestGlobal!)
            } else {
                mat4.identity(skeleton.boneslist![i].matPose)
            }
        })

    }
}
