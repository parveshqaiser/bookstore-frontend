

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/api';
import axios from 'axios';

export const getTotalOrders = createAsyncThunk(
    "totalOrders/get",
    async (_, { rejectWithValue }) => {
        try {
            let res = await axios.get(BASE_URL + "/get/totaluser/orders",{withCredentials:true});
            return res?.data?.data;
        } catch (error) {
            return rejectWithValue({
                message : error.response?.data?.message || "Get All User order failed",
                error : error?.response?.status
            });
        }
    }
);

export const getTotalAddress = createAsyncThunk(
    "totalAddress/get",
    async (_, { rejectWithValue }) => {
        try {
            let res = await axios.get(BASE_URL + "/get/total/address",{withCredentials:true});
            return res?.data?.data;
        } catch (error) {
            return rejectWithValue({
                message : error.response?.data?.message || "Get total address failed",
                error : error?.response?.status
            });
        }
    }
);

export const getTotalAmountSpent = createAsyncThunk(
    "totalAmount/get",
    async (_, { rejectWithValue }) => {
        try {
            let res = await axios.get(BASE_URL + "/get/total/amountspent",{withCredentials:true});
            return res?.data?.data;
        } catch (error) {
            return rejectWithValue({
                message : error.response?.data?.message || "Get total amount spent failed",
                error : error?.response?.status
            });
        }
    }
);

export const getLastOrderDate = createAsyncThunk(
    "lastOrder/get",
    async (_, { rejectWithValue }) => {
        try {
            let res = await axios.get(BASE_URL + "/get/lastorder/date",{withCredentials:true});
            return res?.data?.data;
        } catch (error) {
            return rejectWithValue({
                message : error.response?.data?.message || "Get last order date failed",
                error : error?.response?.status
            });
        }
    }
);


const userProfileSlice = createSlice({
    name :"userProfile",
    initialState : {
        totalOrders : null,
        totalAddress : null,
        totalAmountSpent : null,
        lastOrderDate : null,
    },
    extraReducers: (builder)=>{
        builder.addCase(getTotalOrders.fulfilled, (state, action)=>{
            state.totalOrders = action.payload;
        });

        builder.addCase(getTotalAddress.fulfilled, (state, action)=>{
            state.totalAddress = action.payload;
        });

        builder.addCase(getTotalAmountSpent.fulfilled, (state, action)=>{
            state.totalAmountSpent = action.payload;
        });

        builder.addCase(getLastOrderDate.fulfilled, (state, action)=>{
            state.lastOrderDate = action.payload;
        });
    }
})

export default userProfileSlice.reducer;
