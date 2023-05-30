import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {getAccessToken} from "../auth/auth-reducer";
import {createAppAsyncThunk} from "../store-types";
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
            .addMatcher((action) => [
                    getOneVacancy.rejected.type,
                    getVacancies.rejected.type,
                    getCatalogues.rejected.type,
                    getVacanciesFromLS.rejected.type,
                    getAccessToken.rejected.type,
                ].includes(action.type),
                (state, action) => {
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