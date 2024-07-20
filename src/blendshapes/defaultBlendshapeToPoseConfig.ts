import { FileSystemAdapter } from "filesystem/FileSystemAdapter"
import { BlendshapeToPoseConfig } from "./BlendshapeToPoseConfig"
import { Skeleton } from "skeleton/Skeleton"

export function makeDefaultBlendshapeToPoseConfig(skeleton: Skeleton) {
    const cfg = {
        browDownLeft: { poseUnitWeight: { LeftBrowDown: 1 }, boneTransform: {} },
        browDownRight: { poseUnitWeight: { RightBrowDown: 1 }, boneTransform: {} },
        browInnerUp: { poseUnitWeight: {}, boneTransform: {} },
        browOuterUpLeft: { poseUnitWeight: { LeftOuterBrowUp: 1 }, boneTransform: {} },
        browOuterUpRight: { poseUnitWeight: { RightOuterBrowUp: 1 }, boneTransform: {} },
        cheekPuff: { poseUnitWeight: { CheeksPump: 1 }, boneTransform: {} },
        cheekSquintLeft: { poseUnitWeight: { LeftCheekUp: 1 }, boneTransform: {} },
        cheekSquintRight: { poseUnitWeight: { RightCheekUp: 1 }, boneTransform: {} },
        eyeBlinkLeft: { poseUnitWeight: { LeftUpperLidClosed: 1 }, boneTransform: {} },
        eyeBlinkRight: { poseUnitWeight: { RightUpperLidClosed: 1 }, boneTransform: {} },
        eyeLookDownLeft: { poseUnitWeight: { LeftEyeDown: 1 }, boneTransform: {} },
        eyeLookDownRight: { poseUnitWeight: { RightEyeDown: 1 }, boneTransform: {} },
        eyeLookInLeft: { poseUnitWeight: { LeftEyeturnRight: 1 }, boneTransform: {} },
        eyeLookInRight: { poseUnitWeight: { RightEyeturnLeft: 1 }, boneTransform: {} },
        eyeLookOutLeft: { poseUnitWeight: { LeftEyeturnLeft: 1 }, boneTransform: {} },
        eyeLookOutRight: { poseUnitWeight: { RightEyeturnRight: 1 }, boneTransform: {} },
        eyeLookUpLeft: { poseUnitWeight: { LeftEyeUp: 1 }, boneTransform: {} },
        eyeLookUpRight: { poseUnitWeight: { RightEyeUp: 1 }, boneTransform: {} },
        eyeSquintLeft: { poseUnitWeight: {}, boneTransform: {} },
        eyeSquintRight: { poseUnitWeight: {}, boneTransform: {} },
        eyeWideLeft: { poseUnitWeight: { LeftUpperLidOpen: 1 }, boneTransform: {} },
        eyeWideRight: { poseUnitWeight: { RightUpperLidOpen: 1 }, boneTransform: {} },
        jawForward: { poseUnitWeight: { ChinForward: 1 }, boneTransform: {} },
        jawLeft: { poseUnitWeight: { ChinLeft: 1 }, boneTransform: {} },
        jawOpen: { poseUnitWeight: { JawDrop: 1.5 }, boneTransform: {} },
        jawRight: { poseUnitWeight: { ChinRight: 1 }, boneTransform: {} },
        mouthClose: { poseUnitWeight: {}, boneTransform: {} },
        mouthDimpleLeft: { poseUnitWeight: { MouthLeftPullSide: 1 }, boneTransform: {} },
        mouthDimpleRight: { poseUnitWeight: { MouthRightPullSide: 1 }, boneTransform: {} },
        mouthFrownLeft: { poseUnitWeight: { MouthLeftPlatysma: 1 }, boneTransform: {} },
        mouthFrownRight: { poseUnitWeight: { MouthRightPlatysma: 1 }, boneTransform: {} },
        mouthFunnel: { poseUnitWeight: { LipsKiss: 1 }, boneTransform: {} },
        mouthLeft: { poseUnitWeight: { MouthMoveLeft: 1 }, boneTransform: {} },
        mouthLowerDownLeft: { poseUnitWeight: {}, boneTransform: {} },
        mouthLowerDownRight: { poseUnitWeight: {}, boneTransform: {} },
        mouthPressLeft: { poseUnitWeight: {}, boneTransform: {} },
        mouthPressRight: { poseUnitWeight: {}, boneTransform: {} },
        mouthPucker: { poseUnitWeight: {}, boneTransform: {} },
        mouthRight: { poseUnitWeight: { MouthMoveRight: 1 }, boneTransform: {} },
        mouthRollLower: { poseUnitWeight: { lowerLipBackward: 1 }, boneTransform: {} },
        mouthRollUpper: { poseUnitWeight: { UpperLipBackward: 1 }, boneTransform: {} },
        mouthShrugLower: { poseUnitWeight: { lowerLipUp: 1 }, boneTransform: {} },
        mouthShrugUpper: { poseUnitWeight: { UpperLipUp: 1 }, boneTransform: {} },
        mouthSmileLeft: { poseUnitWeight: { MouthLeftPullUp: 1 }, boneTransform: {} },
        mouthSmileRight: { poseUnitWeight: { MouthRightPullUp: 1 }, boneTransform: {} },
        mouthStretchLeft: { poseUnitWeight: { MouthLeftPullDown: 1 }, boneTransform: {} },
        mouthStretchRight: { poseUnitWeight: { MouthRightPullDown: 1 }, boneTransform: {} },
        mouthUpperUpLeft: { poseUnitWeight: {}, boneTransform: {} },
        mouthUpperUpRight: { poseUnitWeight: {}, boneTransform: {} },
        noseSneerLeft: { poseUnitWeight: {}, boneTransform: {} },
        noseSneerRight: { poseUnitWeight: { NasolabialDeepener: 1 }, boneTransform: {} },
        tongueOut: { poseUnitWeight: { TongueOut: 1 }, boneTransform: {} },
    }
    // return BlendshapeToPoseConfig.fromJSON(skeleton, JSON.stringify(cfg))
    return BlendshapeToPoseConfig.fromJSON(skeleton, FileSystemAdapter.readFile("data/poseunits/face-blendshape-poses.json"))
}
