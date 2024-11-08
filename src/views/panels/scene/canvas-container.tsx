import React from 'react'
import {
    BufferAttribute,
    BufferGeometry,
    Color,
    DoubleSide,
    Mesh,
    MeshBasicMaterial,
    TypedArray,
} from 'three'
import { Canvas } from '@react-three/fiber'
import {
    CameraControls,
    Environment,
    GizmoHelper,
    GizmoViewport,
    Select,
    TrackballControls,
} from '@react-three/drei'
import { DataFrame } from '@youwol/dataframe'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { ColorResult } from 'react-color'
import { generateUniqueId } from '../../../utils/generateUniqueId'
import { selectTreeNode } from '../../../redux/tree-view-slice'

export function CanvasContainer() {
    const color = useSelector(
        (state: RootState) => state.basic.sections.surface.color,
    ) as ColorResult
    const nodes = useSelector(
        (state: RootState) => state.basic.sections.nodes.color,
    ) as ColorResult

    return (
        <div id={'canvas-container'} className={'w-100 h-100 '}>
            <Canvas
                shadows
                style={{
                    backgroundColor: `hsl(${color.hsl.h}, ${color.hsl.s * 100}%, ${color.hsl.l * 100}%)`,
                }}
                title={'canvas'}
            >
                <CameraControls />

                {/*<PerspectiveCamera*/}
                {/*    makeDefault*/}
                {/*    fov={90}*/}
                {/*    position={[240, 420, 240]}*/}
                {/*    near={0.0001}*/}
                {/*    far={10000}*/}
                {/*/>*/}
                <ambientLight intensity={Math.PI / 2} />
                <spotLight
                    position={[100, 100, 100]}
                    angle={0.15}
                    penumbra={1}
                    decay={0}
                    intensity={Math.PI}
                />
                <pointLight
                    position={[-10, -10, -10]}
                    decay={0}
                    intensity={Math.PI}
                />

                <Select multiple box>
                    <Models />
                </Select>

                <gridHelper
                    scale={100}
                    args={[30, 30, `${nodes.hex}`, 'gray']}
                />
                <TrackballControls />
                <Environment preset="studio" />
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport
                        axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']}
                        labelColor="white"
                    />
                </GizmoHelper>
            </Canvas>
        </div>
    )
}

const randColor = () => {
    const color = new Color(0xffffff)
    color.setHex(Math.random() * 0xffffff)
    return '#' + color.getHexString()
}

export function meshesArray(dataframeValue: DataFrame[]) {
    return dataframeValue.map((dataframe) => {
        const vertices = dataframe.series.positions.array as TypedArray
        const indices = dataframe.series.indices.array as TypedArray

        const geom = new BufferGeometry()
        geom.setIndex(new BufferAttribute(indices, 1))
        geom.setAttribute('position', new BufferAttribute(vertices, 3))

        const material = new MeshBasicMaterial({
            color: new Color(randColor()),
            side: DoubleSide,
            visible: true,
        })

        const mesh = new Mesh(geom, material)
        const key = generateUniqueId()
        const title = dataframe.userData.name
        const dfs = dataframe

        return { key, title, mesh, dfs, selectedObject: false }
    })
}

const Models = () => {
    const treeData = useSelector((state: RootState) => state.treeView.treeData)
    const dispatch = useDispatch()

    return (
        <group>
            {treeData.map((node) => (
                <primitive
                    key={node.key}
                    object={node.mesh}
                    scale={0.01}
                    onClick={(e: { object: { uuid: string } }) => {
                        dispatch(
                            selectTreeNode({
                                key: node.key,
                                selected:
                                    e.object.uuid === node.mesh.uuid &&
                                    !node.selectedObject,
                            }),
                        )
                    }}
                />
            ))}
        </group>
    )
}
