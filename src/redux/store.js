
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/userSlice.js";
import bookSlice from "../redux/bookSlice.js";

let reduxStore = configureStore({
    reducer : {
        user : userSlice,
        book : bookSlice
    }
});

export default reduxStore;