import React from "react";
import * as THREE from "three";
import { DoubleSide, TypedArray } from "three";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PerspectiveCamera,
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
        camera={{ position: [10, 12, 12], fov: 25 }}
        style={{
          backgroundColor: `hsl(${color.h}, ${color.s * 100}%, ${color.l * 100}%)`,
        }}
        title={"canva"}
      >
        {renderMesh.map((m) => m)}
        <OrbitControls makeDefault={true} />
        <Environment preset="studio" />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
            labelColor="white"
          />
        </GizmoHelper>
        {/*<PerspectiveCamera makeDefault />*/}
      </Canvas>
    </div>
  );
}

function meshesArray(dataframeValue: DataFrame[]) {
  return dataframeValue.map((dataframe) => {
    const vertices = dataframe.series.positions.array as TypedArray;
    const indices = dataframe.series.indices.array as TypedArray;

    console.log("v :", vertices);
    console.log("i :", indices);

    const geom = new THREE.BufferGeometry();

    geom.setIndex(new THREE.BufferAttribute(indices, 1));
    geom.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: DoubleSide,
      visible: true,
    });

    return new THREE.Mesh(geom, material);
  });
}

function meshRenderer({ meshes }: { meshes: THREE.Mesh[] }) {
  return meshes.map((mesh, index) => <primitive key={index} object={mesh} />);
}
