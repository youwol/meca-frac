import React, { ChangeEvent, useState } from "react";
import { ItemDropdownBanner } from "../../../components/preferences/item-dropdown-banner";
import RemoteStressIcon from "../../../assets/remote_stress_icon.svg";
import { ItemDropdown } from "../../../components/preferences/item-dropdown";
import { useKHContext } from "../../../context/control-panel/control-panel-KH-context";
import { RangeSlider } from "../../../components/range-slider";
import { useRValueContext } from "../../../context/control-panel/control-panel-Rvalue-context";
import { useThetaContext } from "../../../context/control-panel/control-panel-theta-context";
import { useSigmaContext } from "../../../context/control-panel/control-panel-sigma-context";
import { Locker } from "../../../components/locker";
import { Divider } from "../../../components/divider";
import { RadioOption } from "../../../components/radio-option";
import { useKhContext } from "../../../context/control-panel/control-panel-Kh2-context";

export function RemoteStress() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <ItemDropdownBanner
        title={"Remote stress"}
        customClass={"yw-rotate-90 flex-row-reverse"}
        icon={{ svg: RemoteStressIcon }}
        handleDropdown={handleDropdown}
        isOpen={isOpen}
      />
      <ItemDropdown class={!isOpen ? "d-none" : "w-75 overflow-auto py-2"}>
        <RemoteStressContent />
      </ItemDropdown>
    </>
  );
}

const RemoteStressContent = () => {
  const sharedClass =
    "d-flex align-items-center justify-content-between px-2 w-100 mb-2";
  return (
    <div
      className={
        "d-flex flex-column align-items-center justify-content-evenly px-2 w-100"
      }
    >
      <KHValue class={sharedClass} />
      <KhValue class={sharedClass} />
      <RValue class={sharedClass} />
      <Theta class={sharedClass} />
      <Divider />
      <T />
    </div>
  );
};

const T = () => {
  const [selectedOption, setSelectedOption] = useState("Gradient-σv");
  const {
    constantSigma,
    constantSigmaValue,
    setGradientSigma,
    setConstantSigma,
    setConstantSigmaValue,
  } = useSigmaContext();

  const handleRadioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "Gradient-σv") {
      setGradientSigma(true);
      setConstantSigma(false);
    } else {
      setGradientSigma(false);
      setConstantSigma(true);
    }
  };
  const handleConstantSigmaValueChange = (event: {
    target: { value: string };
  }) => {
    setConstantSigmaValue(parseFloat(event.target.value));
  };
  return (
    <div
      className={
        "d-flex flex-column align-items-start justify-content-between px-2 w-100 "
      }
    >
      <RadioOption
        name={"tests"}
        options={[
          { title: "Gradient σv", value: "Gradient-σv" },
          {
            title: "Constant σv",
            value: "Constant-σv",
            input: {
              title: "Reference depth =",
              value: constantSigmaValue,
              handleOnChange: handleConstantSigmaValueChange,
              disabled: constantSigma,
            },
          },
        ]}
        selectedOption={selectedOption}
        handleRadioChange={handleRadioChange}
      />
    </div>
  );
};
const KHValue = (props: { class: string }) => {
  const { min, max } = { min: 0, max: 3 };
  const { kHValue, lastKHValidValue, setKHValue, setLastKHValidValue } =
    useKHContext();
  const [lock, setLock] = useState(false);

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

  const handleLock = () => {
    setLock(!lock);
  };
  return (
    <div className={props.class}>
      <RangeSlider
        value={kHValue}
        lock={{
          isLocked: lock,
          locker: <Locker lock={lock} handleLock={handleLock} />,
        }}
        title={"kH= σH/σv [0, 3]"}
        popoverTitle={"test 1"}
        min={0.0}
        max={3.0}
        step={0.01}
        handleLock={handleLock}
        handleRangeChange={handleRangeChange}
        handleChange={handleChange}
      >
        <div> ther ther hter hte het ereh tehter htete htet ehbtb</div>
      </RangeSlider>
    </div>
  );
};

