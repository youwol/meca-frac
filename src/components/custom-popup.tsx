import React, { ReactNode, useEffect, useState } from "react";
import { Resizable } from "re-resizable";
import Draggable from "react-draggable";
import CloseIcon from "../assets/close-dark.svg";
import { SvgIcon } from "./icons/svg-icon";

interface ResizableDraggablePopupProps {
  onClose: () => void;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

const ResizableDraggablePopup = ({
  onClose,
  title,
  icon,
  children,
}: ResizableDraggablePopupProps) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      role="none"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Draggable handle=".popup-header" bounds="parent">
        <Resizable
          defaultSize={{
            width: 900,
            height: 800,
          }}
          minWidth={Math.min(200, screenWidth)}
          minHeight={Math.min(150, screenHeight)}
          maxWidth={screenWidth * 0.9}
          maxHeight={screenHeight * 0.9}
          enable={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
          }}
        >
          <div
            role="none"
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              role="none"
              className="popup-header"
              style={{
                padding: "12px",
                background: "#474538",
                color: "#fff",
                borderRadius: "8px 8px 0 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <div
                role="none"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {icon && (
                  <div
                    role="none"
                    style={{
                      marginRight: "8px",
                    }}
                  >
                    {icon}
                  </div>
                )}
                <span>{title}</span>
              </div>
              <SvgIcon
                icon={CloseIcon}
                onclick={onClose}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div style={{ flex: 1, padding: "0", overflowY: "auto" }}>
              {children}
            </div>
          </div>
        </Resizable>
      </Draggable>
    </div>
  );
};

export default ResizableDraggablePopup;
