import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
interface WindowContextProps {
  closeWindow: boolean;
  handleCloseWindow: () => void;
}

const WindowContext = createContext<WindowContextProps>({
  closeWindow: false,
  handleCloseWindow: () => {},
});
export const useWindowContext = () => useContext(WindowContext);
export const WindowProvider = ({ children }: { children: ReactNode }) => {
  const [closeWindow, setCloseWindow] = useState(false);
  const handleCloseWindow = () => {
    setCloseWindow(true);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toUpperCase() === "Q") {
        window.close();
        setCloseWindow(true);
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  useEffect(() => {
    setCloseWindow(false);
  }, [closeWindow]);
  const contextValue = useMemo(
    () => ({
      closeWindow,
      handleCloseWindow,
    }),
    [closeWindow, handleCloseWindow],
  );

  return (
    <WindowContext.Provider value={contextValue}>
      {children}
    </WindowContext.Provider>
  );
};
