import React from "react";
export function Palette(props: { title: string; colorPalette: string }) {
  const { title, colorPalette } = props;
  return (
    <div>
      <div>{title}</div>
      <div
        style={{
          height: "30px",
          width: "100%",
          border: "5px",
          borderColor: "white",
          borderRadius: " 5px",
          backgroundImage: `linear-gradient(to right, ${colorPalette})`,
        }}
      />
    </div>
  );
}