const KhValue = (props: { class: string }) => {
  const { min, max } = { min: 0, max: 3 };
  const { khValue, lastKhValidValue, setKhValue, setLastKhValidValue } =
    useKhContext();
  const [lock, setLock] = useState(false);

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKhValue(+event.target.value);
  };
  const handleChange = factoryHandleChange(
    setKhValue,
    lastKhValidValue,
    setLastKhValidValue,
    min,
    max,
  );

  const handleLock = () => {
    setLock(!lock);
  };
  return (
    <div className={props.class}>
      <RangeSlider
        value={khValue}
        lock={{
          isLocked: lock,
          locker: <Locker lock={lock} handleLock={handleLock} />,
        }}
        title={"Kh= σh/σv [0, 3]"}
        popoverTitle={"test 2"}
        min={0.0}
        max={3.0}
        step={0.01}
        handleLock={handleLock}
        handleRangeChange={handleRangeChange}
        handleChange={handleChange}
      >
        <div> ther ther hter hte het ereh tehter htete htet ehbtb</div>
      </RangeSlider>
    </div>
  );
};

const RValue = (props: { class: string }) => {
  const { min, max } = { min: 0, max: 3 };

  const { RValue, lastRValueValidValue, setRValue, setLastRValueValidValue } =
    useRValueContext();
  const [lock, setLock] = useState(false);

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRValue(+event.target.value);
  };
  const handleChange = factoryHandleChange(
    setRValue,
    lastRValueValidValue,
    setLastRValueValidValue,
    min,
    max,
  );

  const handleLock = () => {
    setLock(!lock);
  };
  return (
    <div className={props.class}>
      <RangeSlider
        value={RValue}
        lock={{
          isLocked: lock,
          locker: <Locker lock={lock} handleLock={handleLock} />,
        }}
        title={"R [0, 3]"}
        popoverTitle={"test 2"}
        min={0.0}
        max={3.0}
        step={0.01}
        handleLock={handleLock}
        handleRangeChange={handleRangeChange}
        handleChange={handleChange}
      >
        <div> ther ther hter hte het ereh tehter htete htet ehbtb</div>
      </RangeSlider>
    </div>
  );
};

const Theta = (props: { class: string }) => {
  const { min, max } = { min: 0, max: 180 };
  const {
    ThetaValue,
    lastThetaValidValue,
    setThetaValue,
    setLastThetaValidValue,
  } = useThetaContext();
  const [lock, setLock] = useState(false);

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setThetaValue(+event.target.value);
  };
  const handleChange = factoryHandleChange(
    setThetaValue,
    lastThetaValidValue,
    setLastThetaValidValue,
    min,
    max,
  );

  const handleLock = () => {
    setLock(!lock);
  };
  return (
    <div className={props.class}>
      <RangeSlider
        value={ThetaValue}
        lock={{
          isLocked: lock,
          locker: <Locker lock={lock} handleLock={handleLock} />,
        }}
        title={"θ [0, 180]"}
        popoverTitle={"test 2"}
        min={0.0}
        max={180.0}
        step={1.0}
        handleLock={handleLock}
        handleRangeChange={handleRangeChange}
        handleChange={handleChange}
      >
        <div> ther ther hter hte het ereh tehter htete htet ehbtb</div>
      </RangeSlider>
    </div>
  );
};

export const factoryHandleChange =
  (
    setValue: (value: number) => void,
    lastValidValue: number,
    setLastValidValue: (value: number) => void,
    min: number,
    max: number,
  ) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const enteredValue = +event.target.value;
    if (isNaN(enteredValue) || event.target.value === "") {
      setValue(lastValidValue);
      return;
    }

    if (enteredValue < min) {
      setValue(min);
      setLastValidValue(min);
      return;
    }

    if (enteredValue > max) {
      setValue(max);
      setLastValidValue(max);
      return;
    }

    setValue(enteredValue);
    setLastValidValue(enteredValue);
  };
