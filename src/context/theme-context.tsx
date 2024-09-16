import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ThemeContextProps {
  theme: string;
  changeTheme: (newTheme: string) => void;
  loadTheme: (themeName: string) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "dark",
  changeTheme: (newTheme: string) => {},
  loadTheme: (themeName: string) => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const savedTheme = localStorage.getItem("theme") ?? "dark";
  const [theme, setTheme] = useState(savedTheme);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  const loadTheme = (themeName: string) => {
    const link = document.getElementById("theme-stylesheet") as HTMLLinkElement;
    if (link) {
      link.href = `build/styles/themes/${themeName}-theme.css`;
    } else {
      const newLink = document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.id = "theme-stylesheet";
      newLink.href = `build/styles/themes/${themeName}-theme.css`;
      document.head.appendChild(newLink);
    }
  };
  const contextValue = useMemo(
    () => ({
      theme,
      changeTheme,
      loadTheme,
    }),
    [theme],
  );
  useEffect(() => {
    loadTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
