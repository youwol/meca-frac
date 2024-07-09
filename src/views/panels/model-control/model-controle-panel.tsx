import { DockviewApi } from "dockview";
import React, { useState } from "react";
import { RemoteStress } from "./remote-stress";
import { RemoteStressDomain } from "./remote-stress-domain";
import { DomainSettings } from "./domain-settings";
import RemoteStressIcon from "../../../assets/remote_stress_icon.svg";

export const ModelControlePanel = (api: DockviewApi) => {
  const controlVisuPanel = api.addPanel({
    id: "idControlModelPanel", // panel 11
    component: "default",
    tabComponent: "tab_2",
    position: { referencePanel: "idD3Panel", direction: "below" },
  });
  controlVisuPanel.api.setSize({
    height: 300,
    // width: 400,
  });
  api.addPanel({
    id: "panel_13_3",
    component: "default",
    params: {
      icon: RemoteStressIcon,
      children: <Content />,
    },
    tabComponent: "tab_2",
    position: { referenceGroup: controlVisuPanel.group },
  });

  return controlVisuPanel;
};
function Content() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={"d-flex h-100"}>
      <RemoteStress />
      <RemoteStressDomain />
      <DomainSettings />
    </div>
  );
}
