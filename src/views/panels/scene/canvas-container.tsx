import React, { useRef } from 'react'
import {
    BufferAttribute,
    BufferGeometry,
    Color,
    DoubleSide,
    Mesh,
    MeshBasicMaterial,
    Raycaster,
    TypedArray,
    Vector2,
} from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
    Center,
    Environment,
    GizmoHelper,
    GizmoViewport,
    PerspectiveCamera,
    TrackballControls,
} from '@react-three/drei'
import { useNodeColorContext } from '../../../context/display-panel/basic/nodes'
import { useDataFrameContext } from '../../../context/data-frames/data-frame-context'
import { DataFrame } from '@youwol/dataframe'

export function CanvasContainer() {
    const { color } = useNodeColorContext()
    const { dataframeValue } = useDataFrameContext()

    const meshes = meshesArray(dataframeValue)

    return (
        <div id={'canvas-container'} className={'w-100 h-100 '}>
            <Canvas
                shadows
                style={{
                    backgroundColor: `hsl(${color.hsl.h}, ${color.hsl.s * 100}%, ${color.hsl.l * 100}%)`,
                }}
                title={'canvas'}
            >
                <PerspectiveCamera
                    makeDefault
                    fov={90}
                    position={[240, 420, 240]}
                    near={0.0001}
                    far={10000}
                />
                <ClickableMeshGroup meshes={meshes} />
                <gridHelper scale={100} args={[30, 30, 'red', 'gray']} />
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

function ClickableMeshGroup({ meshes }: { meshes: Mesh[] }) {
    const { camera } = useThree()
    const { color } = useNodeColorContext()

    const raycaster = useRef(new Raycaster())
    const mouse = useRef(new Vector2())

    const handleClick = (event: MouseEvent) => {
        // Convert the mouse position to normalized device coordinates (-1 to 1 range)
        const canvas = event.target as HTMLCanvasElement
        const bounds = canvas.getBoundingClientRect()
        mouse.current.x =
            ((event.clientX - bounds.left) / canvas.clientWidth) * 2 - 1
        mouse.current.y =
            -((event.clientY - bounds.top) / canvas.clientHeight) * 2 + 1

        raycaster.current.setFromCamera(mouse.current, camera)
        const intersects = raycaster.current.intersectObjects(meshes)

        if (intersects.length > 0) {
            const selectedMesh = intersects[0].object as Mesh
            const selectedMesh1 = selectedMesh.material as MeshBasicMaterial
            selectedMesh1.wireframe = !selectedMesh1.wireframe
            selectedMesh1.color.setRGB(
                color.rgb.r / 255,
                color.rgb.g / 255,
                color.rgb.b / 255,
            )
            selectedMesh1.visible = !selectedMesh1.visible
            console.log(
                'Selected Material attributes:',
                selectedMesh.material as MeshBasicMaterial,
            )
        }
    }

    useFrame(({ gl }) => {
        gl.domElement.addEventListener('click', handleClick)
        return () => {
            gl.domElement.removeEventListener('click', handleClick)
        }
    })

    return (
        <Center>
            {meshes.map((m) => (
                <primitive key={m.id} object={m} scale={0.01} />
            ))}
        </Center>
    )
}

function meshesArray(dataframeValue: DataFrame[]) {
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

        return new Mesh(geom, material)
    })
}

const randColor = () => {
    const color = new Color(0xffffff)
    color.setHex(Math.random() * 0xffffff)
    return '#' + color.getHexString()
}
