import { createSlice } from "@reduxjs/toolkit";


const adminSLice = createSlice({
    name : "admin",
    initialState : {
        adminData : null
    },
    reducers : {
        addAdminData : (state,action)=>{
            state.adminData = action.payload;
        },
        removeAdminData  :(state,action)=>{
            state.adminData = null;
        },
    }
});

export const {addAdminData, removeAdminData} = adminSLice.actions;
export default adminSLice.reducer;