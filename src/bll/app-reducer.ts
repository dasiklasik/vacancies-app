import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCatalogues, getVacancies, getVacanciesFromLS} from "./vacancies-reducer";

const initialState: initialStateType = {
    isAppInitialized: false,
    error: null,
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsAppInitialized: (state, action: PayloadAction<boolean>) => {
            state.isAppInitialized = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getVacancies.rejected, (state, action) => {
                state.error = action.error.message ? action.error.message : 'Some error occurred'
            })
            .addCase(getCatalogues.rejected, (state, action) => {
                state.error = action.error.message ? action.error.message : 'Some error occurred'
            })
            .addCase(getVacanciesFromLS.rejected, (state, action) => {
                state.error = action.error.message ? action.error.message : 'Some error occurred'
            })
    }
})

export const appReducer = slice.reducer

//actions
export const {setIsAppInitialized, setError} = slice.actions

//types
type initialStateType = {
    isAppInitialized: boolean
    error: string | null
}

