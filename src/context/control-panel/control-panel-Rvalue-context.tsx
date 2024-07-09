import * as React from "react";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface RValueContextProps {
  RValue: number;
  lastRValueValidValue: number;
  setRValue: (value: number) => void;
  setLastRValueValidValue: (value: number) => void;
}

const RValueContext = createContext<RValueContextProps>({
  RValue: 0,
  lastRValueValidValue: 0,
  setRValue: () => {},
  setLastRValueValidValue: () => {},
});

export const useRValueContext = () => useContext(RValueContext);

export const RValueProvider = ({ children }: { children: ReactNode }) => {
  const [lastRValueValidValue, setLastRValueValidValue] = useState(0);
  const [RValue, setRValue] = useState(lastRValueValidValue);

  const contextValue = useMemo(
    () => ({
      RValue,
      setRValue,
      lastRValueValidValue,
      setLastRValueValidValue,
    }),
    [RValue, lastRValueValidValue],
  );

  return (
    <RValueContext.Provider value={contextValue}>
      {children}
    </RValueContext.Provider>
  );
};
