import { BaseMeshGroup } from "../mesh/BaseMeshGroup"
import { HumanMesh } from "../mesh/HumanMesh"
import { RenderMode } from "./RenderMode"
import { RGBAShader } from "./shader/RGBAShader"
import { TextureShader } from "./shader/TextureShader"
import { ProxyType } from "proxy/Proxy"
import { RenderList } from "./RenderList"
import { prepareCanvas, prepareViewport, createProjectionMatrix, createModelViewMatrix, createNormalMatrix } from "./util"
import { Context } from "./Context"
import { GLView, Projection, RenderHandler } from "GLView"
import { Application } from "Application"

export class RenderHuman extends RenderHandler {
    override paint(app: Application, view: GLView): void {
        app.updateManager.updateIt()
        renderHuman(
            view.ctx,
            view.gl,
            view.programRGBA,
            view.programTex,
            view.texture!,
            view.renderList,
            app.humanMesh,
            app.renderMode.value,
            false
        )
    }
}

function renderHuman(
    ctx: Context,
    gl: WebGL2RenderingContext,
    programRGBA: RGBAShader,
    programTex: TextureShader,
    texture: WebGLTexture,
    renderList: RenderList,
    humanMesh: HumanMesh,
    renderMode: RenderMode,
    wireframe: boolean
): void {
    const WORD_LENGTH = 2

    const canvas = gl.canvas as HTMLCanvasElement
    prepareCanvas(canvas)
    prepareViewport(gl, canvas)
    const projectionMatrix = createProjectionMatrix(canvas, ctx.projection === Projection.PERSPECTIVE)
    const modelViewMatrix = createModelViewMatrix(ctx.rotateX, ctx.rotateY)
    const normalMatrix = createNormalMatrix(modelViewMatrix)

    programRGBA.init(projectionMatrix, modelViewMatrix, normalMatrix)

    gl.enable(gl.CULL_FACE)
    gl.cullFace(gl.BACK)
    gl.depthMask(true)

    let alpha: number
    if (wireframe) {
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
        alpha = 0.3
    } else {
        gl.disable(gl.BLEND)
        alpha = 1
    }

    //
    // JOINTS AND SKELETON
    //
    if (wireframe) {
        const NUMBER_OF_JOINTS = 124
        const offset = humanMesh.baseMesh.groups[2].startIndex * WORD_LENGTH
        const count = humanMesh.baseMesh.groups[2].length * NUMBER_OF_JOINTS

        programRGBA.setColor([1, 1, 1, 1])
        renderList.base.drawSubset(gl.TRIANGLES, offset, count)
        renderList.skeleton.draw(programRGBA, gl.LINES)
    }
    
    //
    // BASEMESH
    //
    renderList.base.bind(programRGBA)

    const MESH_GROUP_INDEX = 0
    const COLOR_INDEX = 1
    const GLMODE_INDEX = 2
    for (let x of [
        [BaseMeshGroup.SKIN, [1, 0.8, 0.7, alpha], gl.TRIANGLES],
        [BaseMeshGroup.EYEBALL0, [0, 0.5, 1, alpha], gl.TRIANGLES],
        [BaseMeshGroup.EYEBALL1, [0, 0.5, 1, alpha], gl.TRIANGLES],
        [BaseMeshGroup.TEETH_TOP, [1, 1, 1, alpha], gl.TRIANGLES],
        [BaseMeshGroup.TEETH_BOTTOM, [1, 1, 1, alpha], gl.TRIANGLES],
        [BaseMeshGroup.TOUNGE, [1, 0, 0, alpha], gl.TRIANGLES],
        [BaseMeshGroup.CUBE, [1, 0, 0.5, alpha], gl.LINE_STRIP],
    ]) {
        const idx = x[MESH_GROUP_INDEX] as number

        if (idx !== BaseMeshGroup.SKIN && wireframe) {
            gl.depthMask(false)
        } else {
            gl.depthMask(true)
        }

        if (idx === BaseMeshGroup.SKIN) {
            continue
        }
        if (renderList.proxies.has(ProxyType.Eyes) &&
            (idx === BaseMeshGroup.EYEBALL0 || idx === BaseMeshGroup.EYEBALL1)) {
            continue
        }
        if (renderList.proxies.has(ProxyType.Teeth) &&
            (idx === BaseMeshGroup.TEETH_TOP || idx === BaseMeshGroup.TEETH_BOTTOM)) {
            continue
        }
        if (renderList.proxies.has(ProxyType.Tongue) && idx === BaseMeshGroup.TOUNGE) {
            continue
        }

        // render
        const rgba = x[COLOR_INDEX] as number[]
        programRGBA.setColor(rgba)
        let offset = humanMesh.baseMesh.groups[idx].startIndex * WORD_LENGTH
        let length = humanMesh.baseMesh.groups[idx].length

        const mode = x[GLMODE_INDEX] as number
        renderList.base.drawSubset(mode, offset, length)
    }

    //
    // PROXIES
    //
    // let glMode = wireframe ? gl.LINES : gl.TRIANGLES
    let glMode = gl.TRIANGLES

    renderList.proxies.forEach((renderMesh, proxyType) => {
        let rgba: number[] = [0.5, 0.5, 0.5, alpha]
        if (proxyType !== ProxyType.Proxymeshes && wireframe) {
            gl.depthMask(false)
        } else {
            gl.depthMask(true)
        }
        switch (proxyType) {
            case ProxyType.Proxymeshes:
                rgba = [1, 0.8, 0.7, alpha]
                break
            case ProxyType.Clothes:
                rgba = [0.5, 0.5, 0.5, alpha]
                break
            case ProxyType.Hair:
                rgba = [0.2, 0.1, 0.1, alpha]
                break
            case ProxyType.Eyes:
                rgba = [0, 0.5, 1, alpha]
                break
            case ProxyType.Eyebrows:
                rgba = [0, 0, 0, alpha]
                break
            case ProxyType.Eyelashes:
                rgba = [0, 0, 0, alpha]
                break
            case ProxyType.Teeth:
                rgba = [1, 1, 1, alpha]
                break
            case ProxyType.Tongue:
                rgba = [1, 0, 0, alpha]
                break
        }
        programRGBA.setColor(rgba)
        renderMesh.draw(programRGBA, glMode)
    })

    //
    // TEXTURED SKIN
    //
    programTex.init(projectionMatrix, modelViewMatrix, normalMatrix)
    programTex.texture(texture, alpha)
    if (!renderList.proxies.has(ProxyType.Proxymeshes)) {
        let offset = humanMesh.baseMesh.groups[BaseMeshGroup.SKIN].startIndex * WORD_LENGTH
        let length = humanMesh.baseMesh.groups[BaseMeshGroup.SKIN].length
        renderList.base.bind(programTex)
        renderList.base.drawSubset(gl.TRIANGLES, offset, length)
    }
}
