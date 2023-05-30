import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, StoreType} from './store';
import {AxiosError} from "axios";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: StoreType,
    rejectValue: AxiosError,
}>()