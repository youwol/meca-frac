import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { HSLColor } from "react-color";

interface SizeContextProps {
  sizeValue: number;
  lastSizeValidValue: number;
  setSizeValue: (value: number) => void;
  setLastSizeValidValue: (value: number) => void;
}

const SizeContext = createContext<SizeContextProps>({
  sizeValue: 0,
  lastSizeValidValue: 0,
  setSizeValue: () => {},
  setLastSizeValidValue: () => {},
});

export const useSizeContext = () => useContext(SizeContext);

export const SizeProvider = ({ children }: { children: ReactNode }) => {
  const [lastSizeValidValue, setLastSizeValidValue] = useState(0);
  const [sizeValue, setSizeValue] = useState(lastSizeValidValue);

  const contextValue = useMemo(
    () => ({
      sizeValue: sizeValue,
      setSizeValue: setSizeValue,
      lastSizeValidValue: lastSizeValidValue,
      setLastSizeValidValue: setLastSizeValidValue,
    }),
    [sizeValue, lastSizeValidValue],
  );

  return (
    <SizeContext.Provider value={contextValue}>{children}</SizeContext.Provider>
  );
};

interface ColorContextProps {
  color: HSLColor;
  setColor: (color: HSLColor) => void;
}
const initColor: HSLColor = {
  a: 1,
  h: 112.19040697674419,
  l: 0.47846099999999997,
  s: 0.1974296755639436,
};
const ColorContext = createContext<ColorContextProps>({
  color: initColor,
  setColor: () => {},
});

export const useNodeColorContext = () => useContext(ColorContext);

export const NodeColorProvider = ({ children }: { children: ReactNode }) => {
  const [color, setColor] = useState(initColor); // Default color is white

  const contextValue = useMemo(
    () => ({
      color: color,
      setColor: setColor,
    }),
    [color],
  );

  return (
    <ColorContext.Provider value={contextValue}>
      {children}
    </ColorContext.Provider>
  );
};
