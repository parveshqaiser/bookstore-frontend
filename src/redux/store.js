
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/userSlice.js";
import bookSlice from "../redux/bookSlice.js";
import orderSlice from "../redux/orderSlice.js";

let reduxStore = configureStore({
    reducer : {
        user : userSlice,
        book : bookSlice,
        order : orderSlice
    }
});

export default reduxStore;