

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/api";

export const getAllPendingOrders = createAsyncThunk(
    "allPendingOrders/get",
    async (_, { rejectWithValue }) => {
        try {
            let res = await axios.get(BASE_URL + "/received/orders/user",{withCredentials: true});
            return res?.data?.data;
        } catch (error) {
            console.log("err ", error);
            return rejectWithValue({
                message : error.response?.data?.message || "Get All Pending Orders failed",
                error : error?.response?.status
            });
        }
    }
);

export const getAllDeliveredOrders = createAsyncThunk(
    "allDeliveredOrders/get",
    async(_, {rejectWithValue})=>{
        try {
            let res = await axios.get(BASE_URL + "/received/orders/delivered",{withCredentials: true});
            return res?.data?.data;
        } catch (error) {
            console.log("err ", error);
            return rejectWithValue({
                message : error.response?.data?.message || "Get All Pending Orders failed",
                error : error?.response?.status
            });
        }
    }
)

let orderSlice = createSlice({
    name : "orders",
    initialState : {
        isLoading : false,
        allPendingOrders : [],
        error : null,
        allDeliveredOrders : [],
        isLoadingDelivered : false,
        deliveredError : null
    },
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(getAllPendingOrders.pending, (state, action)=>{
            state.isLoading = true;
            state.error = null;
        });

        builder.addCase(getAllPendingOrders.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.allPendingOrders = action.payload;
            state.error = null;
        });

        builder.addCase(getAllPendingOrders.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload; // return an object {error : 401, message : "Unauthorized user"}
        });

        // ---------------- below are delivered apis
        builder.addCase(getAllDeliveredOrders.pending, (state, action)=>{
            state.isLoadingDelivered = true;
            state.deliveredError = null;
        });

        builder.addCase(getAllDeliveredOrders.fulfilled, (state, action)=>{
            state.isLoadingDelivered = false;
            state.allDeliveredOrders = action.payload;
            state.deliveredError = null;
        });

        builder.addCase(getAllDeliveredOrders.rejected, (state, action)=>{
            state.isLoadingDelivered = false;
            state.deliveredError = action.payload;
        });
    }
});

export default orderSlice.reducer;