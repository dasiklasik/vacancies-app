import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API, CatalogueType, VacancyType} from "../api/API";
import { createAppAsyncThunk } from "../utils/createAppAsyncThunk";
import { setIsAppInitialized } from "./app-reducer";

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

//thunk
export const getCatalogues = createAppAsyncThunk('vacancies/getCatalogues',
    async (param = undefined, thunkAPI) => {
        const token = thunkAPI.getState().auth.accessToken
        const response = await API.getCatalogues(token)

        thunkAPI.dispatch(setIsAppInitialized(true))

        return response.data
    })

export const getVacancies = createAppAsyncThunk('vacancies/getVacancies',
    async (param = undefined, thunkAPI) => {
        thunkAPI.dispatch(setVacanciesStatus('loading'))

        //проверяем наличие favorites в localstorage и создаем, если нет
        if (!localStorage.getItem('favorites')) {
            localStorage.setItem('favorites', JSON.stringify([]))
        }

        const requestData = {
            page: thunkAPI.getState().vacancies.pageNumber - 1,
            keyword: thunkAPI.getState().vacancies.keyword,
            payment_from: thunkAPI.getState().vacancies.salary.min,
            payment_to: thunkAPI.getState().vacancies.salary.max,
            catalogues: thunkAPI.getState().vacancies.cataloguesItem,
            no_agreement: thunkAPI.getState().vacancies.no_agreement
        }
        const token = thunkAPI.getState().auth.accessToken
        const vacanciesAmount = thunkAPI.getState().vacancies.vacanciesAmount
        const response = await API.fetchVacancies(token, requestData, vacanciesAmount)

        return {
            //формируем вакансию и добавляем свойство favoriteInApp
            ...response.data, objects: response.data.objects.map(item => {
                const favorites = localStorage.getItem('favorites')
                let favoritesArray: number[] = favorites ? JSON.parse(favorites) : []
                const isFavorite = favoritesArray.includes(item.id)

                return {...item, favoriteInApp: isFavorite}
            })
        }
    })

export const getVacanciesFromLS = createAppAsyncThunk('vacancies/getVacanciesIdFromLS',
    async (params = undefined, thunkAPI) => {
        thunkAPI.dispatch(setVacanciesStatus('loading'))

        const vacanciesAmount = thunkAPI.getState().vacancies.vacanciesAmount
        const token = thunkAPI.getState().auth.accessToken

        const pageNumber = thunkAPI.getState().vacancies.pageNumber
        let startAt = pageNumber - 1
        let endAt = startAt + 4

        for (let i = 1; i < pageNumber; i++) {
            startAt += 3
            endAt += 4
        }

        let favorites = localStorage.getItem('favorites')
        let favoritesArray: number[] = favorites ? JSON.parse(favorites) : []

        if (favoritesArray.length === 0) return {vacancies: [], totalCount: 0}

        const response= await API.getVacanciesByIds(token, favoritesArray.slice(startAt, endAt), vacanciesAmount)

        return {vacancies: response.data.objects, totalCount: favoritesArray.length}
    })

export const addToFavorite = createAppAsyncThunk('vacancies/addToFavorite',
     (id: number) => {

        let favorites = localStorage.getItem('favorites')
        if(favorites !== null) {
            const favoritesArray: number[] = JSON.parse(favorites)
            favoritesArray.push(id)
            const favoritesArrayString = JSON.stringify(favoritesArray)
            localStorage.setItem('favorites', favoritesArrayString)
        } else {
            localStorage.setItem('favorites', JSON.stringify([id]))
        }
        return id
    })

export const deleteFromFavorite = createAppAsyncThunk('vacancies/deleteFromFavorite',
    (id: number) => {

        let favorites = localStorage.getItem('favorites')
        if(favorites !== null) {
            let favoritesArray: number[] = JSON.parse(favorites)
            favoritesArray = favoritesArray.filter(item => item !== id)
            const favoritesArrayString = JSON.stringify(favoritesArray)
            localStorage.setItem('favorites', favoritesArrayString)
        } else {
            localStorage.setItem('favorites', JSON.stringify([]))
        }
        return id
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
    }
})

export const vacanciesReducer = slice.reducer

//actions
export const {setPageNumber, setKeyword, setFilterValues, clearVacancies, setVacanciesStatus} = slice.actions

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
    no_agreement: 1 | null
    salary: {
        min: number | undefined,
        max: number | undefined,
    },
    vacancies: Array<VacancyAppType>
    catalogues: Array<CatalogueType>
    vacanciesEntityStatus: StatusType
}

export type StatusType = 'idle' | 'loading' | 'succeed' | 'failed'