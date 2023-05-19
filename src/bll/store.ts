import {combineReducers} from "redux";
import {authReducer} from "./auth-reducer";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {vacanciesReducer} from "./vacancies-reducer";

const reducer = combineReducers({
    auth: authReducer,
    vacancies: vacanciesReducer,
})

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).prepend(thunk),
})
debugger
export type StoreType = ReturnType<typeof reducer>