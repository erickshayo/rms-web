import { apiSlice } from "./app/apiSlice";
import authReducer from "./features/authSlice";
import { authRegReducer } from "./features/authSlice";
import { configureStore } from "@reduxjs/toolkit";



export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        regAuth:authRegReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})