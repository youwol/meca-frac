import React, { CSSProperties } from "react";

const green =
  "invert(43%) sepia(96%) saturate(1237%) hue-rotate(88deg) brightness(128%) contrast(50%)";

const red =
  "invert(37%) sepia(93%) saturate(7471%) hue-rotate(356deg) brightness(91%) contrast(135%)";

export function SvgIcon(props: {
  icon: string | undefined;
  customClass?: string;
  w?: string;
  h?: string;
  fill?: string;
  style?: CSSProperties;
  onclick?: (
    ev?:
      | React.MouseEvent<HTMLImageElement | HTMLInputElement, MouseEvent>
      | undefined,
  ) => void;
}) {
  const { icon, customClass, w, h, fill, style, onclick } = props;

  let fillColor;
  if (fill === "red") {
    fillColor = red;
  } else {
    fillColor = green;
  }

  const fillValue = fill ? fillColor : " ";
  return (
    <>
      {" "}
      {icon && (
        <img
          className={customClass ?? ""}
          src={icon}
          role={"none"}
          alt={"Fracture Modeling"}
          style={{
            width: w,
            height: h,
            fill: fill ?? "",
            filter: fillValue,
            ...style,
          }}
          onClick={onclick}
        />
      )}
    </>
  );
}
