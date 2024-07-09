import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/theme-context";

interface ThemesProps {
  onThemeChange: (theme: string) => void;
}

export function Themes() {
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
      <h5>Themes:</h5>
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
    </>
  );
}
