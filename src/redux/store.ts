import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from '../redux/slices/userInfoSlice';
import { spotifyApi } from "./slices/apiSlice";
export const store = configureStore({
    reducer: {
        userData: userInfoReducer,
        [spotifyApi.reducerPath]: spotifyApi.reducer
    },
    middleware: (getDefaultMiddleWare) => 
        getDefaultMiddleWare().concat(spotifyApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;