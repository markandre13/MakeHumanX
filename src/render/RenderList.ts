import { vec4 } from "gl-matrix"
import { HumanMesh } from "../mesh/HumanMesh"
import { RenderMesh } from "./RenderMesh"
import { ProxyType } from "proxy/Proxy"

export class RenderList {
    gl: WebGL2RenderingContext
    scene: HumanMesh

    base: RenderMesh
    proxies = new Map<ProxyType, RenderMesh>();
    skeleton: RenderMesh

    constructor(gl: WebGL2RenderingContext, scene: HumanMesh) {
        this.gl = gl
        this.scene = scene
        this.base = new RenderMesh(gl, scene.vertexRigged, scene.baseMesh.fxyz, scene.baseMesh.uv, scene.baseMesh.fuv)
        scene.proxies.forEach((proxy) => {
            this.proxies.set(proxy.type, new RenderMesh(gl, proxy.getCoords(scene.vertexRigged), proxy.mesh.fxyz))
        })
        const skel = renderSkeletonGlobal(scene)
        this.skeleton = new RenderMesh(gl, new Float32Array(skel.vertex), skel.indices, undefined, undefined, false)
    }

    update() {
        this.scene.update()
        this.base.update(this.scene.vertexRigged)
        this.proxies.forEach((renderMesh, type) => {
            const proxy = this.scene.proxies.get(type)!
            const vertexMorphed = proxy.getCoords(this.scene.vertexMorphed)
            const vertexWeights = proxy.getVertexWeights(this.scene.skeleton.vertexWeights!)
            const vertexRigged = this.scene.skeleton.skinMesh(vertexMorphed, vertexWeights!._data)
            renderMesh.update(vertexRigged)
        })
    }
}

// render the skeleton using matRestGlobal
function renderSkeletonGlobal(scene: HumanMesh) {
    const skel = scene.skeleton
    const v = vec4.fromValues(0, 0, 0, 1)
    const vertex = new Array<number>(skel.boneslist!.length * 6)
    const indices = new Array<number>(skel.boneslist!.length * 2)
    skel.boneslist!.forEach((bone, index) => {
        const m = bone.matPoseGlobal ? bone.matPoseGlobal : bone.matRestGlobal!
        const a = vec4.transformMat4(vec4.create(), v, m)
        const b = vec4.transformMat4(vec4.create(), bone.yvector4!, m)
        const vi = index * 6
        const ii = index * 2
        vertex[vi] = a[0]
        vertex[vi + 1] = a[1]
        vertex[vi + 2] = a[2]
        vertex[vi + 3] = b[0]
        vertex[vi + 4] = b[1]
        vertex[vi + 5] = b[2]
        indices[ii] = index * 2
        indices[ii + 1] = index * 2 + 1
    })
    return { vertex, indices }
}