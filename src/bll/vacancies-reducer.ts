import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API, VacancyType} from "../api/API";
import {StoreType} from "./store";

const initialState: InitialStateType = {
    totalCount: 0,
    pageNumber: 1,
    vacancies: [],
}

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: StoreType,
}>()

//thunk
export const getVacancies = createAppAsyncThunk('vacancies/getVacancies',
    async (token: string | null, thunkAPI) => {
        const pageNumber = thunkAPI.getState().vacancies.pageNumber
        const response = await API.fetchVacancies(token, pageNumber)
        return response.data
    })


//slice
const slice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
        setPageNumber: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getVacancies.fulfilled, (state, action) => {
            state.vacancies = action.payload.objects.map(item => ({...item, favoriteInApp: false}))
            state.totalCount = action.payload.total
        })
    }
})

export const vacanciesReducer = slice.reducer

//actions
export const {setPageNumber} = slice.actions

//types
export type VacancyAppType = VacancyType & {
    favoriteInApp: boolean
}

type InitialStateType = {
    totalCount: number
    pageNumber: number
    vacancies: Array<VacancyAppType>
}