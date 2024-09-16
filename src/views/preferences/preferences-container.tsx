import { PreferencesBtn } from "./preferences-btn";
import { PreferencesContent } from "./preferences-content";
import React from "react";
import { Theme } from "./user-interface/theme";
import { Labels } from "./user-interface/labels";
import { AutoSaving } from "./general/auto-Saving";
import { ColorScheme } from "./general/color-scheme";
import { UndoRedo } from "./general/undo-redo";

export function PreferencesContainer() {
  return (
    <div className={"d-flex "}>
      <div
        className={"w-25 h-100 d-flex flex-column"}
        style={{ backgroundColor: "#313027" }}
      >
        <PreferencesBtn id={"default"} title={"General"} />
        <PreferencesBtn id={"userInterfaceId"} title={"User interface"} />
        <PreferencesBtn
          id={"conventionAndUnitsId"}
          title={"Convention & Units"}
        />
        <PreferencesBtn id={"3DSceneId"} title={"3D Scene"} />
        <PreferencesBtn id={"archId"} title={"Arch"} />
      </div>
      <div id={"preferencesWindowId"} className={"w-75 h-100"}>
        <PreferencesContent id={"default"}>
          <AutoSaving />
          <ColorScheme />
          <UndoRedo />
        </PreferencesContent>
        <PreferencesContent id={"userInterfaceId"}>
          <Theme />
          <Labels />
        </PreferencesContent>
        <PreferencesContent id={"conventionAndUnitsId"}>
          <div></div>
        </PreferencesContent>
        <PreferencesContent id={"3DSceneId"}>
          <div></div>
        </PreferencesContent>
        <PreferencesContent id={"archId"}>
          <div></div>
        </PreferencesContent>
      </div>
      {/*<TabGeneral/>*/}
    </div>
  );
}