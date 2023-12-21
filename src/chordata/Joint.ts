import { mat4, vec3, vec4 } from "gl-matrix"
import { Skeleton } from "skeleton/Skeleton"
import { getMatrix } from "skeleton/loadSkeleton"
import { bones } from "./renderChordata"

export class Joint {
    branch: number
    id: number
    name: string
    children?: Joint[]

    parent?: Joint
    matRestGlobal!: mat4
    matRestRelative!: mat4
    length!: number
    yvector4!: vec4

    matPoseGlobal!: mat4

    matNPoseInv!: mat4

    matPose!: mat4
    matPoseInv!: mat4

    constructor(branch: number, id: number, name: string, children?: Joint[]) {
        this.branch = branch
        this.id = id
        this.name = name
        this.children = children
        if (children !== undefined) {
            children.forEach(it => it.parent = this)
        }
    }

    // only needed once (similar to the makehuman skeleton/bone)
    build(skeleton: Skeleton) {
        if (this.matRestGlobal !== undefined) {
            return
        }
        //
        // get head and tail
        //
        const b0 = skeleton.getBone(this.name)
        const head3 = vec3.create()
        vec3.transformMat4(head3, head3, b0.matPoseGlobal!)

        let tail3!: vec3
        if (this.children === undefined) {
            tail3 = vec3.fromValues(b0.yvector4![0], b0.yvector4![1], b0.yvector4![2])
            vec3.scale(tail3, tail3, 4)
            vec3.transformMat4(tail3, tail3, b0.matPoseGlobal!)
        } else {
            const j1 = this.children[0]
            const b1 = skeleton.getBone(j1.name)
            tail3 = vec3.create()
            vec3.transformMat4(tail3, tail3, b1.matPoseGlobal!)
        }

        //
        // calculate restGlobal and restRelative
        //
        let normal = vec3.fromValues(0, 1, 0)

        this.matRestGlobal = getMatrix(head3, tail3, normal)
        this.length = vec3.distance(head3, tail3)
        if (this.parent === undefined) {
            this.matRestRelative = this.matRestGlobal
        } else {
            this.matRestRelative = mat4.mul(
                mat4.create(),
                mat4.invert(mat4.create(), this.parent.matRestGlobal!),
                this.matRestGlobal
            )
        }
        this.yvector4 = vec4.fromValues(0, this.length, 0, 1)

        if (this.children !== undefined) {
            for (const j1 of this.children) {
                j1.build(skeleton)
            }
        }
    }

    // update matPoseGlobal
    update() {
        let matPose = bones.get(`${this.branch}/${this.id}`)!
        if (this.matNPoseInv !== undefined) {
            matPose = mat4.multiply(mat4.create(), matPose, this.matNPoseInv)
        }
        if (this.parent !== undefined) {
            // this.matPose = mat4.multiply(mat4.create(), this.parent.matPose, matPose)
            // mat4.multiply(matPose, matPose, this.parent.matPoseInv)
            this.matPoseGlobal = mat4.multiply(
                mat4.create(),
                this.parent.matPoseGlobal!,
                mat4.multiply(mat4.create(), this.matRestRelative!, matPose!)
            )
            // mat4.multiply(this.matPoseGlobal, this.matPoseGlobal, this.parent.matPoseInv)
        } else {
            // this.matPose = mat4.copy(mat4.create(), matPose)
            this.matPoseGlobal = mat4.multiply(mat4.create(), this.matRestRelative!, matPose!)
        }
        this.matPose = mat4.copy(mat4.create(), matPose)
        this.matPoseInv = mat4.invert(mat4.create(), this.matPose) // THIS IS NOT ENOUGH, WE MUST ALSO TRANSLATE BETWEEN TWO LOCAL COORDINATE SYSTEMS
        if (this.children !== undefined) {
            for (const child of this.children) {
                child.update()
            }
        }
    }
}
