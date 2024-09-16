import React from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  TypedArray,
} from "three";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  Environment,
  GizmoHelper,
  GizmoViewport,
  PerspectiveCamera,
  TrackballControls,
} from "@react-three/drei";
import { useNodeColorContext } from "../../../context/display-panel/basic/nodes";
import { useDataFrameContext } from "../../../context/data-frames/data-frame-context";
import { DataFrame } from "@youwol/dataframe";

export function CanvasContainer() {
  const { color } = useNodeColorContext();
  const { dataframeValue } = useDataFrameContext();

  const meshes = meshesArray(dataframeValue);
  const renderMesh = meshRenderer({ meshes });
  return (
    <div id={"canvas-container"} className={"w-100 h-100 "}>
      <Canvas
        shadows
        style={{
          backgroundColor: `hsl(${color.hsl.h}, ${color.hsl.s * 100}%, ${color.hsl.l * 100}%)`,
        }}
        title={"canvas"}
      >
        <PerspectiveCamera
          makeDefault
          fov={90}
          position={[240, 420, 240]}
          near={0.0001}
          far={10000}
        />
        <group>
          <Center>{renderMesh.map((m) => m)}</Center>
        </group>
        <gridHelper scale={100} args={[30, 30, "red", "gray"]} />
        <TrackballControls />
        <Environment preset="studio" />

        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
            labelColor="white"
          />
        </GizmoHelper>
      </Canvas>
    </div>
  );
}

function meshesArray(dataframeValue: DataFrame[]) {
  return dataframeValue.map((dataframe) => {
    const vertices = dataframe.series.positions.array as TypedArray;
    const indices = dataframe.series.indices.array as TypedArray;

    const geom = new BufferGeometry();

    geom.setIndex(new BufferAttribute(indices, 1));
    geom.setAttribute("position", new BufferAttribute(vertices, 3));

    const material = new MeshBasicMaterial({
      color: new Color(randColor()),
      side: DoubleSide,
      visible: true,
    });

    return new Mesh(geom, material);
  });
}

function meshRenderer({ meshes }: { meshes: Mesh[] }) {
  return meshes.map((mesh) => (
    <primitive key={mesh.id} object={mesh} scale={0.01} position={[0, 0, 0]} />
  ));
}

const randColor = () => {
  const color = new Color(0xffffff);
  color.setHex(Math.random() * 0xffffff);
  return "#" + color.getHexString();
};
