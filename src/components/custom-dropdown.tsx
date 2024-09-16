import React from "react";

interface CustomDropdownProps {
  options: Array<number | string | { label: string; value: number | string }>;
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
}

export const CustomDropdown = (props: CustomDropdownProps) => {
  const {
    options,
    value,
    onChange,
    placeholder = "Select an option",
    className = "form-select-sm my-1",
  } = props;
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onChange(
      isNaN(Number(selectedValue)) ? selectedValue : Number(selectedValue),
    );
  };

  return (
    <select
      className={className}
      value={value}
      onChange={handleChange}
      aria-label="Dropdown select"
      onClick={(ev) => ev.stopPropagation()}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => {
        if (typeof option === "object") {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        } else {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        }
      })}
    </select>
  );
};
