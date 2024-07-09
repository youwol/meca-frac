import { DockviewApi } from "dockview";
import React from "react";
import {
  Isocontours,
  FillSection,
  NodesSection,
  MeshSection,
  SurfaceSection,
} from "./isocontours";
import IsoontoreIcon from "../../../assets/panel-tabs/isocontore-tab.svg";
import BasicDisplayIcon from "../../../assets/panel-tabs/basic_display_icon.svg";
import FracturePlanesIcon from "../../../assets/panel-tabs/fracture_planes_icon.svg";
import TensorsPlanesIcon from "../../../assets/panel-tabs/tensors_icon.svg";
import VectorsPlanesIcon from "../../../assets/panel-tabs/vectors_icon.svg";

export const PanelControlModel = (api: DockviewApi) => {
  const controlModelPanel = api.addPanel({
    id: "idControlVisuPanel", //panel_12
    component: "default",
    tabComponent: "tab_2",
    params: {
      icon: BasicDisplayIcon,
      children: DisplayTab,
    },

    position: api.getPanel("idTreeViewPanel")
      ? { referencePanel: "idTreeViewPanel", direction: "below" }
      : { referencePanel: "idD3Panel", direction: "left" },
  });

  controlModelPanel.api.setSize({
    height: 500,
    width: 400,
  });
  api.addPanel({
    id: "idControlVisuPanel_3",
    component: "default",
    tabComponent: "tab_2",
    inactive: true,
    params: {
      icon: IsoontoreIcon,
      children: IsoContourTab,
    },
    position: { referenceGroup: controlModelPanel.group },
  });
  api.addPanel({
    id: "idControlVisuPanel_4",
    component: "default",
    tabComponent: "tab_2",
    inactive: true,
    params: {
      icon: FracturePlanesIcon,
      children: FracturePlanesTab,
    },
    position: { referenceGroup: controlModelPanel.group },
  });
  api.addPanel({
    id: "idControlVisuPanel_5",
    component: "default",
    tabComponent: "tab_2",
    inactive: true,
    params: {
      icon: TensorsPlanesIcon,
      // children: isoContourTab,
    },
    position: { referenceGroup: controlModelPanel.group },
  });
  api.addPanel({
    id: "idControlVisuPanel_6",
    component: "default",
    tabComponent: "tab_2",
    inactive: true,
    params: {
      icon: VectorsPlanesIcon,
      // children: isoContourTab,
    },
    position: { referenceGroup: controlModelPanel.group },
  });

  return controlModelPanel;
};

const DisplayTab = (
  <div>
    <SurfaceSection />
    <NodesSection />
    <MeshSection />
  </div>
);
7;

const IsoContourTab = (
  <div>
    <FillSection />
  </div>
);

const FracturePlanesTab = (
  <div>
    <Isocontours />
  </div>
);
