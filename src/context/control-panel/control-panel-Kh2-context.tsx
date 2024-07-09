import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

interface KhContextProps {
  khValue: number;
  lastKhValidValue: number;
  setKhValue: (value: number) => void;
  setLastKhValidValue: (value: number) => void;
}

const KhContext = createContext<KhContextProps>({
  khValue: 0,
  lastKhValidValue: 0,
  setKhValue: () => {},
  setLastKhValidValue: () => {},
});

export const useKhContext = () => useContext(KhContext);

export const KhProvider = ({ children }: { children: ReactNode }) => {
  const [lastKhValidValue, setLastKhValidValue] = useState(0);
  const [khValue, setKhValue] = useState(lastKhValidValue);

  const contextValue = useMemo(
    () => ({
      khValue,
      setKhValue,
      lastKhValidValue,
      setLastKhValidValue,
    }),
    [khValue, lastKhValidValue],
  );

  return (
    <KhContext.Provider value={contextValue}>{children}</KhContext.Provider>
  );
};
