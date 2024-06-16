import { ORB } from "corba.js"
import { Backend } from "net/makehuman_stub"
import { Frontend as Frontend_skel } from "net/makehuman_skel"
import { UpdateManager } from "UpdateManager"
import { handleChordata } from "chordata/chordata"
import { BlendshapeModel } from "blendshapes/BlendshapeModel"

export class Frontend_impl extends Frontend_skel {
    updateManager: UpdateManager
    // expressionModel: ExpressionModel
    blendshapeModel = new BlendshapeModel()

    backend?: Backend

    constructor(orb: ORB, updateManager: UpdateManager) {
        super(orb)
        this.updateManager = updateManager
    }

    /*
     *
     */
    override chordata(data: Uint8Array): void {
        // console.log(`got ${data.length} byte chordata packet`)
        handleChordata(this.updateManager, data)
    }

    /*
     * blendshapes
     */

    // data received from mediapipe
    landmarks?: Float32Array
    transform?: Float32Array

    // list of blendshape names that will be send to faceLandmarks()
    override faceBlendshapeNames(faceBlendshapeNames: Array<string>): void {
        this.blendshapeModel.setBlendshapeNames(faceBlendshapeNames)
    }

    override faceLandmarks(
        landmarks: Float32Array,
        blendshapes: Float32Array,
        transform: Float32Array,
        timestamp_ms: bigint
    ): void {
        this.landmarks = landmarks
        this.transform = transform
        this.updateManager.invalidateView()
        this.blendshapeModel.setBlendshapeWeights(blendshapes)
    }
}
