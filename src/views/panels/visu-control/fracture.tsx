import React, { ChangeEvent, CSSProperties, useEffect, useState } from "react";
import { ColorResult } from "react-color";
import { SvgIcon } from "../../../components/icons/svg-icon";
import LockPickerIcon from "../../../assets/picker-locked.svg";
import PickerIcon from "../../../assets/select_icon.svg";
import UpdateIcon from "../../../assets/update_icon.svg";
import LockUpdateIcon from "../../../assets/update_lock_icon.svg";
import { Locker } from "../../../components/locker";
import { ItemDropdownBanner } from "../../../components/preferences/item-dropdown-banner";
import { ItemDropdown } from "../../../components/preferences/item-dropdown";
import ShowIcon from "../../../assets/show_icon.svg";
import { RadioOption } from "../../../components/radio-option";
import { useShapeContext } from "../../../context/display-panel/basic/shape";
import { RangeSlider } from "../../../components/range-slider";
import { useKHContext } from "../../../context/control-panel/control-panel-KH-context";
import { factoryHandleChange } from "../model-control/remote-stress";
import { CustomDropdown } from "../../../components/custom-dropdown";
import { CustomInput, MaxMinInputs } from "../../../components/custom-input";
import {
  useSurfaceColorContext,
  useTransparencyContext,
} from "../../../context/display-panel/basic/surface";
import {
  CircleColorSection,
  CircleContainer,
  PalettesContainer,
} from "../../../components/color/circle-color-section";

import chroma from "chroma-js";
import {
  createDivAtCursor,
  generateUniqueId,
} from "../../../utils/generateUniqueId";

interface SelectorSectionProps {
  placeHolder: string;
  onAddRoseElem: (newSection: { label: string; id: string }) => void;
}

export const FractureTab = () => {
  const handleAddRoseElem = (newSection: { label: string; id: string }) => {};
  return (
    <div>
      <SelectorSection placeHolder={"test"} onAddRoseElem={handleAddRoseElem} />
      <FractureSections />
    </div>
  );
};

const FractureSections = () => {
  return (
    <>
      <FractureTypeSection />
      <DickSquareSection />
      <ColorSection />
      <BorderSection />
    </>
  );
};

const SelectorSection = ({
  placeHolder,
  onAddRoseElem,
}: SelectorSectionProps) => {
  const [inputValue, setInputValue] = useState("");
  const [lock, setLock] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onAddRoseElem({ label: inputValue.trim(), id: generateUniqueId() });
      setInputValue("");
    }
  };

  const handleLock = () => setLock(!lock);

  const placeHolderText = placeHolder;
  const isLocked = lock;

  return (
    <div
      className={`d-flex justify-content-evenly align-items-center ${isLocked ? "not-allowed" : "pointer"}`}
      style={{ color: isLocked ? "#8C876E" : "inherit" }}
    >
      <button className="p-0 bg-transparent border-0" disabled={isLocked}>
        <SvgIcon
          icon={isLocked ? LockPickerIcon : PickerIcon}
          w="30px"
          h="30px"
        />
      </button>
      <div className="ms-3">
        <input
          type="text"
          placeholder={placeHolderText}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          title={placeHolderText}
          disabled={isLocked}
        />
      </div>
      <div className={"d-flex align-items-center"}>
        <Locker lock={lock} handleLock={handleLock} />
        <SvgIcon
          icon={lock ? LockUpdateIcon : UpdateIcon}
          fill={isLocked ? "#8C876E" : ""}
        />
      </div>
    </div>
  );
};

const FractureTypeSection = () => {
  const [selectedValue, setSelectedValue] = useState<number | string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const attributes = [
    { label: "opening", value: "opening" },
    { label: "closing", value: "closing" },
    { label: "sharing", value: "sharing" },
  ];

  const handleDropdownChange = (value: number | string) => {
    setSelectedValue(value);
  };
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ItemDropdownBanner
        handleDropdown={handleDropdown}
        isOpen={isOpen}
        actions={<SvgIcon icon={ShowIcon} />}
      >
        <CustomDropdown
          options={attributes}
          value={selectedValue}
          onChange={handleDropdownChange}
          placeholder="Select fracture type"
        />
      </ItemDropdownBanner>
      <ItemDropdown class={!isOpen ? "d-none" : ""}>
        <div className={"d-flex flex-column  m-3"}>
          <FractionAngleSlider />
        </div>
      </ItemDropdown>
    </>
  );
};

