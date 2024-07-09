import { NavDropdown } from "react-bootstrap";
import React, { useState } from "react";
import { PopupWindow } from "../preferences/popup-window";

export function Preferences() {
  const [popupWindow, setPopupWindow] = useState(false);

  const handlePopupWindow = () => {
    setPopupWindow(!popupWindow);
  };

  return (
    <>
      <NavDropdown.Item
        className={"d-flex justify-content-between preferences-popup"}
        onClick={handlePopupWindow}
      >
        <div className={"me-5"}>Preferences</div>
        <div> Ctrl+S</div>
      </NavDropdown.Item>
      {popupWindow ? PopupWindow() : null}
    </>
  );
}
