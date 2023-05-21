import {createAsyncThunk} from "@reduxjs/toolkit";
import {StoreType} from "../bll/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: StoreType,
}>()