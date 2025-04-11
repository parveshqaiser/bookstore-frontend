import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/api";
import axios from "axios";

// get all books
export const getTotalBooks = createAsyncThunk("books/get", 
    async(_,{rejectWithValue})=>{
        try {
            let res = await axios.get(BASE_URL + "/getTotalBooks",{withCredentials: true});
            return res?.data?.data;
        } catch (error) {
            return rejectWithValue({
                message : error.response?.data?.message || "Get All Books Data Failed",
                error : error?.response?.status
            });
        }
    }
);

// total sales {price and qty}
export const getTotalSales = createAsyncThunk("totalSales/get", 
    async(_,{rejectWithValue})=>{
        try {
            let res = await axios.get(BASE_URL + "/getTotalSales",{withCredentials: true});
            return res?.data?.data;
        } catch (error) {
            return rejectWithValue({
                message : error.response?.data?.message || "Get Total Sales Data Failed",
                error : error?.response?.status
            });
        }
    }
);

// total book delivered or sold
export const getTotalQuantitySold = createAsyncThunk("totalQtySold/get", 
    async(_,{rejectWithValue})=>{
        try {
            let res = await axios.get(BASE_URL + "/getTotalQuantitySold",{withCredentials: true});
            return res?.data?.data;
        } catch (error) {
            return rejectWithValue({
                message : error.response?.data?.message || "Get Total Qty Sold Data Failed",
                error : error?.response?.status
            });
        }
    }
);

// monthly wise revenue
export const getMonthlyWiseRevenue = createAsyncThunk("monthlyWiseRevenue/get", 
    async(_,{rejectWithValue})=>{
        try {
            let res = await axios.get(BASE_URL + "/revenue/monthly/wise",{withCredentials: true});
            return res?.data?.data;
        } catch (error) {
            return rejectWithValue({
                message : error.response?.data?.message || "Get Monthly Wise Revenue Data Failed",
                error : error?.response?.status
            });
        }
    }
);


const dashboardSlice = createSlice({
    name: "dashboard",
    initialState : {
        totalBooks : null,
        totalSales : null,
        totalQtySold : null,
        monthlySales : [],
    },
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(getTotalBooks.fulfilled,(state, action)=>{
            state.totalBooks = action.payload
        });

        builder.addCase(getTotalSales.fulfilled,(state, action)=>{
            state.totalSales = action.payload
        });

        builder.addCase(getTotalQuantitySold.fulfilled,(state, action)=>{
            state.totalQtySold = action.payload
        });

        builder.addCase(getMonthlyWiseRevenue.fulfilled,(state, action)=>{
            state.monthlySales = action.payload
        });
    }
});
 

export default dashboardSlice.reducer;
