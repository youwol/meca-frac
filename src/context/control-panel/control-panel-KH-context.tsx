import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

interface KHContextProps {
  kHValue: number;
  lastKHValidValue: number;
  setKHValue: (value: number) => void;
  setLastKHValidValue: (value: number) => void;
}

const KHContext = createContext<KHContextProps>({
  kHValue: 0,
  lastKHValidValue: 0,
  setKHValue: () => {},
  setLastKHValidValue: () => {},
});

export const useKHContext = () => useContext(KHContext);

export const KHProvider = ({ children }: { children: ReactNode }) => {
  const [lastKHValidValue, setLastKHValidValue] = useState(0);
  const [kHValue, setKHValue] = useState(lastKHValidValue);

  const contextValue = useMemo(
    () => ({
      kHValue: kHValue,
      setKHValue: setKHValue,
      lastKHValidValue: lastKHValidValue,
      setLastKHValidValue: setLastKHValidValue,
    }),
    [kHValue, lastKHValidValue],
  );

  return (
    <KHContext.Provider value={contextValue}>{children}</KHContext.Provider>
  );
};
