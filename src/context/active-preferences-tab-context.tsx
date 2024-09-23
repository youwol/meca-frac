import React, {
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from 'react'

const ActivePanelContext = createContext({
    activePanel: 'default',
    setActivePanel: (panel: string) => {},
})

export function ActivePreferencesTabProvider(props: { children: ReactNode }) {
    const [activePanel, setActivePanel] = useState('default')

    const contextValue = useMemo(
        () => ({
            activePanel,
            setActivePanel,
        }),
        [activePanel],
    )
    return (
        <ActivePanelContext.Provider value={contextValue}>
            {props.children}
        </ActivePanelContext.Provider>
    )
}

export function useActivePanel() {
    return useContext(ActivePanelContext)
}
