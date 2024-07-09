import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ItemDropdownBanner } from "../../../components/preferences/item-dropdown-banner";
import { ItemDropdown } from "../../../components/preferences/item-dropdown";
import { HSLColor, RGBColor, SketchPicker } from "react-color";
import {
  CircleColorSection,
  PaletteColorSection,
} from "../../../components/color/circle-color-section";
import { SvgIcon } from "../../../components/icons/svg-icon";
import ShowIcon from "../../../assets/show_icon.svg";
import { RadioOption } from "../../../components/radio-option";
import { useShapeContext } from "../../../context/display-panel/basic/shape";
import { RangeSlider } from "../../../components/range-slider";
import {
  useSurfaceColorContext,
  useTransparencyContext,
} from "../../../context/display-panel/basic/surface";
import { factoryHandleChange } from "../model-control/remote-stress";
import {
  useNodeColorContext,
  useSizeContext,
} from "../../../context/display-panel/basic/nodes";

export function Isocontours() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [color, setColor] = useState("#aabbcc");
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleColorChangeComplete = (color: any) => {
    setColor(color.hsl);
  };
  return (
    <>
      <ItemDropdownBanner handleDropdown={handleDropdown} isOpen={isOpen}>
        <Header />
      </ItemDropdownBanner>
      <ItemDropdown class={!isOpen ? "d-none" : ""}>
        <div>
          <SketchPicker color={color} onChange={handleColorChangeComplete} />
        </div>
      </ItemDropdown>
    </>
  );
}

export function FillSection() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const initColor = {
    h: 0,
    s: 0.735056823110957,
    l: 0.4187759099999999,
    a: 1,
  };
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <ItemDropdownBanner
        handleDropdown={handleDropdown}
        isOpen={isOpen}
        eyeIcon={<SvgIcon icon={ShowIcon} />}
      >
        <PaletteColorSection title={"Fill"} />
      </ItemDropdownBanner>
      <ItemDropdown class={!isOpen ? "d-none" : ""}>
        <div>
          <div>this is test</div>
        </div>
      </ItemDropdown>
    </>
  );
}

export function SurfaceSection() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { color, setColor } = useSurfaceColorContext();
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const initColor = {
    a: 1,
    h: 112.19040697674419,
    l: 0.47846099999999997,
    s: 0.1974296755639436,
  };

  useEffect(() => {
    setColor(initColor);
  }, [setColor]);

  return (
    <>
      <ItemDropdownBanner
        handleDropdown={handleDropdown}
        isOpen={isOpen}
        eyeIcon={<SvgIcon icon={ShowIcon} />}
      >
        <CircleColorSection
          title={"Surface"}
          initColor={color}
          getColor={(c) => setColor(c)}
        />
      </ItemDropdownBanner>
      <ItemDropdown class={!isOpen ? "d-none" : ""}>
        <div>
          <Transparency />
          {/*<Divider />*/}
        </div>
      </ItemDropdown>
    </>
  );
}

const Transparency = () => {
  const { min, max } = { min: 0, max: 1 };

  const {
    transparencyValue,
    lastTransparencyValidValue,
    setTransparencyValue,
    setLastTransparencyValidValue,
  } = useTransparencyContext();
  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTransparencyValue(+event.target.value);
  };
  const handleChange = factoryHandleChange(
    setTransparencyValue,
    lastTransparencyValidValue,
    setLastTransparencyValidValue,
    min,
    max,
  );
  return (
    <RangeSlider
      value={transparencyValue}
      title={"Transparency"}
      min={min}
      max={max}
      step={0.1}
      lock={{ isLocked: false }}
      handleRangeChange={handleRangeChange}
      handleChange={handleChange}
    />
  );
};

export function NodesSection() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { color, setColor } = useNodeColorContext();

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const initColor = {
    h: 0,
    s: 0.135436823110957,
    l: 0.6187759099999999,
    a: 1,
  };
  useEffect(() => {
    setColor(initColor);
  }, [setColor]);

  return (
    <>
      <ItemDropdownBanner
        handleDropdown={handleDropdown}
        isOpen={isOpen}
        eyeIcon={<SvgIcon icon={ShowIcon} />}
      >
        <CircleColorSection
          title={"Nodes"}
          initColor={color}
          getColor={setColor}
        />
      </ItemDropdownBanner>
      <ItemDropdown class={!isOpen ? "d-none" : ""}>
        <div>
          <NodeSize />
          <NodeCircleSquare />
        </div>
      </ItemDropdown>
    </>
  );
}

const NodeSize = () => {
  const { min, max } = { min: 0, max: 10 };

  const { sizeValue, lastSizeValidValue, setSizeValue, setLastSizeValidValue } =
    useSizeContext();
  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSizeValue(+event.target.value);
  };
  const handleChange = factoryHandleChange(
    setSizeValue,
    lastSizeValidValue,
    setLastSizeValidValue,
    min,
    max,
  );
  return (
    <RangeSlider
      value={sizeValue}
      title={"Size"}
      min={min}
      max={max}
      step={1}
      lock={{ isLocked: false }}
      handleRangeChange={handleRangeChange}
      handleChange={handleChange}
    />
  );
};

const NodeCircleSquare = () => {
  const { setCircle, setSquare } = useShapeContext();
  const [selectedOption, setSelectedOption] = useState("disk");

  const handleRadioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "disk") {
      setSquare(false);
      setCircle(true);
    } else {
      setSquare(true);
      setCircle(false);
    }
  };
  return (
    <div
      className={
        "d-flex flex-column align-items-start justify-content-between px-2 w-100 "
      }
    >
      <RadioOption
        name={"circleSquare"}
        options={[
          {
            title: "Circle",
            value: "disk",
          },
          {
            title: "Square",
            value: "square",
          },
        ]}
        selectedOption={selectedOption}
        handleRadioChange={handleRadioChange}
      />
    </div>
  );
};

export function MeshSection() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [color, setColor] = useState<HSLColor>();
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const initColor = {
    a: 1,
    h: 118.19040697674419,
    l: 0.47846099999999997,
    s: 0.7974296755639436,
  };
  useEffect(() => {
    setColor(initColor);
  }, [setColor]);
  return (
    <>
      <ItemDropdownBanner
        handleDropdown={handleDropdown}
        isOpen={isOpen}
        eyeIcon={<SvgIcon icon={ShowIcon} />}
      ></ItemDropdownBanner>
      <ItemDropdown class={!isOpen ? "d-none" : ""}>
        <div>
          <div>this is test</div>
        </div>
      </ItemDropdown>
    </>
  );
}

type ColorOptions = {
  hex: string;
  hsl: HSLColor;
  rgb: RGBColor;
};

const Header = () => {
  const [selectedOption, setSelectedOption] = useState("disk");
  const { setCircle, setSquare } = useShapeContext();
  const handleRadioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "disk") {
      setSquare(false);
      setCircle(true);
    } else {
      setSquare(true);
      setCircle(false);
    }
  };
  return (
    <RadioOption
      name={"circleSquare"}
      options={[
        {
          title: "Disk",
          value: "disk",
        },
        {
          title: "Square",
          value: "square",
        },
      ]}
      selectedOption={selectedOption}
      handleRadioChange={handleRadioChange}
    />
  );
};
