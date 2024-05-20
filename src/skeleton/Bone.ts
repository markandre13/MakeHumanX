import { vec3, mat4, vec4 } from "gl-matrix"
import { getMatrix, get_normal } from "./loadSkeleton"
import { Skeleton } from "./Skeleton"
import { Skeleton as ChordataSkeleton } from "chordata/Skeleton"
import { euler_from_matrix, euler_matrix } from "lib/euler_matrix"

export class Bone {
    skeleton: Skeleton
    name: string
    index: number = -1 // index within Skeleton.boneslist
    headJoint: string
    tailJoint: string
    headPos = [0, 0, 0] // FIXME: vec3
    tailPos = [0, 0, 0] // FIXME: vec3
    roll: string | Array<string>
    length = 0

    parent?: Bone
    children: Bone[] = []

    level: number
    reference_bones = []

    // user defined relative pose
    matPose: mat4

    // calculated rest position
    matRestGlobal?: mat4 // bone relative to world (move, rotate)
    matRestRelative?: mat4 // bone relative to parent
    yvector4?: vec4 // direction vector of this bone

    // calculated pose positions
    matPoseGlobal?: mat4 // relative to world, use to render the skeleton (TODO: change that and get rid of this variable)
    matPoseVerts?: mat4 // relative to world and own rest pose, used for skinning

    // shared/skeleton.py: 709
    constructor(
        skeleton: Skeleton,
        name: string,
        parentName: string | null,
        headJoint: string,
        tailJoint: string,
        roll: string,
        reference_bones?: any,
        weight_reference_bones?: any
    ) {
        this.skeleton = skeleton
        this.name = name
        this.headJoint = headJoint
        this.tailJoint = tailJoint
        this.roll = roll

        this.updateJointPositions()

        if (parentName !== null) {
            this.parent = this.skeleton.getBone(parentName)
            this.parent!.children.push(this)
        }

        if (this.parent) {
            this.level = this.parent.level + 1
        } else {
            this.level = 0
        }

        // self.reference_bones = []  # Used for mapping animations and poses
        // if reference_bones is not None:
        //     if not isinstance(reference_bones, list):
        //         reference_bones = [ reference_bones ]
        //     self.reference_bones.extend( set(reference_bones) )
        // self._weight_reference_bones = None  # For mapping vertex weights (can be automatically set by c
        // if weight_reference_bones is not None:
        //     if not isinstance(weight_reference_bones, list):
        //         weight_reference_bones = [ weight_reference_bones ]
        //     self._weight_reference_bones = list( set(weight_reference_bones) )

        this.matPose = mat4.identity(mat4.create()) // not posed yet
    }

    // FIXME: WTF???
    get planes(): Map<string, Array<string>> {
        return this.skeleton.planes
    }

    getRestHeadPos(): vec3 {
        return vec3.fromValues(this.headPos[0], this.headPos[1], this.headPos[2])
    }

    getRestTailPos(): vec3 {
        return vec3.fromValues(this.tailPos[0], this.tailPos[1], this.tailPos[2])
    }

    getRestOffset(): vec3 {
        if (this.parent) {
            return vec3.sub(vec3.create(), this.getRestHeadPos(), this.parent.getRestHeadPos())
        } else {
            return this.getRestHeadPos()
        }
    }

    hasChild(name: string): boolean {
        for (const child of this.children) {
            if (this.name === name) {
                return true
            }
            if (child.hasChild(name)) {
                return true
            }
        }
        return false
    }

    hasChildren(): boolean {
        return this.children.length !== 0
    }

    // line 768
    // Update the joint positions of this bone based on the current state
    // of the human mesh.
    // Remember to call build() after calling this method.
    updateJointPositions(in_rest: boolean = true) {
        // if not human:
        //   from core import G
        //   human = G.app.selectedHuman
        // self.headPos[:] = self.skeleton.getJointPosition(self.headJoint, human, in_rest)[:3] * self.skeleton.scale
        // self.tailPos[:] = self.skeleton.getJointPosition(self.tailJoint, human, in_rest)[:3] * self.skeleton.scale
        this.headPos = this.skeleton.getJointPosition(this.headJoint, in_rest)!
        this.tailPos = this.skeleton.getJointPosition(this.tailJoint, in_rest)!
    }

