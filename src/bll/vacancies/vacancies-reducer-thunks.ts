import {API} from "../../api/API";
import {setIsAppInitialized} from "../app/app-reducer";
import {checkIsFavorite} from "../../utils/checkIsFavorite";
import {setVacanciesStatus} from "./vacancies-reducer";
import {AxiosError} from "axios";
import { createAppAsyncThunk } from "../store-types";
import {getIdsArrayByPage} from "../../utils/getIdsArrayByPage";
import { getFavoriteFromLS } from "../../utils/getFavoriteFromLS";

export const getCatalogues = createAppAsyncThunk('vacancies/getCatalogues',
    async (param = undefined, thunkAPI) => {
        try {
            const response = await API.getCatalogues()
            thunkAPI.dispatch(setIsAppInitialized(true))
            return response.data
        } catch (err) {
            const error: AxiosError = err as any;
            return thunkAPI.rejectWithValue(error)
        }
    })

export const getVacancies = createAppAsyncThunk('vacancies/getVacancies',
    async (param = undefined, thunkAPI) => {
        thunkAPI.dispatch(setVacanciesStatus('loading'))

        //проверяем наличие favorites в localstorage и создаем, если нет
        if (!localStorage.getItem('favorites')) {
            localStorage.setItem('favorites', JSON.stringify([]))
        }

        const vacancies = thunkAPI.getState().vacancies

        const requestData = {
            page: vacancies.pageNumber - 1,
            keyword: vacancies.keyword,
            payment_from: vacancies.salary.min,
            payment_to: vacancies.salary.max,
            catalogues: vacancies.cataloguesItem,
            no_agreement: vacancies.no_agreement
        }
        const vacanciesAmount = thunkAPI.getState().vacancies.vacanciesAmount
        try {
            const response = await API.fetchVacancies(requestData, vacanciesAmount)
            return {
                //формируем вакансию и добавляем свойство favoriteInApp
                ...response.data, objects: response.data.objects.map(item => {
                    return {...item, favoriteInApp: checkIsFavorite(item.id)}
                })
            }
        } catch (err) {
            const error: AxiosError = err as any;
            return thunkAPI.rejectWithValue(error)
        }
    })

export const getVacanciesFromLS = createAppAsyncThunk('vacancies/getVacanciesIdFromLS',
    async (params = undefined, thunkAPI) => {
        thunkAPI.dispatch(setVacanciesStatus('loading'))

        const vacanciesAmount = thunkAPI.getState().vacancies.vacanciesAmount

        const pageNumber = thunkAPI.getState().vacancies.pageNumber

        const favorites: number[] = getIdsArrayByPage(pageNumber)

        if (favorites.length === 0) return {vacancies: [], totalCount: 0}

        try {
            const response= await API.getVacanciesByIds(favorites, vacanciesAmount)
            return {vacancies: response.data.objects, totalCount: favorites.length}
        } catch (err) {
            const error: AxiosError = err as any;
            return thunkAPI.rejectWithValue(error)
        }
    })

export const addToFavorite = createAppAsyncThunk('vacancies/addToFavorite',
    (id: number) => {

        const favorites: number[] = getFavoriteFromLS()
        favorites.push(id)
        const favoritesArrayString = JSON.stringify(favorites)
        localStorage.setItem('favorites', favoritesArrayString)

        return id
    })

export const deleteFromFavorite = createAppAsyncThunk('vacancies/deleteFromFavorite',
    (id: number) => {

        const favorites: number[] = getFavoriteFromLS()
        const filteredFavorite = favorites.filter(item => item !== id)
        const favoritesArrayString = JSON.stringify(filteredFavorite)
        localStorage.setItem('favorites', favoritesArrayString)

        return id
    })

export const getOneVacancy = createAppAsyncThunk('vacancies/getOneVacancy',
    async (id: number, thunkAPI) => {
        try {
            const response = await API.getOneVacancy(id)
            return {...response.data, favoriteInApp: checkIsFavorite(response.data.id)}
        } catch (err) {
            const error: AxiosError = err as any;
            return thunkAPI.rejectWithValue(error)
        }
    })