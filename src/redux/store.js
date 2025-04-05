
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/userSlice.js";
import bookSlice from "../redux/bookSlice.js";
import orderSlice from "../redux/orderSlice.js";
import cartSlice from "../redux/cartSlice.js";

let reduxStore = configureStore({
    reducer : {
        user : userSlice,
        book : bookSlice,
        order : orderSlice,
        cart : cartSlice,
    }
});

export default reduxStore;