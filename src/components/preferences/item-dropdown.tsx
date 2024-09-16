import React, { ReactNode } from "react";

export function ItemDropdown(props: { class: string; children: ReactNode }) {
  return (
    <div className={`yw-btn-bg-darker-2x ${props.class}`}>{props.children}</div>
  );
}
