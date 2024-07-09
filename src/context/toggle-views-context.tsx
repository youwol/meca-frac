import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

interface ToggleContextProps {
  treeViewChecked: boolean;
  setTreeViewChecked: Dispatch<SetStateAction<boolean>>;
  graphChecked: boolean;
  setGraphChecked: Dispatch<SetStateAction<boolean>>;
  informationChecked: boolean;
  setInformationChecked: Dispatch<SetStateAction<boolean>>;
  controlChecked: boolean;
  setControlChecked: Dispatch<SetStateAction<boolean>>;
}

const toggleContext = createContext<ToggleContextProps>({
  treeViewChecked: true,
  setTreeViewChecked: () => {},
  graphChecked: true,
  setGraphChecked: () => {},
  informationChecked: true,
  setInformationChecked: () => {},
  controlChecked: true,
  setControlChecked: () => {},
});

export const useToggleViewsContext = () => useContext(toggleContext);

export const ToggleViewsProvider = ({ children }: { children: ReactNode }) => {
  const [treeViewChecked, setTreeViewChecked] = useState<boolean>(
    localStorage.getItem("treeViewChecked") === "false" || true,
  );
  const [graphChecked, setGraphChecked] = useState<boolean>(
    localStorage.getItem("graphChecked") === "false" || true,
  );
  const [informationChecked, setInformationChecked] = useState<boolean>(
    localStorage.getItem("informationChecked") === "false" || true,
  );
  const [controlChecked, setControlChecked] = useState<boolean>(
    localStorage.getItem("controlChecked") === "false" || true,
  );

  useMemo(() => {
    localStorage.setItem("treeViewChecked", String(treeViewChecked));
    localStorage.setItem("graphChecked", String(graphChecked));
    localStorage.setItem("informationChecked", String(informationChecked));
    localStorage.setItem("controlChecked", String(controlChecked));
  }, [treeViewChecked, graphChecked, informationChecked, controlChecked]);

  const contextValue = useMemo(
    () => ({
      treeViewChecked,
      setTreeViewChecked,
      graphChecked,
      setGraphChecked,
      informationChecked,
      setInformationChecked,
      controlChecked,
      setControlChecked,
    }),
    [
      treeViewChecked,
      setTreeViewChecked,
      graphChecked,
      setGraphChecked,
      informationChecked,
      setInformationChecked,
      controlChecked,
      setControlChecked,
    ],
  );

  return (
    <toggleContext.Provider value={contextValue}>
      {children}
    </toggleContext.Provider>
  );
};
