import { Human } from "./modifier/Human"
import { TargetFactory } from "./target/TargetFactory"
import { loadSkeleton } from "./skeleton/loadSkeleton"
import { loadModifiers } from "./modifier/loadModifiers"
import { loadSliders, SliderNode } from "./modifier/loadSliders"
import { WavefrontObj } from "mesh/WavefrontObj"
import { HumanMesh } from "./mesh/HumanMesh"
import { RenderMode } from "./render/RenderMode"
import { exportCollada } from "mesh/Collada"
import { ProxyType } from "proxy/Proxy"

import { PoseTreeAdapter } from "ui/poseView"
import { PoseNode } from "expression/PoseNode"
import { SliderTreeAdapter } from "ui/morphView"
import { render } from "./render/render"
import { renderFace } from "render/renderFace"

import { FileSystemAdapter } from "./filesystem/FileSystemAdapter"
import { HTTPFSAdapter } from "./filesystem/HTTPFSAdapter"

import { Table } from "toad.js/table/Table"
import { TreeNodeModel } from "toad.js/table/model/TreeNodeModel"
import { TreeAdapter } from "toad.js/table/adapter/TreeAdapter"
import { EnumModel } from "toad.js/model/EnumModel"
import { Tab, Tabs } from "toad.js/view/Tab"
import { Form, FormLabel, FormField, FormHelp } from "toad.js/view/Form"
import { BooleanModel, Button, Checkbox, ref, Select } from "toad.js"
import { ProxyManager } from "./ProxyManager"
import { ExpressionManager } from "expression/ExpressionManager"
import { UpdateManager } from "UpdateManager"

import { TAB, initHistoryManager } from "HistoryManager"
import expressionTab from "ui/expression"
import poseTab from "ui/pose"
import chordataTab from "ui/chordata"

window.onload = () => main()

export function main() {
    try {
        FileSystemAdapter.setInstance(new HTTPFSAdapter())
        run()
        // runMediaPipe()
    } catch (e) {
        console.log(e)
        if (e instanceof Error) {
            alert(`${e.name}: ${e.message}`)
        } else {
            alert(e)
        }
    }
}

// MEDIAPIPE INTEGRATION PLAYGROUND
// [X] assuming that we receive the vertices, render the face
// [ ] have a look at http://www.makehumancommunity.org/wiki/Documentation:Basemesh
//     and provide some controls to manually animate the face
//     (maybe even save the pose in case we have some good ones)
//     MH provides some additional level of abstraction:
//         data/poseunits/face-poseunits.bvh with 60 frames
//         data/poseunits/face-poseunits.json with names for each frame
//         data/expressions/*.pose with percentage for each poseunit
//     expressions are most expressive on old people with teeth, hair and eye brows
//     [X] load bvh
//     [X] load poseunits
//     [X] load expression
//     [X] add face page showing face, list of expression and list of poseunits
//     [X] apply expression
//     [ ] export expression as animation in collada file
//     [ ] animate between expressions?
//         http://www.makehumancommunity.org/wiki/Documentation:Basemesh
//         dark helper bones: no deformation (of the skin), used to guide other bones
// [ ] it seems we get normalized face landmarks, try to get the non-normalized ones
//     coordinates are tripes with z == 0, is there 3d data somewhere available inside?
// [ ] render makehuman head besides mediapipe head
// [ ] try to animate the makehuman head from the mediapipe head
//     (assume that the camera is mounted to the head)
// [ ] to adjust to different people, we might need an initialisation step
// [ ] have a look at shape keys
//     http://www.makehumancommunity.org/wiki/Documentation:Corrective_shape_keys
// [ ] add ability to reconnect (client & server)
// [X] put server side ws code into a separate thread to improve performance
// [ ] record to file
// [ ] read file (either with frames dropped or precise)
// [ ] try opencv motion tracking to track optional markers painted
//     on the real face
export function runMediaPipe() {
    const refCanvas = new (class {
        canvas!: HTMLCanvasElement
    })()
    document.body.replaceChildren(
        ...(
            <>
                <canvas
                    set={ref(refCanvas, "canvas")}
                    style={{ width: "480px", height: "480px", border: "1px #fff solid" }}
                />
            </>
        )
    )
    // const obj = new WavefrontObj('data/canonical_face_model.obj') // uh! not quads

    const enc = new TextEncoder()
    const host = "localhost"
    const port = 9001
    const socket = new WebSocket(`ws://${host}:${port}`)
    socket.binaryType = "arraybuffer"
    socket.onopen = () => {
        console.log(`web socket is open`)
        socket.onmessage = async (msg: MessageEvent) => {
            let arrayBuffer: ArrayBuffer
            if (msg.data instanceof Blob) {
                arrayBuffer = await msg.data.arrayBuffer()
            } else if (msg.data instanceof ArrayBuffer) {
                arrayBuffer = msg.data
            } else {
                console.log("neither blob nor arraybuffer")
                return
            }
            renderFace(refCanvas.canvas, arrayBuffer)
            socket.send(enc.encode("GET FACE"))
        }
        socket.send(enc.encode("GET FACE"))
    }
}

