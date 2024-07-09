import { useDockApi } from "../../context/dock-api-context";
import React from "react";
import { PreferencesContainer } from "./preferences-container";
import { ActivePreferencesTabProvider } from "../../context/active-preferences-tab-context";

export function PopupWindow() {
  const { api } = useDockApi();

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const elementWidth = viewportWidth * 0.5;
  const elementHeight = viewportHeight * 0.5;

  const x = (viewportWidth - elementWidth) / 2;
  const y = (viewportHeight - elementHeight) / 2;

  if (!api) {
    return;
  }

  const popupWindowPanel = api.getPanel("idPopupWindow");
  const popupWindow =
    popupWindowPanel ??
    api.addPanel({
      id: "idPopupWindow",
      component: "default",
      title: "",
      params: {
        children: content,
        setClass: "p-0",
      },
      floating: { width: elementWidth, height: elementHeight, x: x, y: y },
    });
}

const content = (
  <ActivePreferencesTabProvider>
    <PreferencesContainer />
  </ActivePreferencesTabProvider>
);