const FractionAngleSlider = () => {
  const { min, max } = { min: 0, max: 360 };

  const { kHValue, lastKHValidValue, setKHValue, setLastKHValidValue } =
    useKHContext();

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKHValue(+event.target.value);
  };
  const handleChange = factoryHandleChange(
    setKHValue,
    lastKHValidValue,
    setLastKHValidValue,
    min,
    max,
  );
  return (
    <RangeSlider
      value={kHValue}
      title={"Fraction Angle(°)"}
      min={min}
      max={max}
      step={1}
      lock={{ isLocked: false }}
      handleRangeChange={handleRangeChange}
      handleChange={handleChange}
    >
      <div>
        <title>FRACTURE TYPES</title>
        <div>
          <p>
            Opening mode fractures form in the plane perpendicular to the least
            compressive principal stress direction, σ3. The most common opening
            mode fractures are the joints but veins (tension gashes) and dikes
            are also included.
          </p>
        </div>
      </div>
    </RangeSlider>
  );
};
const DickSquareSection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [selectedOption, setSelectedOption] = useState("disk");
  const { setCircle, setSquare } = useShapeContext();
  const handleRadioChange = (event: {
    stopPropagation: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    event.stopPropagation();
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
    <>
      <ItemDropdownBanner
        handleDropdown={handleDropdown}
        isOpen={isOpen}
        actions={<SvgIcon icon={ShowIcon} />}
      >
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
      </ItemDropdownBanner>
      <ItemDropdown class={!isOpen ? "d-none" : ""}>
        <div className={"d-flex flex-column m-3"}>
          <SizeSlider />
          <SizeOptions />
        </div>
      </ItemDropdown>
    </>
  );
};

const ColorSection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { color, setColor } = useSurfaceColorContext();
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const initColor = {
    hex: "#fda1ff",
    hsl: {
      a: 1,
      h: 112.19040697674419,
      l: 0.47846099999999997,
      s: 0.1974296755639436,
    },
    rgb: { r: 253, g: 161, b: 255, a: 1 },
  };

  useEffect(() => {
    setColor(initColor);
  }, [setColor]);

  return (
    <>
      <ItemDropdownBanner
        handleDropdown={handleDropdown}
        isOpen={isOpen}
        actions={<SvgIcon icon={ShowIcon} />}
      >
        <CircleColorSection
          title={"Color"}
          initColor={color}
          setColor={(c) => setColor(c)}
        />
      </ItemDropdownBanner>
      <ItemDropdown class={!isOpen ? "d-none" : ""}>
        <div className={"d-flex flex-column  m-3"}>
          <ColorOptions />
        </div>
      </ItemDropdown>
    </>
  );
};

const ColorOptions = () => {
  const radioOptions = [
    {
      title: "Uniform color",
      value: "uniformColor",
    },
    {
      title: "Attribute Color",
      value: "attrColor",
    },
  ];
  const [selectedOption, setSelectedOption] = useState("uniformColor");
  const { setCircle, setSquare } = useShapeContext();

  const handleRadioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "uniformColor") {
      setSquare(false);
      setCircle(true);
    } else {
      setSquare(true);
      setCircle(false);
    }
  };
  return (
    <>
      <RadioOption
        name={"colorOptions"}
        options={radioOptions}
        selectedOption={selectedOption}
        handleRadioChange={handleRadioChange}
      />
      {selectedOption === "attrColor" && <ColorFromAttr />}
    </>
  );
};

const ColorFromAttr = () => {
  const [selectedValue, setSelectedValue] = useState<number | string>("");

  const attributes = [
    { label: "Attribute 1", value: 1 },
    { label: "Attribute 2", value: 2 },
    { label: "Attribute 3", value: 3 },
  ];

  const handleDropdownChange = (value: number | string) => {
    setSelectedValue(value);
  };
  return (
    <>
      <div className={"w-100 my-1 justify-content-center"}>
        <CustomDropdown
          options={attributes}
          value={selectedValue}
          onChange={handleDropdownChange}
          placeholder="Select an attribute"
        />
      </div>
      <MaxMinColor />
      <MaxMinInputs
        maxTitle="Custom Max Title"
        minTitle="Custom Min Title"
        initialMaxValue={10}
        initialMinValue={2}
        maxDisabled={false}
        minDisabled={false}
      />
    </>
  );
};

