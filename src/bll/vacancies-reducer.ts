import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API, VacancyType} from "../api/API";

const initialState: Array<VacancyAppType> = []

export const getVacancies = createAsyncThunk('vacancies/getVacancies',
    async (token: string | null) => {
        const response = await API.fetchVacancies(token)
        return response.data
    })

const slice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getVacancies.fulfilled, (state, action) => {
            return action.payload.objects.map(item => ({...item, favoriteInApp: false}))
        })
    }
})

export const vacanciesReducer = slice.reducer

//types
export type VacancyAppType = VacancyType & {
    favoriteInApp: boolean
}