import { ExpressionManager } from "expression/ExpressionManager"
import { TAB } from "HistoryManager"
import { HumanMesh } from "mesh/HumanMesh"
import {
    OptionModel,
    SelectionModel,
    TableEditMode,
} from "toad.js"
import { Table } from "toad.js/table/Table"

import { Tab } from "toad.js/view/Tab"
import { Form } from "toad.js/view/Form"
import { FormSwitch } from "toad.js/view/FormSwitch"
import { FormSelect } from "toad.js/view/FormSelect"

export default function(props: {expressionManager: ExpressionManager, humanMesh: HumanMesh}) {
    const expressionList = new OptionModel(
        props.expressionManager.expressions[0], 
        props.expressionManager.expressions, {
        label: "Expression",
    })
    expressionList.modified.add(() => {
        props.expressionManager.setExpression(expressionList.value)
    })

    // FIXME: TableEditMode shouldn't be part of SelectionModel
    // FIXME: also: this was a pain to find... :(
    const sm = new SelectionModel(TableEditMode.EDIT_CELL)
    return (
        <Tab label="Expression" value={TAB.EXPRESSION} style={{ overflow: "none" }}>
            <Form>
                <FormSelect model={expressionList} />
                <FormSwitch model={props.humanMesh.wireframe}/>
            </Form>
            <Table selectionModel={sm} model={props.expressionManager.model} style={{ width: "487px", height: "100%" }} />
        </Tab>
    )
}
