import {
  DockviewApi,
  DockviewReact,
  DockviewReadyEvent,
  IDockviewPanelHeaderProps,
  IDockviewPanelProps,
} from "dockview";
import * as React from "react";
import { ReactNode, useEffect, useRef } from "react";
import "dockview/dist/styles/dockview.css";
import { NavBar } from "../views/nav-bar";
import {
  Panel3D,
  PanelDefault,
  TabComponent,
} from "../components/panels/panels";
import { D3Panel } from "../components/panels/panel-3d";
import { PanelTreeView } from "../views/panels/tree/panel-tree-view";
import { Panel2d } from "../components/panels/panel-2d";
import { ModelControlePanel } from "../views/panels/model-control/model-controle-panel";
import { PanelControlModel } from "../views/panels/visu-control/panel-control-model";
import { useDockApi } from "../context/dock-api-context";
import { useToggleViewsContext } from "../context/toggle-views-context";
import { useWindowContext } from "../context/window-context";
import { WindowContextType } from "../views/file/quit";

const components = {
  default: (
    props: IDockviewPanelProps<{ children: ReactNode; setClass?: string }>,
  ) => {
    return (
      <PanelDefault setClass={props.params.setClass}>
        {" "}
        {props.params.children}
      </PanelDefault>
    );
  },
  component_3d: (props: IDockviewPanelProps<{ children: ReactNode }>) => {
    return <Panel3D>{props.params.children} </Panel3D>;
  },
};
const tabsComponents = {
  tab_2: (props: IDockviewPanelHeaderProps<{ icon?: string }>) => {
    return <TabComponent icon={props.params.icon} />;
  },
};

export const Home = (props: { theme?: string }) => {
  const { treeViewChecked, graphChecked, informationChecked, controlChecked } =
    useToggleViewsContext();

  const { handleCloseWindow } = useWindowContext() as WindowContextType;
  const { setApi } = useDockApi();
  const apiRef = useRef<DockviewApi | null>(null);
  document.addEventListener("keypress", handleCloseWindow);

  useEffect(() => {
    if (apiRef.current) {
      const api = apiRef.current;
      api.clear();
      D3Panel(api);
      if (treeViewChecked) {
        PanelTreeView(api); // all panels depends on this
      }
      if (graphChecked) {
        Panel2d(api);
      }
      if (informationChecked) {
        PanelControlModel(api);
      }
      if (controlChecked) {
        ModelControlePanel(api);
      }
    }
  }, [treeViewChecked, informationChecked, controlChecked, graphChecked]);

  const onReady = (event: DockviewReadyEvent) => {
    apiRef.current = event.api;
    if (setApi) {
      setApi(event.api);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <NavBar />
      <div style={{ fontSize: "12px", flexGrow: 1 }}>
        <DockviewReact
          onReady={onReady}
          components={components}
          tabComponents={tabsComponents}
          disableDnd={true}
          className={`${props.theme || "dockview-theme-abyss"}`}
          // locked={true}
          hideBorders={true}
        />
      </div>
    </div>
  );
};
