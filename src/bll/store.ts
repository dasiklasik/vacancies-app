import {combineReducers} from "redux";
import {authReducer} from "./auth-reducer";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";

const reducer = combineReducers({
    auth: authReducer,
})

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).prepend(thunk),
})

export type StoreType = ReturnType<typeof reducer>
