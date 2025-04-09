
import { configureStore , combineReducers} from "@reduxjs/toolkit";
import {persistStore,persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

import userSlice from "../redux/userSlice.js";
import bookSlice from "../redux/bookSlice.js";
import orderSlice from "../redux/orderSlice.js";
import cartSlice from "../redux/cartSlice.js";

let rootReducer = combineReducers({
    user : userSlice,
    book : bookSlice,
    order : orderSlice,
    cart : cartSlice,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'cart', "book", "order"], // only these slices will be persisted
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
