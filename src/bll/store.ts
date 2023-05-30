import {combineReducers} from "redux";
import {authReducer} from "./auth/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {vacanciesReducer} from "./vacancies/vacancies-reducer";
import {appReducer} from "./app/app-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const reducer = combineReducers({
    auth: authReducer,
    vacancies: vacanciesReducer,
    app: appReducer,
})

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
})

export type StoreType = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector;