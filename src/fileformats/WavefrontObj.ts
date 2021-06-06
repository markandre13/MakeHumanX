import { StringToLine } from './lib/StringToLine'
import { FileSystemAdapter } from '../filesystem/FileSystemAdapter'
import { Mesh, Group } from './Mesh'

export class WavefrontObj implements Mesh {
    vertex: number[]
    indices: number[]
    groups: Group[]

    constructor() {
        this.vertex = new Array<number>()
        this.indices = new Array<number>()
        this.groups = new Array<Group>()
    }

    async load(filename: string) {
        const data = FileSystemAdapter.getInstance().readFile(filename)
        const vertex = new Array<number>()
        const indices = new Array<number>()
        // const primitives = new Array<any>()
        const group = new Map<string, number>()
        const reader = new StringToLine(data)
        //  const reader = readline.createInterface(input)
        let lineNumber = 0
        for (let line of reader) {
            ++lineNumber
            // console.log(line)
            line = line.trim()
            if (line.length === 0)
                continue
            if (line[0] === '#')
                continue
            const tokens = line.split(/\s+/)
            switch(tokens[0]) {
            // vertex data
            case 'v': // vertex X Y Z [W]
                if (tokens.length < 4)
                    throw Error(`Too few arguments in ${line}`)
                if (tokens.length > 5)
                    throw Error(`Too many arguments in ${line}`)
                vertex.push(parseFloat(tokens[1]))
                vertex.push(parseFloat(tokens[2]))
                vertex.push(parseFloat(tokens[3]))
                if (tokens.length === 5)
                    throw Error('Can\'t handle vertex with weight yet...')
                    //     vertex.push(parseFloat(tokens[4]))
                    // else
                    //     vertex.push(1)
                break
            case 'vt': // vectex texture U V W
                // ignored for now
                break
            case 'vn': break // vertex normal I J K
            case 'vp': break // vertext parameter space U V W

                // free-form curve/surface attributes
            case 'deg': break
            case 'bmat': break
            case 'step': break
            case 'cstype': break

                // elements
            case 'p': break // point
            case 'l': break // line
            case 'f': // face( vertex[/[texture][/normal]])+
                if (tokens.length !== 5)
                    throw Error(`can't handle faces which are not quads yet (line ${lineNumber}: '${line}'}`)
                    // CONVERT QUAD INTO TRIANGLE FOR WEBGL
                    // 0   1
                    //
                    // 3   2
                for(let i=1; i<tokens.length; ++i) {
                    const split = tokens[i].split('/')
                    indices.push(parseInt(split[0], 10)-1)
                }
                const idx = indices.length - 4
                indices.push(indices[idx+0])
                indices.push(indices[idx+2])
                break
            case 'curv': break // curve
            case 'curv2': break // 2d curve
            case 'surf': break // surface

                // free-form curve/surface body statements
            case 'parm': break
            case 'trim': break
            case 'hole': break
            case 'scrv': break
            case 'sp': break
            case 'end': break

                // connectivity between free-form surfaces
            case 'con': break

                // grouping
            case 'g': // <groupname>+ the following elements belong to that group
                this.groups.push(new Group(tokens[1], indices.length))
                break
            case 's': break
            case 'mg': break
            case 'o': break

                // display/render attributes
            case 'bevel': break
            case 'c_interp': break
            case 'd_interp': break
            case 'lod': break
            case 'usemtl': // <materialname>
                break
            case 'mtllib': break
            case 'shadow_obj': break
            case 'trace_obj': break
            case 'ctech': break
            case 'stech': break

            default:
                throw Error(`Unknown keyword '${tokens[0]}' in Wavefront OBJ file in line '${line}' of length ${line.length}'.`)
            }
        }
        this.vertex = vertex
        this.indices = indices
        for(let i=0; i<this.groups.length-1; ++i) {
            this.groups[i].length = this.groups[i+1].start - this.groups[i].start
        }
        this.groups[this.groups.length-1].length = indices.length - this.groups[this.groups.length-1].start
    }
}
