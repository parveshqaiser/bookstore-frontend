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
            return rejectWithValue(
                error.response?.data?.message || "Get All Books Failed"
            );
        }
    }
);

let bookSlice = createSlice({
    name : "book",
    initialState : {
        isLoading : false,
        allBooks : [],
    },
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(getAllBooksList.pending, (state, action)=>{
            state.isLoading = true;
        });

        builder.addCase(getAllBooksList.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.allBooks = action.payload
        });
    }
});

export default bookSlice.reducer;