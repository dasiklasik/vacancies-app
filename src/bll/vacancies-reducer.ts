import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API, CatalogueType} from "../api/API";
import { setIsAppInitialized } from "./app-reducer";
import {StoreType} from "./store";

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
}

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: StoreType,
}>()

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
            //формируем вакансию и добавляем свойство favoriteInApp
            ...response.data, objects: response.data.objects.map(item => {
                const favorites = localStorage.getItem('favorites')
                let favoritesArray: VacancyAppType[] = favorites ? JSON.parse(favorites) : []
                const isFavorite = !!favoritesArray.find(i => i.id === item.id)

                const vacancy: VacancyAppType = {
                    currency: item.currency,
                    descriptionText: item.vacancyRichText,
                    favoriteInApp: isFavorite,
                    firm_name: item.firm_name,
                    id: item.id,
                    payment_from: item.payment_from,
                    payment_to: item.payment_to,
                    profession: item.profession,
                    town: item.town.title,
                    type_of_work: item.type_of_work.title,
                }
                return vacancy
            })
        }
    })

export const getVacanciesFromLS = createAppAsyncThunk('vacancies/getVacanciesIdFromLS',
    (params = undefined, thunkAPI) => {
        // thunkAPI.dispatch(clearVacancies())

        const pageNumber = thunkAPI.getState().vacancies.pageNumber
        let startAt = pageNumber - 1
        let endAt = startAt + 4

        for (let i = 1; i < pageNumber; i++) {
            startAt += 3
            endAt += 4
        }

        let favorites = localStorage.getItem('favorites')
        let favoritesArray: VacancyAppType[] = favorites ? JSON.parse(favorites) : []

        return {vacanciesIdFromLS: favoritesArray.slice(startAt, endAt), totalCount: favoritesArray.length}
    })

export const addToFavorite = createAppAsyncThunk('vacancies/addToFavorite',
     (vacancyData: VacancyAppType) => {

        let favorites = localStorage.getItem('favorites')
        if(favorites !== null) {
            const favoritesArray: VacancyAppType[] = JSON.parse(favorites)
            favoritesArray.push(vacancyData)
            const favoritesArrayString = JSON.stringify(favoritesArray)
            localStorage.setItem('favorites', favoritesArrayString)
        } else {
            localStorage.setItem('favorites', JSON.stringify([vacancyData]))
        }
        return vacancyData.id
    })

export const deleteFromFavorite = createAppAsyncThunk('vacancies/deleteFromFavorite',
    (vacancyData: VacancyAppType) => {

        let favorites = localStorage.getItem('favorites')
        if(favorites !== null) {
            let favoritesArray: VacancyAppType[] = JSON.parse(favorites)
            favoritesArray = favoritesArray.filter(item => item.id !== vacancyData.id)
            const favoritesArrayString = JSON.stringify(favoritesArray)
            localStorage.setItem('favorites', favoritesArrayString)
        } else {
            localStorage.setItem('favorites', JSON.stringify([]))
        }
        return vacancyData.id
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
        },
        clearState: (state) => {
            state.vacancies = []
            state.keyword = null
            state.salary = {min: undefined, max: undefined}
            state.cataloguesItem = null
            state.pageNumber = 1
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
                state.vacancies = action.payload.vacanciesIdFromLS
                state.totalCount = action.payload.totalCount
            })
    }
})

export const vacanciesReducer = slice.reducer

//actions
export const {setPageNumber, setKeyword, setFilterValues, clearState, clearVacancies, setVacanciesStatus} = slice.actions

//types
export type VacancyAppType = {
    id: number
    profession: string
    firm_name: string
    town: string
    type_of_work: string
    payment_to: number
    payment_from: number
    currency: string
    descriptionText: string
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
    vacanciesEntityStatus: StatusType
}

export type StatusType = 'idle' | 'loading' | 'succeed' | 'failed'