const SizeSlider = () => {
  const { min, max } = { min: 0, max: 3 };
  const { kHValue, lastKHValidValue, setKHValue, setLastKHValidValue } =
    useKHContext();

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKHValue(+event.target.value);
  };
  const handleChange = factoryHandleChange(
    setKHValue,
    lastKHValidValue,
    setLastKHValidValue,
    min,
    max,
  );
  return (
    <RangeSlider
      value={kHValue}
      lock={{ isLocked: false }}
      title={"Size"}
      popoverTitle={"test 1"}
      min={0.0}
      max={3.0}
      step={0.01}
      handleRangeChange={handleRangeChange}
      handleChange={handleChange}
    ></RangeSlider>
  );
};

const SizeOptions = () => {
  const [selectedOption, setSelectedOption] = useState("uniformSize");
  const { setCircle, setSquare } = useShapeContext();
  const radioOptions = [
    {
      title: "Uniform Size",
      value: "uniformSize",
    },
    {
      title: "Attribute Size",
      value: "attrSize",
    },
  ];
  const handleRadioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "uniformSize") {
      setSquare(false);
      setCircle(true);
    } else {
      setSquare(true);
      setCircle(false);
    }
  };
  return (
    <>
      <RadioOption
        name={"circleSquare1"}
        options={radioOptions}
        selectedOption={selectedOption}
        handleRadioChange={handleRadioChange}
      />
      {selectedOption === "attrSize" && <SizeFromAttr />}
    </>
  );
};

const SizeFromAttr = () => {
  const [selectedValue, setSelectedValue] = useState<number | string>("");

  const handleDropdownChange = (value: number | string) => {
    setSelectedValue(value);
  };
  const [maxValue, setMaxValue] = useState(10);
  const [minValue, setMinValue] = useState(2);
  const stringOptions = ["Option 1", "Option 2", "Option 3"];

  const handleMaxChange = (newMax: number) => {
    setMaxValue(newMax);
  };

  const handleMinChange = (newMin: number) => {
    setMinValue(newMin);
  };

  const handleUpdate = () => {};
  return (
    <div className={"w-100 align-items-start"}>
      <div className={"w-100 my-1 justify-content-center"}>
        <CustomDropdown
          options={stringOptions}
          value={selectedValue}
          onChange={handleDropdownChange}
          placeholder="Select an option"
        />
      </div>

      <MaxMinInputs
        maxTitle="Custom Max Title"
        minTitle="Custom Min Title"
        initialMaxValue={maxValue}
        initialMinValue={minValue}
        maxDisabled={false}
        minDisabled={false}
        onMaxChange={handleMaxChange}
        onMinChange={handleMinChange}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export function BorderSection() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { color, setColor } = useSurfaceColorContext();
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const initColor = {
    hex: "#fda1ff",
    hsl: {
      a: 1,
      h: 112.19040697674419,
      l: 0.47846099999999997,
      s: 0.1974296755639436,
    },
    rgb: { r: 253, g: 161, b: 255, a: 1 },
  };

  useEffect(() => {
    setColor(initColor);
  }, [setColor]);

  return (
    <>
      <ItemDropdownBanner
        handleDropdown={handleDropdown}
        isOpen={isOpen}
        actions={<SvgIcon icon={ShowIcon} />}
      >
        <CircleColorSection
          title={"Border"}
          initColor={color}
          setColor={(c) => setColor(c)}
        />
      </ItemDropdownBanner>
      <ItemDropdown class={!isOpen ? "d-none" : ""}>
        <div className={"d-flex flex-column  m-3"}>
          <ThicknessSection />
        </div>
      </ItemDropdown>
    </>
  );
}

const ThicknessSection = () => {
  const { min, max } = { min: 0, max: 10 };

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
      title={"Thickness"}
      min={min}
      max={max}
      step={0.1}
      lock={{ isLocked: false }}
      handleRangeChange={handleRangeChange}
      handleChange={handleChange}
    />
  );
};

