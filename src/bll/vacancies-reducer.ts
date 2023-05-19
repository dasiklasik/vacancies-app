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

        //проверяем наличие favorites в localstorage и создаем, если нет
        if (!localStorage.getItem('favorites')) {
            localStorage.setItem('favorites', JSON.stringify([]))
        }

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

        return {
            //добавляем свойство favoriteInApp в объекты вакансий
            ...response.data, objects: response.data.objects.map(item => {
                debugger
                const favorites = localStorage.getItem('favorites')
                let favoritesArray: number[] = favorites ? JSON.parse(favorites) : []
                const isFavorite = favoritesArray.includes(item.id)
                return {...item, favoriteInApp: isFavorite}
            })
        }
    })

export const addToFavorite = createAppAsyncThunk('vacancies/addToFavorite',
     (id: number) => {
    debugger
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
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getVacancies.fulfilled, (state, action) => {
                state.vacancies = action.payload.objects
                state.totalCount = action.payload.total
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
                state.vacancies[index].favoriteInApp = false
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