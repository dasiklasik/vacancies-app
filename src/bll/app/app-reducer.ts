import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../utils/createAppAsyncThunk";
import {getAccessToken} from "../auth/auth-reducer";
import {getCatalogues, getOneVacancy, getVacancies, getVacanciesFromLS} from "../vacancies/vacancies-reducer-thunks";

const initialState: initialStateType = {
    isAppInitialized: false,
    error: null,
}

//thunk
export const initApp = createAppAsyncThunk('app/initApp',
    async (params, thunkAPI) => {
        await thunkAPI.dispatch(getAccessToken())
        await thunkAPI.dispatch(getCatalogues())

        return true
    })

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
            .addCase(initApp.fulfilled, (state, action) => {
                state.isAppInitialized = action.payload
            })
            .addCase(getVacancies.rejected, (state, action) => {
                state.error = action.payload && action.payload.message ? action.payload.message : 'Some error occurred'
            })
            .addCase(getCatalogues.rejected, (state, action) => {
                state.error = action.payload && action.payload.message ? action.payload.message : 'Some error occurred'
            })
            .addCase(getVacanciesFromLS.rejected, (state, action) => {
                state.error = action.payload && action.payload.message ? action.payload.message : 'Some error occurred'
            })
            .addCase(getOneVacancy.rejected, (state, action) => {
                state.error = action.payload && action.payload.message ? action.payload.message : 'Some error occurred'
            })
            .addCase(getAccessToken.rejected, (state, action) => {
                state.error = action.payload && action.payload.message ? action.payload.message : 'Some error occurred'
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