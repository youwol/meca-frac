import React, { useEffect, useRef, useState } from "react";
import { CirclePicker, HSLColor } from "react-color";
import { createDivAtCursor } from "../../views/utiles";
import {
  defaultColor,
  paletteBlueRed,
  palettePurRed,
  paletteRedPur,
} from "./color-palettes";
import { Palette } from "./palette";

interface HSLaColor {
  h: number;
  s: number;
  l: number;
  a: number;
}

export function CircleColorSection(props: {
  title: string;
  initColor: HSLColor;
  getColor: (c: HSLColor) => void;
}) {
  const [color, setColor] = useState(props.initColor);
  const refColor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (refColor.current) {
      refColor.current.style.backgroundColor = `hsla(${color.h}, ${color.s * 100}%, ${color.l * 100}%, ${color.a})`;
    }
  }, [color]);
  const handleColor = (c: HSLColor) => {
    setColor(c);
    props.getColor(c);
  };

  return (
    <div
      className={"d-flex w-100 justify-content-start"}
      role={"none"}
      onClick={(ev) => ev.stopPropagation()}
      // onChange={() => props.onChange(color)}
    >
      <div
        className={"border border-white rounded-circle me-4"}
        role={"none"}
        ref={refColor}
        style={{
          position: "relative",
          height: "18px",
          width: "18px",
          backgroundColor: `hsla(${color.h}, ${color.s * 100}%, ${color.l * 100}%, ${color.a})`,
        }}
        onClick={(ev) => {
          ev.stopPropagation();
          createDivAtCursor({
            children: (
              <CircleContainer
                initColor={props.initColor}
                onClick={handleColor}
              />
            ),
            event: ev,
          });
        }}
      ></div>
      <div>{props.title}</div>
    </div>
  );
}

const CircleContainer = (props: {
  initColor: HSLColor;
  onClick: (c: HSLColor) => void;
}) => {
  return (
    <div
      role={"none"}
      style={{
        backgroundColor: "#474538",
        position: "absolute",
        left: "120%",
        zIndex: 1,
      }}
    >
      <CirclePicker
        colors={defaultColor}
        onChangeComplete={(c, e) => props.onClick(c.hsl)}
      />
    </div>
  );
};

export function PaletteColorSection(props: { title: string }) {
  const handleClick = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.stopPropagation();
    createDivAtCursor({ event: ev, children: <PalettesContainer /> });
  };
  return (
    <div className={"d-flex w-100 justify-content-start"}>
      <div
        className={"border border-white rounded-circle me-4"}
        style={{
          position: "relative",
          height: "18px",
          width: "18px",
          border: "1px",
          borderColor: "white",
          borderRadius: " 5px",
          backgroundImage: `linear-gradient(to right, ${paletteRedPur.join(", ")})`,
        }}
        onClick={(ev) => handleClick(ev)}
        role={"none"}
      />
      <div className={"me-4"}>{props.title}</div>
    </div>
  );
}

const PalettesContainer = () => {
  return (
    <div
      className={"bg-black  p-2 rounded text-white "}
      style={{
        position: "absolute",
        width: "30vh",
        top: "100%",
        // left: "100%",
      }}
    >
      <Palette title={"Default"} colorPalette={paletteBlueRed.join(", ")} />
      <Palette title={"Rainbow"} colorPalette={palettePurRed.join(", ")} />
      {/*<Palette title={"Spectrum"} colorPalette={paletteWhiteRed} />*/}
      <Palette title={"Insar"} colorPalette={palettePurRed.join(", ")} />
      <Palette title={"test 1"} colorPalette={paletteBlueRed.join(", ")} />
      {/*<Palette title={"test 2"} colorPalette={paletteWhiteRed.join(", ")} />*/}
    </div>
  );
};
