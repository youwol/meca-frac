import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { HSLColor } from "react-color";

interface TransparencyContextProps {
  transparencyValue: number;
  lastTransparencyValidValue: number;
  setTransparencyValue: (value: number) => void;
  setLastTransparencyValidValue: (value: number) => void;
}

const TransparencyContext = createContext<TransparencyContextProps>({
  transparencyValue: 0,
  lastTransparencyValidValue: 0,
  setTransparencyValue: () => {},
  setLastTransparencyValidValue: () => {},
});

export const useTransparencyContext = () => useContext(TransparencyContext);

export const TransparencyProvider = ({ children }: { children: ReactNode }) => {
  const [lastTransparencyValidValue, setLastTransparencyValidValue] =
    useState(0);
  const [transparencyValue, setTransparencyValue] = useState(
    lastTransparencyValidValue,
  );

  const contextValue = useMemo(
    () => ({
      transparencyValue: transparencyValue,
      setTransparencyValue: setTransparencyValue,
      lastTransparencyValidValue: lastTransparencyValidValue,
      setLastTransparencyValidValue: setLastTransparencyValidValue,
    }),
    [transparencyValue, lastTransparencyValidValue],
  );

  return (
    <TransparencyContext.Provider value={contextValue}>
      {children}
    </TransparencyContext.Provider>
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

export const useSurfaceColorContext = () => useContext(ColorContext);

export const SurfaceColorProvider = ({ children }: { children: ReactNode }) => {
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
