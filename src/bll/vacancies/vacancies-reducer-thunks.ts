import {createAppAsyncThunk} from "../../utils/createAppAsyncThunk";
import {API} from "../../api/API";
import {setIsAppInitialized} from "../app/app-reducer";
import {checkIsFavorite} from "../../utils/checkIsFavorite";
import {getFavoriteFromLS} from "../../utils/getFavoriteFromLS";
import {setVacanciesStatus} from "./vacancies-reducer";

export const getCatalogues = createAppAsyncThunk('vacancies/getCatalogues',
    async (param = undefined, thunkAPI) => {
        const response = await API.getCatalogues()
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
        const vacanciesAmount = thunkAPI.getState().vacancies.vacanciesAmount
        const response = await API.fetchVacancies(requestData, vacanciesAmount)

        return {
            //формируем вакансию и добавляем свойство favoriteInApp
            ...response.data, objects: response.data.objects.map(item => {
                return {...item, favoriteInApp: checkIsFavorite(item.id)}
            })
        }
    })

export const getVacanciesFromLS = createAppAsyncThunk('vacancies/getVacanciesIdFromLS',
    async (params = undefined, thunkAPI) => {
        thunkAPI.dispatch(setVacanciesStatus('loading'))

        const vacanciesAmount = thunkAPI.getState().vacancies.vacanciesAmount

        const pageNumber = thunkAPI.getState().vacancies.pageNumber
        let startAt = pageNumber - 1
        let endAt = startAt + 4

        for (let i = 1; i < pageNumber; i++) {
            startAt += 3
            endAt += 4
        }

        const favorites: number[] = getFavoriteFromLS()

        if (favorites.length === 0) return {vacancies: [], totalCount: 0}

        const response= await API.getVacanciesByIds(favorites.slice(startAt, endAt), vacanciesAmount)

        return {vacancies: response.data.objects, totalCount: favorites.length}
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
    async (id: number) => {

        const response = await API.getOneVacancy(id)

        return {...response.data, favoriteInApp: checkIsFavorite(response.data.id)}
    })