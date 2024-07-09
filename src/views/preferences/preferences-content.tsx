import React, { ReactNode } from "react";
import { useActivePanel } from "../../context/active-preferences-tab-context";

export function PreferencesContent(props: { id: string; children: ReactNode }) {
  const { activePanel } = useActivePanel();
  return (
    <div
      className={`collapse ${props.id === activePanel ? "show" : "d-none"}`}
      id={props.id}
    >
      <div className=" text-dark p-0">{props.children}</div>
    </div>
  );
}
