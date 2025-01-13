import react from 'react'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './reducers/AuthReducer/authReducer.ts'

const rootReducer = combineReducers({
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
