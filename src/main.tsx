/*

TODO: IT'S TIME TO CLEAR UP THIS MESS
[ ] instead of passing indiviual models around, group them into a class and pass that around
    it will be basically like a bunch of global variables. but at the moment i'm not sure
    how all the parts of the app will relate to each other
[ ] render, UpdateManager, ...
    * have something like setRenderer(...) which is called when a tab is activated
    * Tab has visibilityChange(state: "visible" | "hidden") property
    * it will need the canvas and the overlay
    * name... RenderView?, GLView? => WE NOW HAVE 'GlView'
[ ] get rid of the ui/ directory and instead clean up the root directory to match the UI structure
    application/
      file/
      morph/
      proxy/
      pose/
      expression/
      mediapipe/
      chordata/
      glview/
    makehuman/ ;; all the code from makehuman
    main.tsx   ;; an no other files to make it prominent!
*/

import { SliderNode } from "./modifier/loadSliders"

import { PoseNode } from "expression/PoseNode"
import { PoseUnitsModel } from "expression/PoseUnitsModel"

import { ProxyType } from "proxy/Proxy"

import ExpressionTab from "ui/expression"
import FileTab from "FileTab"
import ChordataTab from "chordata/chordata"
import { PoseTreeAdapter } from "ui/poseView"
import { SliderTreeAdapter } from "ui/morphView"
import { PoseUnitsAdapter } from "ui/PoseUnitsAdapter"
import { TAB } from "HistoryManager"

import { FileSystemAdapter } from "./filesystem/FileSystemAdapter"
import { HTTPFSAdapter } from "./filesystem/HTTPFSAdapter"

import { Table } from "toad.js/table/Table"
import { TreeNodeModel } from "toad.js/table/model/TreeNodeModel"
import { TreeAdapter } from "toad.js/table/adapter/TreeAdapter"
import { Tab, Tabs } from "toad.js/view/Tab"
import { Form, FormLabel, FormField, FormHelp } from "toad.js/view/Form"
import { Action, Select, Signal, TableAdapter } from "toad.js"
import { StringArrayAdapter } from "toad.js/table/adapter/StringArrayAdapter"
import { StringArrayModel } from "toad.js/table/model/StringArrayModel"
import { MediapipeTab } from "mediapipe/mediapipe"
import { Application, setRenderer } from "Application"
import { GLView } from "render/GLView"
import { RenderHuman } from "render/RenderHuman"
import { BlendShapeTab } from "BlendShapeTab"

export function main() {
    try {
        FileSystemAdapter.setInstance(new HTTPFSAdapter())
        run()
    } catch (e) {
        console.log(e)
        if (e instanceof Error) {
            alert(`${e.name}: ${e.message}`)
        } else {
            alert(e)
        }
    }
}

function run() {
    const app = new Application()

    const mhm = localStorage.getItem("MakeHumanMorph")
    if (mhm != null) {
        app.humanMesh.human.fromMHM(mhm)
    }
    const mhp = localStorage.getItem("MakeHumanPose")
    if (mhp != null) {
        app.skeleton.fromMHP(mhp)
    }
    document.onvisibilitychange = (e) => {
        localStorage.setItem("MakeHumanMorph", app.humanMesh.human.toMHM())
        localStorage.setItem("MakeHumanPose", app.skeleton.toMHP())
    }

    TreeAdapter.register(SliderTreeAdapter, TreeNodeModel, SliderNode)
    TreeAdapter.register(PoseTreeAdapter, TreeNodeModel, PoseNode)

    TableAdapter.register(StringArrayAdapter, StringArrayModel)
    TableAdapter.register(PoseUnitsAdapter, PoseUnitsModel as any) // FIXME: cast to 'any'??? WTF???

    const oiah = "calc((12/16) * 1rem + 8px"
    const connector = new Connector()

    document.body.replaceChildren(
        ...(
            <>
                <Tabs
                    model={app.tabModel}
                    style={{ position: "absolute", left: 0, width: "500px", top: 0, bottom: oiah }}
                >
                    <FileTab app={app} />
                    <MorphTab app={app} />
                    <ProxyTab app={app} />
                    <PoseTab app={app} />
                    <BlendShapeTab app={app} />
                    {/* <ExpressionTab app={app} /> */}
                    <MediapipeTab app={app} />
                    <ChordataTab app={app} />
                </Tabs>
                <GLView
                    app={app}
                    style={{ position: "absolute", left: "500px", right: 0, top: 0, bottom: 0, overflow: "hidden" }}
                />
                <div
                    style={{
                        background: "var(--tx-gray-50)",
                        padding: "2px",
                        paddingLeft: "8px",
                        margin: 0,
                        border: "none",
                        position: "absolute",
                        left: 0,
                        width: "490px",
                        height: "calc((12/16) * 1rem + 4px",
                        bottom: 0,
                        overflow: "hidden",
                    }}
                >
                    <ConnectButton connector={connector} /> | human.mh
                </div>
            </>
        )
    )
}

