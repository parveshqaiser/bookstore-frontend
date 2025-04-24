

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/api";

export const getAllPendingOrders = createAsyncThunk(
    "allPendingOrders/get",
    async (_, { rejectWithValue }) => {
        try {
            let res = await axios.get(BASE_URL + "/admin/orders/pending",{withCredentials: true});
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
            let res = await axios.get(BASE_URL + "/admin/orders/delivered",{withCredentials: true});
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

export const getAllUserPendingOrders = createAsyncThunk(
    "allUserPendingOrders/get", async(_,{rejectWithValue})=>{
        try {
            let res = await axios.get(BASE_URL + "/user/orders/pending",{withCredentials: true});
            return res?.data?.data;
        } catch (error) {
            return rejectWithValue({
                message : error.response?.data?.message || "Get All User Pending Orders failed",
                error : error?.response?.status
            });
        }
    }
);

export const getAllUserDeliveredOrders = createAsyncThunk(
    "allUserDeliveredOrders/get", async(_,{rejectWithValue})=>{
        try {
            let res = await axios.get(BASE_URL + "/user/orders/delivered",{withCredentials: true});
            // console.log(res.data.data, "******************** slice");
            return res?.data?.data;
        } catch (error) {
            return rejectWithValue({
                message : error.response?.data?.message || "Get All User Delivered Orders failed",
                error : error?.response?.status
            });
        }
    }
);

let orderSlice = createSlice({
    name : "order",
    initialState : {
        // for admin
        isLoading : false, 
        allPendingOrders : [],
        error : null,

        allDeliveredOrders : [],
        isLoadingDelivered : false,
        deliveredError : null,

        storeOrderDetails : null, // for user as soon as he place order
        // for users
        isUserPendingOrderLoading : false,
        userPendingOrder :[],
        pendingOrderError : null,

        isUserDeliveredOrderLoading : false,
        userDeliveredOrder :[],
        deliveredOrderError : null,
    },
    reducers : {
        addOrderDetails : (state, action)=>{
            state.storeOrderDetails = action.payload;
        },
        removeOrderDetails : (state)=>{
            state.storeOrderDetails = null;
        }
    },
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

        // for user pending orders
        builder.addCase(getAllUserPendingOrders.pending, (state, action)=>{
            state.isUserPendingOrderLoading = true;
            state.pendingOrderError = null;
        });

        builder.addCase(getAllUserPendingOrders.fulfilled, (state, action)=>{
            state.isUserPendingOrderLoading = false;
            state.userPendingOrder = action.payload;
            state.pendingOrderError = null;
        });

        builder.addCase(getAllUserPendingOrders.rejected, (state, action)=>{
            state.isUserPendingOrderLoading = false;
            state.pendingOrderError = action.payload;
        });

        // for user delivered orders
        builder.addCase(getAllUserDeliveredOrders.pending, (state, action)=>{
            state.isUserDeliveredOrderLoading = true;
            state.deliveredOrderError = null;
        });

        builder.addCase(getAllUserDeliveredOrders.fulfilled, (state, action)=>{
            state.isUserDeliveredOrderLoading = false;
            // console.log("************* ", action.payload);
            state.userDeliveredOrder = action.payload;
            state.deliveredOrderError = null;
        });

        builder.addCase(getAllUserDeliveredOrders.rejected, (state, action)=>{
            state.isUserDeliveredOrderLoading = false;
            state.deliveredOrderError = action.payload;
        });
    }
});

export default orderSlice.reducer;

export const {addOrderDetails, removeOrderDetails} = orderSlice.actions;