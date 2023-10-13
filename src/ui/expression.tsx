import { ExpressionManager } from "expression/ExpressionManager"
import { TAB } from "HistoryManager"
import { HumanMesh } from "mesh/HumanMesh"
import { Skeleton } from "skeleton/Skeleton"
import {
    Button,
    OptionModel,
    Select,
    SelectionModel,
    Switch,
    TableAdapter,
    TableEditMode,
    TablePos,
} from "toad.js"
import { Table } from "toad.js/table/Table"
import { StringArrayModel } from "toad.js/table/model/StringArrayModel"
import { StringArrayAdapter } from "toad.js/table/adapter/StringArrayAdapter"

import { Tab } from "toad.js/view/Tab"
import { ExpressionModel } from "../expression/ExpressionModel"
import { Form, FormField, FormHelp, FormLabel } from "toad.js/view/Form"
import { UpdateManager } from "UpdateManager"

class ExpressionAdapter extends TableAdapter<ExpressionModel> {
    constructor(model: ExpressionModel) {
        super(model)
        // this.config.editMode = EditMode.EDIT_ON_ENTER
    }
    override get colCount(): number {
        return 6
    }
    override getColumnHead(col: number) {
        switch (col) {
            case 0:
                return <>Pose Unit</>
            case 2:
                return <>Bone</>
            case 3:
                return <>X</>
            case 4:
                return <>Y</>
            case 5:
                return <>Z</>
        }
        return <>Value</>
    }
    override showCell(pos: TablePos, cell: HTMLSpanElement) {
        // cell.style.padding = "2px"
        switch (pos.col) {
            case 0:
                if (pos.row < this.model.poseUnit.length) {
                    cell.innerText = this.model.poseUnit[pos.row].label!
                    // cell.replaceChildren(...(<>{this.model.poseUnit[pos.row].label}</>))
                }
                break
            case 1:
                if (pos.row < this.model.poseUnit.length) {
                    cell.style.width = "50px"
                    cell.style.textAlign = "right"
                    cell.innerText = this.model.poseUnit[pos.row].value.toString()
                    // cell.replaceChildren(<TextField style={{ width: "60px" }} model={this.model.poseUnit[pos.row]} />)
                }
                break
            case 2:
                if (pos.row < this.model.bone.length) {
                    const label = this.model.bone[pos.row].x.label
                    if (label !== undefined) {
                        // cell.replaceChildren(...(<>{label}</>))
                        cell.innerText = label
                    }
                }
                break
            case 3:
                if (pos.row < this.model.bone.length) {
                    cell.style.width = "50px"
                    cell.style.textAlign = "right"
                    cell.innerText = this.model.bone[pos.row].x.value.toString()
                    // cell.replaceChildren(<TextField style={{ width: "60px" }} model={this.model.bone[pos.row].x} />)
                }
                break
            case 4:
                if (pos.row < this.model.bone.length) {
                    cell.style.width = "50px"
                    cell.style.textAlign = "right"
                    cell.innerText = this.model.bone[pos.row].y.value.toString()
                    // cell.replaceChildren(<TextField style={{ width: "60px" }} model={this.model.bone[pos.row].y} />)
                }
                break
            case 5:
                if (pos.row < this.model.bone.length) {
                    cell.style.width = "50px"
                    cell.style.textAlign = "right"
                    cell.innerText = this.model.bone[pos.row].z.value.toString()
                    // cell.replaceChildren(<TextField style={{ width: "60px" }} model={this.model.bone[pos.row].z} />)
                }
                break
        }
    }
    // override editCell(pos: TablePos, cell: HTMLSpanElement): void {
        
    // }
    override saveCell(pos: TablePos, cell: HTMLSpanElement): void {
        console.log(`saveCell ${pos.col}, ${pos.row} := ${cell.innerText}`)
        switch (pos.col) {
            case 3:
                this.model.bone[pos.row].x.value = parseFloat(cell.innerText)
                break
        }
    }
}
TableAdapter.register(StringArrayAdapter, StringArrayModel)
TableAdapter.register(ExpressionAdapter, ExpressionModel)

export default function (expressionManager: ExpressionManager, scene: HumanMesh) {

    const expressionList = new OptionModel(expressionManager.expressions[0], expressionManager.expressions, {
        label: "Expression",
    })
    expressionList.modified.add(() => {
        expressionManager.setExpression(expressionList.value)
    })

    // FIXME: TableEditMode shouldn't be part of SelectionModel
    // FIXME: also: this was a pain to find... :(
    const sm = new SelectionModel(TableEditMode.EDIT_CELL)
    return (
        <Tab label="Expression" value={TAB.EXPRESSION} style={{ overflow: "none" }}>
            <Form>
                <FormLabel model={expressionList} />
                <FormField>
                    <Select model={expressionList} />
                </FormField>
                <FormHelp model={expressionList} />

                <FormLabel model={scene.wireframe} />
                <FormField>
                    <Switch model={scene.wireframe} />
                </FormField>
                <FormHelp model={scene.wireframe} />
            </Form>
            <Button action={() => {
                const head = scene.skeleton.poseNodes.find("head")!
                const x = head.x.value + 5
                console.log(`update head.x to ${x}`)
                head.x.value = x
                console.log(head.x.value)
            }}>Test</Button>
            <Table selectionModel={sm} model={expressionManager.model} style={{ width: "487px", height: "100%" }} />
        </Tab>
    )
}
