import React, { ChangeEvent, ReactNode } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

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
  handleLock?: () => void;
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

  const popover = (
    <Popover id="popover-basic" className={"mh-50"}>
      <Popover.Header as="h3">
        {props.popoverTitle ?? "Information"}
      </Popover.Header>
      <Popover.Body className={"overflow-auto"}>
        <div className={"overflow-auto"}>{props.children}</div>
      </Popover.Body>
    </Popover>
  );
  return (
    <div className={"d-flex align-items-center"}>
      {title && (
        <label
          className="form-label m-1 p-1"
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
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <i className={"fas fa-info-circle fa-lg"} />
        </OverlayTrigger>
      )}
    </div>
  );
}
