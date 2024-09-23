import { DockviewApi } from 'dockview'
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useMemo,
    useState,
} from 'react'

interface DockApiContextProps {
    api?: DockviewApi
    setApi?: Dispatch<SetStateAction<DockviewApi>>
}

export const DockApiContext = createContext<DockApiContextProps>({
    api: {} as DockviewApi,
    setApi: () => {},
})

export const useDockApi = () => useContext(DockApiContext)

interface DockApiProviderProps {
    children: React.ReactNode
}

export const DockApiProvider: React.FC<DockApiProviderProps> = ({
    children,
}) => {
    const [api, setApi] = useState<DockviewApi>({} as DockviewApi)
    const contextValue = useMemo(() => ({ api, setApi }), [api, setApi])
    return (
        <DockApiContext.Provider value={contextValue}>
            {children}
        </DockApiContext.Provider>
    )
}