// core/mhmain.py
//   class MHApplication
//     startupSequence()
function run() {
    const references = new (class {
        canvas!: HTMLCanvasElement
        overlay!: HTMLElement
    })()

    console.log("loading assets...")
    const human = new Human()
    const obj = new WavefrontObj("data/3dobjs/base.obj")
    const scene = new HumanMesh(human, obj)
    human.scene = scene

    const proxyManager = new ProxyManager(scene)

    // scene.proxies.set("Proxymeshes", loadProxy(human, "data/proxymeshes/proxy741/proxy741.proxy", "Proxymeshes"))
    // scene.proxies.set("Proxymeshes", loadProxy(human, "data/proxymeshes/female_generic/female_generic.proxy", "Proxymeshes"))
    // scene.proxies.set("Eyes", loadProxy(human, "data/eyes/high-poly/high-poly.mhclo", "Eyes"))
    // scene.proxies.set("Teeth", loadProxy(human, "data/teeth/teeth_base/teeth_base.mhclo", ProxyType.Teeth))
    // scene.proxies.set("Tongue", loadProxy(human, "data/tongue/tongue01/tongue01.mhclo", "Tongue"))

    // human.modified.add(() => scene.updateRequired = Update.MORPH)

    const skeleton = loadSkeleton(scene, "data/rigs/default.mhskel")
    scene.skeleton = skeleton

    // humanmodifier.loadModifiers(getpath.getSysDataPath('modifiers/modeling_modifiers.json'), app.selectedHuman)
    loadModifiers(human, "data/modifiers/modeling_modifiers.json")
    loadModifiers(human, "data/modifiers/measurement_modifiers.json")

    // guimodifier.loadModifierTaskViews(getpath.getSysDataPath('modifiers/modeling_sliders.json'), app.selectedHuman, category)
    const sliderNodes = loadSliders(human, "data/modifiers/modeling_sliders.json")

    loadMacroTargets()

    console.log("everything is loaded...")

    TreeAdapter.register(SliderTreeAdapter, TreeNodeModel, SliderNode)
    TreeAdapter.register(PoseTreeAdapter, TreeNodeModel, PoseNode)

    const renderMode = new EnumModel(RenderMode.POLYGON, RenderMode)
    const tabModel = new EnumModel(TAB.PROXY, TAB)
    tabModel.modified.add(() => {
        if (references.overlay) {
            references.overlay.replaceChildren()
        }
        switch (tabModel.value) {
            case TAB.PROXY:
            case TAB.MORPH:
            case TAB.MEDIAPIPE:
                renderMode.value = RenderMode.POLYGON
                break
            case TAB.POSE:
            case TAB.EXPORT:
                renderMode.value = RenderMode.WIREFRAME
                break
            case TAB.EXPRESSION:
                renderMode.value = RenderMode.EXPRESSION
                break
            case TAB.CHORDATA:
                renderMode.value = RenderMode.CHORDATA
                break
        }
    })
    initHistoryManager(tabModel)

    const morphControls = new TreeNodeModel(SliderNode, sliderNodes)

    // skeleton.poseChanged.add((poseNode) => {
    //     // console.log(`Bone ${poseNode.bone.name} changed to ${poseNode.x.value}, ${poseNode.y.value}, ${poseNode.z.value}`)
    //     if (scene.updateRequired === Update.NONE) {
    //         // console.log(`scene.updateRequired := Update.POSE`)
    //         scene.updateRequired = Update.POSE
    //     }
    // })
    const poseControls = new TreeNodeModel(PoseNode, skeleton.poseNodes)

    const expressionManager = new ExpressionManager(skeleton)
    const updateManager = new UpdateManager(expressionManager, sliderNodes)

    const useBlenderProfile = new BooleanModel(true)
    const limitPrecision = new BooleanModel(false)
    useBlenderProfile.enabled = false
    limitPrecision.enabled = false

    const download = makeDownloadAnchor()

    // The official Makehuman 1.2 menu structure and how it maps to makehuman.js:
    //
    // Files
    //   Load
    //   Save
    //   Export -> Export
    // Modelling -> Morph
    // Geometries -> Proxy
    // Materials -> TBD as part of Proxy
    // Pose/Animate
    //    Skeleton -> nope, only the full/default skeleton for now
    //    Pose -> err... that's only loading predefined poses, not posing
    //    Expression -> Expression
    //    Animations
    // Rendering -> nope
    // Settings
    // Utilities
    //   ...
    //   Expression mixer -> part of Expression
    //   ...
    //   Targets -> TBD as part of Morph
    // Help

    document.body.replaceChildren(
        ...(
            <>
                <Tabs model={tabModel} style={{ position: "absolute", left: 0, width: "500px", top: 0, bottom: 0 }}>
                    <Tab label="Morph" value={TAB.MORPH}>
                        <Table model={morphControls} style={{ width: "100%", height: "100%" }} />
                    </Tab>
                    <Tab label="Proxy" value={TAB.PROXY}>
                        <Form variant="narrow">
                            {proxyManager.allProxyTypes.map((pid) => (
                                <>
                                    <FormLabel>{ProxyType[pid]}</FormLabel>
                                    <FormField>
                                        <Select id={ProxyType[pid]} model={proxyManager.list.get(pid)} />
                                    </FormField>
                                    <FormHelp model={proxyManager.list.get(pid) as any} />
                                </>
                            ))}
                        </Form>
                    </Tab>
                    <Tab label="Pose" value={TAB.POSE}>
                        <Table model={poseControls} style={{ width: "100%", height: "100%" }} />
                    </Tab>
                    <Tab label="Pose2" value={TAB.POSE2}>
                        {poseTab()}
                    </Tab>
                    {expressionTab(expressionManager, scene)}
                    <Tab label="Export" value={TAB.EXPORT}>
                        <div style={{ padding: "10px" }}>
                            <p>
                                <Checkbox
                                    model={useBlenderProfile}
                                    title="Export additional Blender specific information (for material, shaders, bones, etc.)."
                                />{" "}
                                Use Blender Profile
                            </p>
                            <p>
                                <Checkbox
                                    model={limitPrecision}
                                    title="Reduce the precision of the exported data to 6 digits."
                                />{" "}
                                Limit Precision
                            </p>
                            <p>
                                <u>NOTE</u>: When importing into Blender, only the first material may look correct in
                                the UV editor while rendering will still be okay. A workaround is to separate the mesh
                                by material after import. (Edit Mode, P).
                            </p>
                            <p>
                                <u>NOTE</u>: Exporting the pose is not implemented yet. There is just some hardcoded
                                animation of the jaw.
                            </p>
                            <Button action={() => downloadCollada(scene, download)}>Export Collada</Button>
                        </div>
                    </Tab>
                    <Tab label="Mediapipe" value={TAB.MEDIAPIPE}>
                        Mediapipe coming soon
                    </Tab>
                    {chordataTab}
                </Tabs>
                <div style={{ position: "absolute", left: "500px", right: 0, top: 0, bottom: 0, overflow: "hidden" }}>
                    <canvas set={ref(references, "canvas")} style={{ width: "100%", height: "100%" }} />
                    <div
                        set={ref(references, "overlay")}
                        style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, overflow: "hidden" }}
                    ></div>
                </div>
            </>
        )
    )
    render(references.canvas, references.overlay, scene, renderMode, updateManager)
}

function makeDownloadAnchor() {
    const download = document.createElement("a")
    download.type = "text/plain"
    download.style.display = "hidden"
    download.download = "makehuman.dae"
    return download
}

function downloadCollada(scene: HumanMesh, download: HTMLAnchorElement) {
    download.download = "makehuman.dae"
    download.href = URL.createObjectURL(new Blob([exportCollada(scene)], { type: "text/plain" }))
    download.dispatchEvent(new MouseEvent("click"))
}

//
// more makehuman stuff i need to figure out:
//

function loadMacroTargets() {
    const targetFactory = TargetFactory.getInstance()
    // for target in targets.getTargets().findTargets('macrodetails'):
    for (const target of targetFactory.findTargets("macrodetails")) {
        //         #log.debug('Preloading target %s', getpath.getRelativePath(target.path))
        //         algos3d.getTarget(self.selectedHuman.meshData, target.path)
        // console.log(target.path)
        // target.getTarget()
    }
}
