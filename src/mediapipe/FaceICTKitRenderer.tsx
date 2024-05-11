import { Application } from "Application"
import { GLView, Projection, RenderHandler } from "GLView"
import { WavefrontObj } from "mesh/WavefrontObj"
import {
    createModelViewMatrix,
    createNormalMatrix,
    createProjectionMatrix,
    prepareCanvas,
    prepareViewport,
} from "render/util"
import { RenderMesh } from "render/RenderMesh"
import { Frontend_impl } from "./Frontend_impl"
import { Target } from "target/Target"
import { isZero } from "mesh/HumanMesh"
import { blendshapeNames } from "./blendshapeNames"

/**
 * Render MediaPipe's blendshape using ICT's FaceKit Mesh
 */
export class FaceICTKitRenderer extends RenderHandler {
    mesh!: RenderMesh
    frontend: Frontend_impl
    neutral: WavefrontObj
    targets = new Array<Target>(blendshapeNames.length)

    constructor(frontend: Frontend_impl) {
        super()
        this.frontend = frontend

        const scale = 0.6
        this.neutral = new WavefrontObj("data/blendshapes/ict/_neutral.obj")
        for (let i = 0; i < this.neutral.vertex.length; ++i) {
            this.neutral.vertex[i] = this.neutral.vertex[i] * scale
        }
        for (let blendshape = 0; blendshape < blendshapeNames.length; ++blendshape) {
            if (blendshape === 0) {
                continue
            }
            let name = blendshapeNames[blendshape]
            switch (name) {
                case "browInnerUp":
                    name = "browInnerUp_L"
                    break
                case "cheekPuff":
                    name = "cheekPuff_L"
                    break
            }
            let dst = new WavefrontObj(`data/blendshapes/ict/${name}.obj`)
            for (let i = 0; i < this.neutral.vertex.length; ++i) {
                dst.vertex[i] = dst.vertex[i] * scale
            }
            const target = new Target()
            target.diff(this.neutral.vertex, dst.vertex)
            if (name === "browInnerUp_L") {
                dst = new WavefrontObj(`data/blendshapes/ict/browInnerUp_R.obj`)
                for (let i = 0; i < this.neutral.vertex.length; ++i) {
                    dst.vertex[i] = dst.vertex[i] * scale
                }
                target.apply(dst.vertex, 1)
                target.diff(this.neutral.vertex, dst.vertex)
            }
            if (name === "cheekPuff_L") {
                dst = new WavefrontObj(`data/blendshapes/ict/cheekPuff_R.obj`)
                for (let i = 0; i < this.neutral.vertex.length; ++i) {
                    dst.vertex[i] = dst.vertex[i] * scale
                }
                target.apply(dst.vertex, 1)
                target.diff(this.neutral.vertex, dst.vertex)
            }
            this.targets[blendshape] = target
        }
    }

    override paint(app: Application, view: GLView): void {
        const gl = view.gl
        const ctx = view.ctx
        const programRGBA = view.programRGBA

        const vertex = new Float32Array(this.neutral.vertex.length)
        vertex.set(this.neutral!.vertex)
        for (let blendshape = 0; blendshape < blendshapeNames.length; ++blendshape) {
            if (blendshape === 0) {
                continue
            }
            const weight = this.frontend.getBlendshapeWeight(blendshapeNames[blendshape])
            if (isZero(weight)) {
                continue
            }
            this.targets[blendshape].apply(vertex, weight)
        }
        if (this.mesh) {
            this.mesh.update(vertex)
        } else {
            this.mesh = new RenderMesh(gl, vertex, this.neutral.fxyz, undefined, undefined, true)
        }

        const canvas = app.glview.canvas as HTMLCanvasElement
        prepareCanvas(canvas)
        prepareViewport(gl, canvas)
        const projectionMatrix = createProjectionMatrix(canvas, ctx.projection === Projection.PERSPECTIVE)
        const modelViewMatrix = createModelViewMatrix(ctx.rotateX, ctx.rotateY)
        const normalMatrix = createNormalMatrix(modelViewMatrix)

        programRGBA.init(projectionMatrix, modelViewMatrix, normalMatrix)

        gl.enable(gl.CULL_FACE)
        gl.cullFace(gl.BACK)
        gl.depthMask(true)
        gl.disable(gl.BLEND)

        programRGBA.setColor([1, 0.8, 0.7, 1])
        this.mesh.bind(programRGBA)
        gl.drawElements(gl.TRIANGLES, this.neutral.fxyz.length, gl.UNSIGNED_SHORT, 0)
    }
}
