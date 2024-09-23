import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import * as React from 'react'

interface ThetaContextProps {
    ThetaValue: number
    lastThetaValidValue: number
    setThetaValue: (value: number) => void
    setLastThetaValidValue: (value: number) => void
}

const ThetaContext = createContext<ThetaContextProps>({
    ThetaValue: 0,
    lastThetaValidValue: 0,
    setThetaValue: () => {},
    setLastThetaValidValue: () => {},
})

export const useThetaContext = () => useContext(ThetaContext)

export const ThetaProvider = ({ children }: { children: ReactNode }) => {
    const [lastThetaValidValue, setLastThetaValidValue] = useState(0)
    const [ThetaValue, setThetaValue] = useState(lastThetaValidValue)

    const contextValue = useMemo(
        () => ({
            ThetaValue,
            setThetaValue,
            lastThetaValidValue,
            setLastThetaValidValue,
        }),
        [ThetaValue, lastThetaValidValue],
    )

    return (
        <ThetaContext.Provider value={contextValue}>
            {children}
        </ThetaContext.Provider>
    )
}
