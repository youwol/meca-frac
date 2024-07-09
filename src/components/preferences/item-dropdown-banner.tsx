import React, { CSSProperties, ReactNode } from "react";

interface ItemDropdownBannerProps {
  title?: string;
  children?: ReactNode;
  icon?: {
    svg?: string;
    style?: CSSProperties;
  };
  customClass?: string;
  isOpen: boolean;
  handleDropdown: () => void;
  eyeIcon?: ReactNode;
}

export function ItemDropdownBanner(props: ItemDropdownBannerProps) {
  const {
    title,
    children,
    icon,
    customClass,
    isOpen,
    eyeIcon,
    handleDropdown,
  } = props;
  const isOpenRotate90 = isOpen ? "right" : "up";
  const isOpenNormal = isOpen ? "down" : "right";
  const isRotated = customClass ? isOpenRotate90 : isOpenNormal;
  return (
    <div
      role={"none"}
      className={`d-flex  ${customClass ?? "py-2"} pointer h-100 align-items-center justify-content-start yw-btn-bg-darker text-white border-0 btn-h-30 yw-btn-text`}
      onClick={handleDropdown}
      style={customClass ? { width: "35px" } : { height: "34px !important" }}
    >
      <i
        className={`fas fa-caret-${isRotated} ${!customClass && "ms-3 me-2"} fa-lg`}
        style={{ width: "15px" }}
      />
      {icon && (
        <span
          className={"my-3"}
          style={icon.style ?? { filter: "brightness(0) invert(100%)" }}
        >
          <img src={icon.svg} alt={title} />
        </span>
      )}
      <div
        className={children ? "d-flex w-100 justify-content-start" : ""}
        style={customClass ? { transform: " rotateZ(180deg)" } : {}}
      >
        {title ?? children}
      </div>
      {eyeIcon}
      <div>{/* drag and drop feature*/}</div>
    </div>
  );
}