    // line 826
    // called from Skeleton.build(ref_skel), which is called from Skeleton.constructor()
    // Calculate this bone's rest matrices and determine its local axis (roll
    // or bone normal).
    // Sets matPoseVerts, matPoseGlobal and matRestRelative.
    // This method needs to be called everytime the skeleton structure is
    // changed, the rest pose is changed or joint positions are updated.
    // Pass a ref_skel to copy the bone normals from a reference skeleton
    // instead of recalculating them (Recalculating bone normals generally
    // only works if the skeleton is in rest pose).
    build(ref_skel?: any) {
        const head3 = vec3.fromValues(this.headPos[0], this.headPos[1], this.headPos[2])
        const tail3 = vec3.fromValues(this.tailPos[0], this.tailPos[1], this.tailPos[2])
        this.length = vec3.distance(head3, tail3)
        this.yvector4 = vec4.fromValues(0, this.length, 0, 1)

        let normal
        if (ref_skel) {
            throw Error("not implemented yet")
        } else {
            normal = this.get_normal()
        }
        this.matRestGlobal = getMatrix(head3, tail3, normal)
        if (this.parent === undefined) {
            this.matRestRelative = this.matRestGlobal
        } else {
            this.matRestRelative = mat4.mul(
                mat4.create(),
                mat4.invert(mat4.create(), this.parent.matRestGlobal!),
                this.matRestGlobal
            )
        }
    }

    // calculate matPoseGlobal & matPoseVerts
    update() {
        // console.log(`Bone.update() ${this.name}`)
        if (this.parent !== undefined) {
            this.matPoseGlobal = mat4.multiply(
                mat4.create(),
                this.parent.matPoseGlobal!,
                mat4.multiply(mat4.create(), this.matRestRelative!, this.matPose!)
            )
        } else {
            this.matPoseGlobal = mat4.multiply(mat4.create(), this.matRestRelative!, this.matPose!)
        }
        this.matPoseVerts = mat4.multiply(
            mat4.create(),
            this.matPoseGlobal,
            mat4.invert(mat4.create(), this.matRestGlobal!)
        )
    }

    updateChordata(skeleton: ChordataSkeleton) {
        const joint = skeleton.getMHJoint(this.name)
        let chordata: mat4
        if (joint === undefined) {
            chordata = mat4.create()
        } else {
            chordata = joint.relative! // getCalibrated()
        }

        let P: mat4
        if (this.parent !== undefined) {
            P = mat4.multiply(mat4.create(), this.parent.matPoseGlobal!, this.matRestRelative!)
        } else {
            P = mat4.clone(this.matRestRelative!)
        }

        const matPose = mat4.multiply(mat4.create(), chordata, P)
        this.matPoseGlobal = matPose
        this.matPoseGlobal[12] = P[12]
        this.matPoseGlobal[13] = P[13]
        this.matPoseGlobal[14] = P[14]

        // N-POSE
        const D = Math.PI / 180
        switch (this.name) {
            case "upperarm01.R":
                mat4.rotateZ(this.matPoseGlobal, this.matPoseGlobal, 40 * D)
                break
            case "lowerarm01.R":
                mat4.rotateX(this.matPoseGlobal, this.matPoseGlobal, -45 * D)
                break
            case "upperleg01.R":
                mat4.rotateZ(this.matPoseGlobal, this.matPoseGlobal, -10 * D)
                break
            case "upperarm01.L":
                mat4.rotateZ(this.matPoseGlobal, this.matPoseGlobal, -40 * D)
                break
            case "lowerarm01.L":
                mat4.rotateX(this.matPoseGlobal, this.matPoseGlobal, -45 * D)
                break
            case "upperleg01.L":
                mat4.rotateZ(this.matPoseGlobal, this.matPoseGlobal, 10 * D)
                break
        }
        this.matPoseVerts = mat4.multiply(
            mat4.create(),
            this.matPoseGlobal,
            mat4.invert(mat4.create(), this.matRestGlobal!)
        )
    }

    get_normal(): vec3 {
        let normal
        if (this.roll instanceof Array) {
            throw Error("Not implemented yet")
            // # Average the normal over multiple planes
            // count = 0
            // normal = np.zeros(3, dtype=np.float32)
            // for plane_name in self.roll:
            //     norm = get_normal(self.skeleton, plane_name, self.planes)
            //     if not np.allclose(norm, np.zeros(3), atol=1e-05):
            //         count += 1
            //         normal += norm
            // if count > 0 and not np.allclose(normal, np.zeros(3), atol=1e-05):
            //     normal /= count
            // else:
            //     normal = np.asarray([0.0, 1.0, 0.0], dtype=np.float32)
        } else if (typeof this.roll === "string") {
            const plane_name = this.roll // TODO ugly.. why not call this something else than "roll"?
            normal = get_normal(this.skeleton, plane_name, this.planes)
            // if np.allclose(normal, np.zeros(3), atol=1e-05):
            //     normal = np.asarray([0.0, 1.0, 0.0], dtype=np.float32)
        } else {
            normal = vec3.fromValues(0, 1, 0)
        }
        return normal
    }
}
