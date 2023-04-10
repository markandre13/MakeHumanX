# makehuman.js

<div style="text-align:npm center">
  <img src="data/screenshot.png" />

  An **experimental** port of [Makehuman](http://www.makehumancommunity.org) to Typescript/The Web.
</div>

## Current Status

* Have a look at [build 2023-04-08](https://markandre13.github.io/makehuman.js/) with toad.js from master branch
* Morph mesh
* Pose skeleton and adjust mesh
* Render a proxy mesh instead of the basemesh
* Export the basemesh and rig as Collada for Blender
* Nothing else... 😅

Next steps:
* Export UVs in Collada

## Why?

* I've been using MakeHuman for more than a decade but often struggled with the UI and the source code.
* I'm up to [something](https://mark13.org) with [Blender](https://www.blender.org) and [Chordata](https://chordata.cc) and in need for full artistic control of the toolchain. 😎

## How does Makehuman work?

### Morph Mesh

#### Data

* data/3dobjs/base.obj contains a 3d model of a human body, called the **base mesh**
* data/target/ contains 1258 [morph targets](https://en.wikipedia.org/wiki/Morph_target_animation),
  which can deform the base mesh's shape, gender, age and ethnicity.

  The morph targets are handmade by editing the basemesh in a 3d editor and
  extracting the changes with [MakeTarget](https://github.com/makehumancommunity/maketarget-standalone).

* data/modifiers/ bundles those morph targets into 249 more user friendly **modifiers**

#### Code
```js
// render's the morphed base mesh
function render(canvas: HTMLCanvasElement, scene: HumanMesh)

// the morphed base mesh
class HumanMesh {
    // input
    obj: Mesh        // the base mesh from the Wavefront Object
    human: Human     // the morph targets

    // processing
    update()         // calculate vertex from obj and human

    // output
    vertex: number[] // the morphed obj.vertex
}

// aggregates all the modifiers and creates a list of morph targets
class Human {
    // input
    modifiers: Map<string, Modifier>
    modifierGroups: Map<string, Modifier[]>

    // output 
    targetsDetailStack: Map<string, number> // morph targets

    // for posing and skinning (see below)
    meshData!: WavefrontObj
    __skeleton!: Skeleton
}

// creates a list of ui elements (sliders, text fields) to edit the modifier values
function loadSliders(filename: string)
```

### Pose Mesh

The skeleton aggregates bones and weights. Bones can be rotated.

#### Data

* data/rigs/default.mhskel the bones making up the skeleton

  for the actual bone positions little cubes within the mesh are referenced,
  so when the mesh is morphed, the skeleton is morphed along with it.
  
* data/rigs/default_weights.mhw the weights each bone has on each vertex

#### Code

```js
// aggregates the bone tree and weight list
class Skeleton {
}

// a single bone
class Bone {
    parent?: Bone
    children: Bone[] = []

    name: string

    yvector4?: vec4 // direction vector of this bone (along y-axis)
    matRestGlobal?: mat4 // bone relative to world
    ...

    // user defined rotation
    matPose: mat4
}

// weights
class VertexBoneWeights {
    // bone name -> [[vertex numbers, ...], [weight for vertex, ...]]
    _data: Map<string, Array<Array<number>>>
}
```

### Proxy

Proxies provide additional meshes, e.g. teeth, tounge, eyes, alternative body
meshes and cloth.

The proxy files contain data which is used to transform the morphed/posed basemesh into a proxy mesh.
These files are created with [MakeClothes](https://github.com/makehumancommunity/community-plugins-makeclothes).

```js
class Proxy {
    // return proxy mesh vertices, adjusted to basemesh morph/pose
    getCoords(baseMeshVertices: number[]): number[]
}
```

## Build

Building needs toad.js from the github master branch. See 'npm link' for further details.

## Run single test

npm run dev:test --file=build/test/skeleton.spec.js

## Next Goals

* export collada (WIP)
* save/load morph
* save/load pose
* posing via mediapipe/chordata (Done: PoC reading data in C++)
  https://github.com/markandre13/mediapipe_cpp_lib
* multiple proxy meshes
* texture
* ...

<!--

TODO
[X] the the other meshes/proxy meshes
[ ] export UV
[ ] export normals
[ ] ...
[ ] export animation

WHAT TO DO TO HANDLE TEXTURES/UV

* definition of faces in Wavefront & Collada is closer to each other than OpenGL
  * Wavefront & Collada define a face by indices into vertex, normal & texcoord tables
  * OpenGL aims at performance, hence the indirection using indices goes away
  * MH morph operates on vertex
  => i'll need to add a layer between opengl and the rest of MH
  => find out about performance, in the end opengl will need FloatArray. can i just use
     those in the code instead of Array<number>() ? can i measure the performance ?
     when i switch to binaries in data/, i might have even more binaries around.
     then get a diagram on how the data flows through MH and optimize it.
     https://v8.dev/blog/dataview

     * HumanMesh.update()
       * Target.apply()

* where to add normals & texture coordinates in Collada
  * function colladaGeometries()
    + <source id="Dariya_Body_001-mesh-map-0">
    +   <float_array id="Dariya_Body_001-mesh-map-0-array" count="3624">...</float_array>
    +   <technique_common>
    +     <accessor source="#Dariya_Body_001-mesh-map-0-array" count="1812" stride="2">
    +       <param name="S" type="float"/>
    +       <param name="T" type="float"/>
    +     </accessor>
    +   </technique_common>
    + </source>

      <polylist ...>
    +    <input semantic="TEXCOORD" source="#Dariya_Body_001-mesh-map-0" offset="2" set="1"/>
       </polylist>

FLOW OF MESH DATA, MORPH, SKINNING & PROXY

* original mesh
* mesh with morphs except current morp
* mesh with current morp
* posed mesh

and for the rest... me thinks i can come up with something on my own

class Group {
    name: string
    startIndex: number  // in points
    length: number      // in points
}

WavefrontObj {
    vertex: number[]    // x0,y0,z0,x1,y1,z1,...
    indices: number[]   // quads in points
    groups: Group[]
}

-----

// the morphed base mesh
HumanMesh {
    human: Human

    obj: Mesh // aka WavefrontObj
    origVertex: number[]
    vertex: number[]
    indices: number[]
    groups: Group[]

    proxy?: Proxy
    proxyMesh?: WavefrontObj

    update() {
        this.vertex = [...this.origVertex]
        // morph this.vertex
        // update skeleton to new morph (temporarily set this.obj.vertex = this.vertex)
        // skin this.vertex (this.human.__skeleton.skinMesh(...))
    }
}

render() will use the proxy mesh

// aggregates all the modifiers and creates a list of morph targets
Human: AnimatedMesh {
    meshData: WavefrontObj // Object3D(name)

    def addBoundMesh(self, mesh, vertexToBoneMapping):

    getRestCoordinates(name) {
        rIdx = self._getBoundMeshIndex(name)
        self.__originalMeshCoords[rIdx][:,:3]
    }

    setProxy()
    setHairProxy()
    setEyesProxy()
    setEyebrowsProxy()
    setEyelashesProxy()
    setTeethProxy()
    setToungeProxy()
    addClothesProxy()
    removeClothesProxy()
}

how upstream Makehuman does it...

# Development Notes

have a look at https://www.npmjs.com/package/avro-js to compress the data files some more

## Makehuman

```
cd /Users/mark/upstream/makehuman/makehuman
./makehuman
pip3.9 install --upgrade --force-reinstall PyQt5
```

-->
