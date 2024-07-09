import { DockviewApi } from "dockview";
import React from "react";
import { CanvasContainer } from "../../views/panels/scene/canvas-container";

export const D3Panel = (api: DockviewApi) => {
  const d3Panel = api.addPanel({
    id: "idD3Panel", // panel_2
    component: "component_3d",
    params: {
      children: content,
    },
    // position: {referencePanel: 'idTreeViewPanel', direction: 'right'}
  });
  d3Panel.group.locked = "no-drop-target";
  d3Panel.group.header.hidden = true;
  d3Panel.group.api.setConstraints({
    minimumWidth: 800,
    minimumHeight: 400,
  });
  return d3Panel;
};

const content = (
  <>
    {/*<h1> 3D content</h1>*/}
    <CanvasContainer />
  </>
);
