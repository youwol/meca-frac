import React, { CSSProperties } from "react";

export function Divider(props: { class?: string; style?: CSSProperties }) {
  return (
    <div
      className={props.class ?? "w-100 px-2"}
      style={props.style ?? { height: "1px", backgroundColor: "white" }}
    />
  );
}
