import { NavDropdown } from "react-bootstrap";
import React, { useState } from "react";
import { Logo } from "../../components/icons/logo";
import { ActivePreferencesTabProvider } from "../../context/active-preferences-tab-context";
import { PreferencesContainer } from "../preferences/preferences-container";
import ResizableDraggablePopup from "../../components/custom-popup";

export const Preferences = () => {
  const [popupWindow, setPopupWindow] = useState(false);

  const handlePopupWindow = (ev: { stopPropagation: () => void }) => {
    ev.stopPropagation();
    setPopupWindow(true);
  };

  const handleCloseBox = () => {
    setPopupWindow(false);
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
      {popupWindow && (
        <ResizableDraggablePopup
          title={"Preferences"}
          icon={<Logo />}
          onClose={handleCloseBox}
        >
          {content}
        </ResizableDraggablePopup>
      )}
    </>
  );
};

const content = (
  <ActivePreferencesTabProvider>
    <PreferencesContainer />
  </ActivePreferencesTabProvider>
);
