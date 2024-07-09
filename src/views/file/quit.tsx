import { NavDropdown } from "react-bootstrap";
import React from "react";
import { useWindowContext } from "../../context/window-context";

export interface WindowContextType {
  handleCloseWindow: () => void;
}

export function Quit() {
  const { handleCloseWindow } = useWindowContext();

  return (
    <NavDropdown.Item
      className={"d-flex justify-content-between"}
      onClick={handleCloseWindow}
    >
      <div className={"me-5"}>Quit</div>
      <div> Ctrl+Q</div>
    </NavDropdown.Item>
  );
}
