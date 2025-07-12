
import { configureStore , combineReducers} from "@reduxjs/toolkit";
import {persistStore,persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

import userSlice from "../redux/userSlice.js";
import bookSlice from "../redux/bookSlice.js";
import orderSlice from "../redux/orderSlice.js";
import cartSlice from "../redux/cartSlice.js";
import dashboardSlice from "../redux/dashboardSlice.js";
import adminSlice from "../redux/adminSlice.js";
import userProfileSlice from "../redux/userProfileSlice.js";

let rootReducer = combineReducers({
    user : userSlice,
    book : bookSlice,
    order : orderSlice,
    cart : cartSlice,
    dashboard : dashboardSlice,
    admin : adminSlice,
    userProfile : userProfileSlice
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'cart', "book","dashboard","admin"], // only these slices will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const reduxStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    });
  
export const myPersist = persistStore(reduxStore);
