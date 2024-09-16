import React, { useContext, useEffect, useState } from "react";
import { ItemDropdownBanner } from "../../../components/preferences/item-dropdown-banner";
import { ItemDropdown } from "../../../components/preferences/item-dropdown";
import { ThemeContext } from "../../../context/theme-context";

export function Labels() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const themes = [
    { name: "Light", value: "light" },
    { name: "Dark", value: "dark" },
  ];

  const { theme, changeTheme, loadTheme } = useContext(ThemeContext);
  const handleThemeChange = (newTheme: string) => {
    changeTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    loadTheme(newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme &&
      themes.some((themeOption) => themeOption.value === savedTheme)
    ) {
      changeTheme(savedTheme);
      loadTheme(savedTheme);
    }
  }, [changeTheme, loadTheme, themes]);
  return (
    <>
      <ItemDropdownBanner
        title={"Labels"}
        handleDropdown={handleDropdown}
        isOpen={isOpen}
      />
      <ItemDropdown class={!isOpen ? "d-none" : ""}>
        <select
          className="form-select"
          aria-label="Default select example"
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value)}
        >
          {themes.map((themeOption) => (
            <option key={themeOption.value} value={themeOption.value}>
              {themeOption.name}
            </option>
          ))}
        </select>
      </ItemDropdown>
    </>
  );
}
