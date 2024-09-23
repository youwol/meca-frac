import * as React from 'react'
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { DataFrame } from '@youwol/dataframe'

interface DataFrameContextProps {
    dataframeValue: DataFrame[]
    appendDataframeValue: (value: DataFrame[]) => void
    loading: boolean
    setLoading: (value: boolean) => void
}

const DataFrameContext = createContext<DataFrameContextProps>({
    dataframeValue: [],
    appendDataframeValue: () => {},
    loading: false,
    setLoading: () => {},
})

export const useDataFrameContext = () => useContext(DataFrameContext)

export const DataFrameProvider = ({ children }: { children: ReactNode }) => {
    const [dataframeValue, setDataframeValue] = useState<DataFrame[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const appendDataframeValue = (newData: DataFrame[]) => {
        setDataframeValue((prevData) => [...prevData, ...newData])
    }

    const contextValue = useMemo(
        () => ({
            dataframeValue,
            appendDataframeValue,
            loading,
            setLoading,
        }),
        [dataframeValue, loading],
    )

    return (
        <DataFrameContext.Provider value={contextValue}>
            {children}
        </DataFrameContext.Provider>
    )
}
