import React, { ChangeEvent, ReactNode } from "react";
import { CustomPopover } from "./custom-popover";

import { generateUniqueId } from "../utils/generateUniqueId";

export function RangeSlider(props: {
  value: string | number;
  title?: string;
  popoverTitle?: string;
  min: number;
  max: number;
  step: number;
  lock?: {
    isLocked: boolean;
    locker?: ReactNode;
  };
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRangeChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
}) {
  const {
    value,
    title,
    lock,
    min,
    max,
    step,
    handleRangeChange,
    handleChange,
  } = props;

  const popoverId = generateUniqueId();

  return (
    <div className={"d-flex align-items-center"}>
      {title && (
        <label
          className="form-label "
          style={{ minWidth: "130px", textAlign: "left" }}
        >
          {title}
        </label>
      )}
      <input
        type="range"
        className={` ${lock?.isLocked ? " not-allowed" : " pointer"}`}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleRangeChange}
        disabled={lock?.isLocked}
      />
      <input
        className={` nb-input ms-2 ${lock?.isLocked ? " not-allowed" : " pointer"}`}
        type="number"
        style={{ width: "65px", height: "35px" }}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        value={value}
        disabled={lock?.isLocked ?? true}
      />
      {lock?.locker}
      {props.children && (
        <CustomPopover
          title={props.popoverTitle}
          trigger={<i className={"fas fa-info-circle fa-lg"} />}
          content={props.children}
          popoverId={popoverId}
        />
      )}
    </div>
  );
}