const MaxMinColor = () => {
  const initColor: ColorResult = {
    hex: "#fda1ff",
    hsl: {
      a: 1,
      h: 112.19040697674419,
      l: 0.47846099999999997,
      s: 0.1974296755639436,
    },
    rgb: { r: 253, g: 161, b: 255, a: 1 },
  };
  const minInitColor: ColorResult = {
    hex: "#d33115",
    hsl: {
      h: 8.842105263157897,
      s: 0.8189655172413792,
      l: 0.4549019607843137,
      a: 1,
    },
    rgb: { r: 211, g: 49, b: 21, a: 1 },
  };

  const [minColor, setMinColor] = useState<ColorResult>(minInitColor);
  const [maxColor, setMaxColor] = useState<ColorResult>(initColor);
  const [checked, setChecked] = useState<boolean>(false);
  const [paletteColor, setPaletteColor] = useState<string[]>([]);

  const handleCheckboxChange = (newValue: boolean) => {
    setChecked(newValue);
  };
  const verticalText: CSSProperties = {
    writingMode: "vertical-rl",
    textAlign: "center",
    display: "inline-block",
    height: "auto",
  };
  const borderStyle: CSSProperties = {
    border: "1px solid #DDDCD4",
    borderRadius: "3px",
  };
  const colorArray =
    minColor && maxColor
      ? createSynchronizedColorGradientWithWhiteBlack(
          minColor.hex,
          maxColor.hex,
          7,
          checked,
        )
      : createSynchronizedColorGradientWithWhiteBlack(
          "",
          "",
          7,
          checked,
          paletteColor,
        );

  const handleMinColor = (c: ColorResult) => {
    setMinColor(c);
  };
  const handleMaxColor = (c: ColorResult) => {
    setMaxColor(c);
  };

  const handlePalettes = (c: { title: string; color: string }) => {
    setMinColor({ ...minColor, hex: c.color.split(", ")[0] });
    setMaxColor({ ...maxColor, hex: c.color.split(", ").at(-1) ?? "" });
    setPaletteColor(c.color.split(", "));
  };
  return (
    <>
      <div className={"d-flex"}>
        <div className={"d-flex w-100"}>
          <div style={verticalText}>min</div>
          <div
            id={"min-color"}
            style={{
              width: "5%",
              backgroundColor: `${minColor.hex}`,
              ...borderStyle,
            }}
            role={"none"}
            onClick={(ev) => {
              ev.stopPropagation();
              createDivAtCursor({
                children: <CircleContainer onClick={handleMinColor} />,
                event: ev,
              });
            }}
          />
          <div
            id={"gradient-color"}
            role={"none"}
            style={{
              width: "100%",
              backgroundImage: `linear-gradient(to right, ${colorArray})`,
              ...borderStyle,
            }}
            onClick={(ev) => {
              ev.stopPropagation();
              createDivAtCursor({
                event: ev,
                children: <PalettesContainer handleOnclick={handlePalettes} />,
              });
            }}
          />
          <div
            id={"max-color"}
            role={"none"}
            style={{
              width: "5%",
              backgroundColor: `${maxColor.hex}`,
              ...borderStyle,
            }}
            onClick={(ev) => {
              ev.stopPropagation();
              createDivAtCursor({
                children: <CircleContainer onClick={handleMaxColor} />,
                event: ev,
              });
            }}
          />
          <div style={verticalText}>max</div>
        </div>
        <SvgIcon icon={UpdateIcon} />
      </div>
      <div id={"reverse-scale"} className={"py-1"}>
        <CustomInput
          name={"reverseScaleCheck"}
          title={"Reverse Scale"}
          id={"reverseScale"}
          value={checked}
          type={"checkbox"}
          handleOnchange={(e) => handleCheckboxChange(e as boolean)}
          disabled={false}
        />
      </div>
    </>
  );
};

function createSynchronizedColorGradientWithWhiteBlack(
  startColor: string,
  endColor: string,
  numColors: number,
  reverse = false,
  colorArray: string[] = [],
) {
  if (colorArray && colorArray.length > 0) {
    const generatedColors = colorArray;
    return reverse
      ? generatedColors.reverse().join(", ")
      : generatedColors.join(", ");
  }

  const startHsl = chroma(startColor).hsl();
  const endHsl = chroma(endColor).hsl();
  const startHue = startHsl[0];
  const endHue = endHsl[0];

  let hues = [];

  if (startHue <= endHue) {
    for (let i = 0; i < numColors; i++) {
      const hue = startHue + ((endHue - startHue) / (numColors - 1)) * i;
      hues.push(hue);
    }
  } else {
    for (let i = 0; i < numColors; i++) {
      const hue =
        (startHue + ((endHue - startHue + 360) % 360) * (i / (numColors - 1))) %
        360;
      hues.push(hue);
    }
  }

  let generatedColors = hues.map((hue) => chroma.hsl(hue, 1, 0.5).hex());

  if (reverse) {
    generatedColors = generatedColors.reverse();
  }

  return generatedColors.join(", ");
}
