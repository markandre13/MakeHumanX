import { Mode } from 'Mode'
import { Human } from '../Human'
import { getTarget } from '../target/TargetFactory'
import { Mesh, Group } from './Mesh'

let epsilon = 0.000000001

export function isZero(a: number): boolean {
    return Math.abs(a) <= epsilon
}

export class HumanMesh {
    human: Human
    obj: Mesh
    origVertex: number[]
    vertex: number[]
    indices: number[]
    groups: Group[]
    mode!: Mode

    updateRequired = false

    constructor(human: Human, obj: Mesh) {
        this.human = human
        this.obj = obj
        this.vertex = this.origVertex = obj.vertex
        this.indices = obj.indices
        this.groups = obj.groups
    }

    update(): void {
        if (!this.updateRequired) {
            return
        }
        this.updateRequired = false
        
        this.vertex = [...this.origVertex]
        this.human.targetsDetailStack.forEach( (value, targetName) => {
            if (isNaN(value)) {
                // console.log(`HumanMesh.update(): ignoring target ${targetName} with value NaN`)
                return
            }

            if (isZero(value) || isNaN(value))
                return
            // console.log(`HumanMesh.update(): apply target ${targetName} with value ${value}`)
            const target = getTarget(targetName)
            target.apply(this.vertex, value)
        })
    }
}
