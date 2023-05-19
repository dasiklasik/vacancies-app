import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API, VacancyType} from "../api/API";
import {StoreType} from "./store";

const initialState: InitialStateType = {
    totalCount: 0,
    pageNumber: 1,
    keyword: '',
    vacancies: [],
}

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: StoreType,
}>()

//thunk
export const getVacancies = createAppAsyncThunk('vacancies/getVacancies',
    async (undefined, thunkAPI) => {
        const token = thunkAPI.getState().auth.accessToken
        const pageNumber = thunkAPI.getState().vacancies.pageNumber
        const keyword = thunkAPI.getState().vacancies.keyword
        const response = await API.fetchVacancies(token, pageNumber, keyword)
        return response.data
    })


//slice
const slice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
        setPageNumber: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload
        },
        setKeyword: (state, action: PayloadAction<string>) => {
            state.keyword = action.payload
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
export const {setPageNumber, setKeyword} = slice.actions

//types
export type VacancyAppType = VacancyType & {
    favoriteInApp: boolean
}

type InitialStateType = {
    totalCount: number
    pageNumber: number
    keyword: string
    vacancies: Array<VacancyAppType>
}