import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import * as React from "react";

interface SigmaContextProps {
  gradientSigma: boolean;
  setGradientSigma: (value: boolean) => void;
  constantSigma: boolean;
  setConstantSigma: (value: boolean) => void;
  constantSigmaValue: number;
  setConstantSigmaValue: (value: number) => void;
}

const SigmaContext = createContext<SigmaContextProps>({
  gradientSigma: true,
  setGradientSigma: () => {},
  constantSigma: false,
  setConstantSigma: () => {},
  constantSigmaValue: 0,
  setConstantSigmaValue: () => {},
});

export const useSigmaContext = () => useContext(SigmaContext);

export const SigmaProvider = ({ children }: { children: ReactNode }) => {
  const [gradientSigma, setGradientSigma] = useState(true);
  const [constantSigma, setConstantSigma] = useState(!gradientSigma);
  const [constantSigmaValue, setConstantSigmaValue] = useState(0);

  const contextValue = useMemo(
    () => ({
      gradientSigma,
      setGradientSigma,
      constantSigma,
      setConstantSigma,
      constantSigmaValue,
      setConstantSigmaValue,
    }),
    [gradientSigma, constantSigma, constantSigmaValue],
  );

  return (
    <SigmaContext.Provider value={contextValue}>
      {children}
    </SigmaContext.Provider>
  );
};
