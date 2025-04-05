
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/api";

export const getUserDetails = createAsyncThunk(
    "user/get",
    async(_,{rejectWithValue})=>{
        try {
            let res = await axios.get(BASE_URL + "/user/details",{withCredentials: true});
            return res?.data?.data;
        } catch (error) {
            return rejectWithValue({
                message : error.response?.data?.message || "Get User Data Failed",
                error : error?.response?.status
            });
        }
    }
)

const userSlice = createSlice({
    name : "user",
    initialState : {
        user : null,
        isLoading : false,
        userTemporaryData : null,
        error : null,
    },
    reducers : {
        addTempUserData : (state, action)=>{
            state.userTemporaryData = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
            state.userTemporaryData = null;
            state.isLoading = false;
            state.error = null;
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(getUserDetails.pending, (state, action)=>{
            state.isLoading = true;
            state.error = null;
        });

        builder.addCase(getUserDetails.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
        });

        builder.addCase(getUserDetails.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload; // return an object {error : 401, message : "Unauthorized user"}
        });
    }
});

export default userSlice.reducer;
export const { logoutUser, addTempUserData} = userSlice.actions;