function sleep(milliseconds: number = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("success")
        }, milliseconds)
    })
}

// IBM 3270 terminology
// * Operator Information Area: the status line at the bottom of the terminal window
// * Communication Check: the area displaying the communication status to the host
// * Communication Reminder Symbol: the crossed out Z symbol

enum ConnectionState {
    NOT_CONNECTED,
    CONNECTING,
    CONNECTED,
}

class Connector {
    signal = new Signal()
    private m_state = ConnectionState.NOT_CONNECTED
    peer = "localhost:9001"

    async connect() {
        this.state = ConnectionState.CONNECTING
        await sleep(2000)
        this.state = ConnectionState.CONNECTED
    }

    get state() {
        return this.m_state
    }
    set state(state: ConnectionState) {
        if (this.state === state) {
            return
        }
        this.m_state = state
        this.signal.trigger()
    }
}

function ConnectButton(props: { connector: Connector }) {
    const connector = props.connector
    const s = document.createElement("span")
    // s.replaceChildren(document.createTextNode(connector.peer))
    const update = () => {
        // console.log(`update state to ${connector.state}`)
        switch (connector.state) {
            case ConnectionState.NOT_CONNECTED:
                s.classList.remove("connecting")
                s.style.color = "var(--tx-warning-color)"
                // s.title = "NOT CONNECTED"
                s.replaceChildren(document.createTextNode("NOT CONNECTED"))
                break
            case ConnectionState.CONNECTING:
                s.classList.add("connecting")
                s.style.color = ""
                // s.title = "CONNECTING"
                s.replaceChildren(document.createTextNode("CONNECTING"))
                break
            case ConnectionState.CONNECTED:
                s.classList.remove("connecting")
                s.style.color = "var(--tx-gray-700)"
                // s.title = "CONNECTED"
                s.replaceChildren(document.createTextNode("CONNECTED"))
                break
        }
    }
    update()
    connector.signal.add(update)
    s.style.cursor = "default"
    s.onpointerdown = (ev: MouseEvent) => {
        ev.preventDefault()
        connector.connect()
    }
    return s
}

function MorphTab(props: { app: Application }) {
    return (
        <Tab label="Morph" value={TAB.MORPH} visibilityChange={setRenderer(props.app, new RenderHuman())}>
            <Table model={props.app.morphControls} style={{ width: "100%", height: "100%" }} />
        </Tab>
    )
}

function ProxyTab(props: { app: Application }) {
    return (
        <Tab label="Proxy" value={TAB.PROXY} visibilityChange={setRenderer(props.app, new RenderHuman())}>
            <Form variant="narrow">
                {props.app.proxyManager.allProxyTypes.map((pid) => (
                    <>
                        <FormLabel>{ProxyType[pid]}</FormLabel>
                        <FormField>
                            <Select id={ProxyType[pid]} model={props.app.proxyManager.list.get(pid)} />
                        </FormField>
                        <FormHelp model={props.app.proxyManager.list.get(pid) as any} />
                    </>
                ))}
            </Form>
        </Tab>
    )
}

function PoseTab(props: { app: Application }) {
    return (
        <Tab label="Pose" value={TAB.POSE} visibilityChange={setRenderer(props.app, new RenderHuman())}>
            <Table model={props.app.poseControls} style={{ width: "100%", height: "100%" }} />
        </Tab>
    )
}

main()
