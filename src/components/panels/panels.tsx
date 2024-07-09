import React, { ReactNode } from "react";

export const PanelDefault = ({
  children,
  setClass,
}: {
  children: ReactNode;
  setClass?: string;
}) => {
  return (
    <div
      className={`test h-100 p-2 overflow-auto text-white ${setClass ?? ""}`}
    >
      {/*<h1 style={{color: "white"}}>default component</h1>*/}
      {children}
    </div>
  );
};
export const PanelPreferences = ({
  children,
  customClass,
}: {
  children: ReactNode;
  customClass?: string;
}) => {
  return (
    <div
      className={`test ${customClass}`}
      style={{
        height: "100%",
        padding: "20px",
        color: "white",
        overflow: "auto",
      }}
    >
      {/*<h1 style={{color: "white"}}>default component</h1>*/}
      {children}
    </div>
  );
};
export const Panel3D = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={"component3D"}
      style={{
        height: "100%",
        padding: "20px",
        color: "white",
        overflow: "auto",
        background: "red",
      }}
    >
      {/*<h1 style={{color: "white"}}>default component</h1>*/}
      {children}
    </div>
  );
};

export const TabComponent = ({ icon }: { icon?: string }) => {
  return (
    <div style={{ width: "fit-content", color: "white" }}>
      <img src={icon} alt={""} />
    </div>
  );
};
