import React from "react";

export function SvgIcon(props: {
  icon: string | undefined;
  customClass?: string;
  w?: string;
  h?: string;
  fill?: string;
  onclick?: (ev?: any) => void;
}) {
  const { icon, customClass, w, h, fill, onclick } = props;
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
          }}
          onClick={onclick}
        />
      )}
    </>
  );
}
