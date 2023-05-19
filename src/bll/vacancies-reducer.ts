import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API, CatalogueType, VacancyType} from "../api/API";
import {StoreType} from "./store";

const initialState: InitialStateType = {
    totalCount: 0,
    pageNumber: 1,
    keyword: null,
    vacanciesAmount: 4,
    salary: {
        min: 0,
        max: 0,
    },
    cataloguesItem: null,
    vacancies: [],
    catalogues: []
}

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: StoreType,
}>()

//thunk
export const getCatalogues = createAppAsyncThunk('vacancies/getCatalogues',
    async (param = undefined, thunkAPI) => {
        const token = thunkAPI.getState().auth.accessToken
        const response = await API.getCatalogues(token)

        return response.data
    })

export const getVacancies = createAppAsyncThunk('vacancies/getVacancies',
    async (param = undefined, thunkAPI) => {
        const requestData = {
            page: thunkAPI.getState().vacancies.pageNumber,
            keyword: thunkAPI.getState().vacancies.keyword,
            payment_from: thunkAPI.getState().vacancies.salary.min,
            payment_to: thunkAPI.getState().vacancies.salary.max,
            catalogues: thunkAPI.getState().vacancies.cataloguesItem,
        }
        const token = thunkAPI.getState().auth.accessToken
        const vacanciesAmount = thunkAPI.getState().vacancies.vacanciesAmount
        const response = await API.fetchVacancies(token, requestData, vacanciesAmount)
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
        },
        setFilterValues: (state, action: PayloadAction<{min: number | undefined, max: number | undefined, catalogues: number}>) => {
            state.cataloguesItem = action.payload.catalogues
            state.salary.max = action.payload.max
            state.salary.min = action.payload.min
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getVacancies.fulfilled, (state, action) => {
            state.vacancies = action.payload.objects.map(item => ({...item, favoriteInApp: false}))
            state.totalCount = action.payload.total
        })
            .addCase(getCatalogues.fulfilled, (state, action) => {
                state.catalogues = action.payload
            })
    }
})

export const vacanciesReducer = slice.reducer

//actions
export const {setPageNumber, setKeyword, setFilterValues} = slice.actions

//types
export type VacancyAppType = VacancyType & {
    favoriteInApp: boolean
}

export type InitialStateType = {
    totalCount: number
    pageNumber: number
    keyword: string | null
    cataloguesItem: null | number
    vacanciesAmount: number
    salary: {
        min: number | undefined,
        max: number | undefined,
    },
    vacancies: Array<VacancyAppType>
    catalogues: Array<CatalogueType>
}