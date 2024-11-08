import { configureStore } from '@reduxjs/toolkit'
import basicReducer from './basic-slice'
import fractureReducer from './fracture-slice'
import dataFrameReducer from './dataFrame-slice'
import treeViewReducer from './tree-view-slice'

const store = configureStore({
    reducer: {
        basic: basicReducer,
        fracture: fractureReducer,
        dataFrame: dataFrameReducer,
        treeView: treeViewReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        })
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
