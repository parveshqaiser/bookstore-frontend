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

export const getSingleBook = createAsyncThunk(
    "singleBook/get",
    async (id, { rejectWithValue }) => {
        try {
            let res = await axios.get(BASE_URL + `/getBookById/${id}`,{withCredentials: true});
            return res?.data?.data;
        } catch (error) {
            return rejectWithValue({
                message : error.response?.data?.message || "Get Single Books Failed",
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
        isFetched : false,
        isBookLoading : false, // for single book
        singleBook : null, // for single book
        errorBook : null,   // for single book
    },
    reducers : {
        resetBookFetchStatus: (state) => {
            state.isFetched = false;
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(getAllBooksList.pending, (state, action)=>{
            state.isLoading = true;
            state.error = null;
        });

        builder.addCase(getAllBooksList.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.allBooks = action.payload;
            state.error = null;
            state.isFetched = true;
        });

        builder.addCase(getAllBooksList.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload; // return an object {error : 401, message : "Unauthorized user"}
        });

        builder.addCase(getSingleBook.pending, (state, action)=>{
            state.isBookLoading = true;
            state.errorBook = null;
        });

        builder.addCase(getSingleBook.fulfilled, (state, action)=>{
            state.isBookLoading = false;
            state.singleBook = action.payload;
        });

        builder.addCase(getSingleBook.rejected, (state, action)=>{
            state.isBookLoading = false;
            state.errorBook = action.payload; 
        });
    }
});

export let {resetBookFetchStatus} = bookSlice.actions;

export default bookSlice.reducer;