import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/api";

export const getAllBooksList = createAsyncThunk(
    "allBooks/get",
    async (_, { rejectWithValue }) => {
        try {
            let res = await axios.get(BASE_URL + "/getAllBooks",{withCredentials: true});
            return res?.data?.data;
        } catch (error) {
            return rejectWithValue({
                message : error.response?.data?.message || "Get All Books Failed",
                error : error?.response?.status
            });
        }
    }
);

let bookSlice = createSlice({
    name : "book",
    initialState : {
        isLoading : false,
        allBooks : [],
        error : null,
    },
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(getAllBooksList.pending, (state, action)=>{
            state.isLoading = true;
            state.error = null;
        });

        builder.addCase(getAllBooksList.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.allBooks = action.payload;
            state.error = null;
        });

        builder.addCase(getAllBooksList.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload; // return an object {error : 401, message : "Unauthorized user"}
        });
    }
});

export default bookSlice.reducer;