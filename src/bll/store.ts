import {combineReducers} from "redux";
import {authReducer} from "./auth/auth-reducer";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {vacanciesReducer} from "./vacancies/vacancies-reducer";
import {appReducer} from "./app/app-reducer";

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