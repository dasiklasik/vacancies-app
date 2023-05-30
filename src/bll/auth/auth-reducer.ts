import {createSlice} from "@reduxjs/toolkit";
import {API} from "../../api/API";
import {AxiosError} from "axios";
import { createAppAsyncThunk } from "../store-types";
import {setError} from "../app/app-reducer";

export const getAccessToken = createAppAsyncThunk('auth/me',
    async (param = undefined, thunkAPI) => {

        const ttl = localStorage.getItem('ttl')
        const token = localStorage.getItem('access_token')
        const refreshToken = localStorage.getItem('refresh_token')

        if (ttl === null || token === null || refreshToken === null) {
            try {
                const response = await API.getAccessToken()

                localStorage.setItem('access_token', response.data.access_token)
                localStorage.setItem('refresh_token', response.data.refresh_token)
                localStorage.setItem('ttl', response.data.ttl)

                return response.data.access_token
            } catch (err) {
                const error: AxiosError = err as any;
                thunkAPI.dispatch(setError(error.message))
            }

        } else if ( Number(ttl) < Date.now() / 1000) {
            try {
                const response = await API.refreshToken(refreshToken)
                return response.data.access_token
            } catch (err) {
                const error: AxiosError = err as any;
                thunkAPI.dispatch(setError(error.message))
            }
        }
        return token
    })

const initialState = {
    isAuth: false,
    accessToken: null as string | null,
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload
                state.isAuth = true
            })
    }
})

export const authReducer = slice.reducer

