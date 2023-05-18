import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API} from "../api/API";

export const getAccessToken = createAsyncThunk('auth/me',
    async () => {
        const response = await API.getAccessToken()
        return response
    })

const initialState = {
    isAuth: false,
    accessToken: 'v3.r.137440105.9e498203981303bb5fd7939b2c0c9f0bcb49fe73.445dcc677bf3af55b6aa662e924047e6d9e7de0f' as string | null,
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.data.access_token
                state.isAuth = true
            })
    }
})

export const authReducer = slice.reducer

