import { DockviewApi } from "dockview";
import TreeIcon from "../../assets/tree_icon_dark.svg";
import React from "react";

export const Panel2d = (api: DockviewApi) => {
  const d2Panel = api.addPanel({
    id: "idD2Panel", //panel_3
    component: "default",
    tabComponent: "tab_2",
    params: {
      icon: TreeIcon,
    },
    position: { referencePanel: "idD3Panel", direction: "right" },
  });

  d2Panel.api.setSize({
    width: 150,
  });

  api.addPanel({
    id: "idD2Panel_2",
    component: "default",
    tabComponent: "tab_2",
    params: {
      icon: TreeIcon,
      children: content,
    },
    position: { referenceGroup: d2Panel.group },
  });
  api.addPanel({
    id: "idD2Panel_3",
    component: "default",
    params: {
      icon: TreeIcon,
      children: content,
    },
    tabComponent: "tab_2",
    position: { referenceGroup: d2Panel.group },
  });

  return d2Panel;
};
const content = (
  <div>
    <h1> 2D Panel content</h1>
  </div>
);
