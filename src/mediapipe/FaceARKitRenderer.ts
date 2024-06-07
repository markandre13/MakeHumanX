import { Application } from "Application"
import { GLView, Projection, RenderHandler } from "render/GLView"
import {
    createModelViewMatrix,
    createNormalMatrix,
    createProjectionMatrix,
    prepareCanvas,
    prepareViewport,
} from "render/util"
import { RenderMesh } from "render/RenderMesh"
import { Frontend_impl } from "../net/Frontend_impl"
import { isZero } from "mesh/HumanMesh"
import { blendshapeNames } from "./blendshapeNames"
import { FaceARKitLoader } from "./FaceARKitLoader"
import { mat4, vec3 } from "gl-matrix"

/**
 * Render MediaPipe's blendshape using Apples ARKit Mesh
 */
export class FaceARKitRenderer extends RenderHandler {
    mesh!: RenderMesh
    frontend: Frontend_impl
    blendshapeSet?: FaceARKitLoader

    constructor(frontend: Frontend_impl) {
        super()
        this.frontend = frontend
    }

    override paint(app: Application, view: GLView): void {
        if (this.blendshapeSet === undefined) {
            this.blendshapeSet = FaceARKitLoader.getInstance().preload()
        }
        const gl = view.gl
        const ctx = view.ctx
        const programRGBA = view.programRGBA

        const vertex = this.blendshapeSet.getVertex(this.frontend)
        const neutral = this.blendshapeSet.neutral!

        if (this.mesh) {
            this.mesh.update(vertex)
        } else {
            this.mesh = new RenderMesh(gl, vertex, neutral!.fxyz, undefined, undefined, false)
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
        gl.drawElements(gl.TRIANGLES, neutral!.fxyz.length, gl.UNSIGNED_SHORT, 0)
    }
}
