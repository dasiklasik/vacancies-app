import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API} from "../api/API";

export const getAccessToken = createAsyncThunk('auth/me',
    async () => {
        const response = await API.getAccessToken()
        return response.data
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
                debugger
                state.accessToken = action.payload.access_token
                state.isAuth = true
            })
    }
})

export const authReducer = slice.reducer

