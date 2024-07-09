import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import * as React from "react";

interface ShapeContextProps {
  square: boolean;
  setSquare: (value: boolean) => void;
  circle: boolean;
  setCircle: (value: boolean) => void;
}

const ShapeContext = createContext<ShapeContextProps>({
  square: true,
  setSquare: () => {},
  circle: false,
  setCircle: () => {},
});

export const useShapeContext = () => useContext(ShapeContext);

export const ShapeProvider = ({ children }: { children: ReactNode }) => {
  const [square, setSquare] = useState(true);
  const [circle, setCircle] = useState(!square);

  const contextValue = useMemo(
    () => ({
      square: square,
      setSquare: setSquare,
      circle: circle,
      setCircle: setCircle,
    }),
    [square, circle],
  );

  return (
    <ShapeContext.Provider value={contextValue}>
      {children}
    </ShapeContext.Provider>
  );
};
