import {AnyAction, combineReducers} from "redux";
import {authReducer} from "./auth/auth-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {vacanciesReducer} from "./vacancies/vacancies-reducer";
import {appReducer} from "./app/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import { TypedUseSelectorHook } from "react-redux";

const reducer = combineReducers({
    auth: authReducer,
    vacancies: vacanciesReducer,
    app: appReducer,
})

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).prepend(thunk),
})

export type StoreType = ReturnType<typeof reducer>

export const useAppDispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>;
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector;