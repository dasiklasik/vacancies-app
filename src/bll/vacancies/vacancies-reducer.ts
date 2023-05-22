import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addToFavorite, deleteFromFavorite, getCatalogues, getOneVacancy, getVacancies, getVacanciesFromLS} from "./vacancies-reducer-thunks";
import { InitialStateType, StatusType } from "./vacancies-reducer-types";

const initialState: InitialStateType = {
    totalCount: 0,
    pageNumber: 1,
    keyword: null,
    vacanciesAmount: 4,
    salary: {
        min: undefined,
        max: undefined,
    },
    cataloguesItem: null,
    vacancies: [],
    catalogues: [],
    vacanciesEntityStatus: 'idle',
    no_agreement: null
}

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
            if (action.payload.max || action.payload.min) {
                state.no_agreement = 1
            } else if (!action.payload.max && !action.payload.min) {
                state.no_agreement = null
            }
        },
        clearVacancies: (state) => {
            state.vacancies = []
        },
        setVacanciesStatus: (state, action: PayloadAction<StatusType>) => {
            state.vacanciesEntityStatus = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getVacancies.fulfilled, (state, action) => {
                state.vacancies = action.payload.objects
                state.totalCount = action.payload.total
                state.vacanciesEntityStatus = 'succeed'
            })
            .addCase(getCatalogues.fulfilled, (state, action) => {
                state.catalogues = action.payload
            })
            .addCase(addToFavorite.fulfilled, (state, action) => {
                const index = state.vacancies.findIndex(item => item.id === action.payload)
                state.vacancies[index].favoriteInApp = true
            })
            .addCase(deleteFromFavorite.fulfilled, (state, action) => {
                const index = state.vacancies.findIndex(item => item.id === action.payload)
                if (index !== -1) {
                    state.vacancies[index].favoriteInApp = false
                }
            })
            .addCase(getVacanciesFromLS.fulfilled, (state, action) => {
                state.vacancies = action.payload.vacancies.map(item => ({...item, favoriteInApp: true}))
                state.totalCount = action.payload.totalCount
                state.vacanciesEntityStatus = 'succeed'
            })
            .addCase(getOneVacancy.fulfilled, (state, action) => {
                state.vacancies.push({...action.payload})
            })
    }
})

export const vacanciesReducer = slice.reducer

//actions
export const {setPageNumber, setKeyword, setFilterValues, clearVacancies, setVacanciesStatus} = slice.actions
