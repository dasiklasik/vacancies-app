import {createAsyncThunk} from '@reduxjs/toolkit';
import {StoreType} from '../bll/store';
import {AxiosError} from "axios";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: StoreType,
    rejectValue: AxiosError,
}>()