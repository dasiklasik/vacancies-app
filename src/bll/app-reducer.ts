import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: initialStateType = {
    isAppInitialized: false,
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsAppInitialized: (state, action: PayloadAction<boolean>) => {
            state.isAppInitialized = action.payload
        },
    },
})

export const appReducer = slice.reducer

//actions
export const {setIsAppInitialized} = slice.actions

//types
type initialStateType = {
    isAppInitialized: boolean
}

