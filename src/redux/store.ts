import { configureStore } from "@reduxjs/toolkit";
import { spotifyApi } from "./slices/apiSlice";
export const store = configureStore({
    reducer: {
        [spotifyApi.reducerPath]: spotifyApi.reducer
    },
    middleware: (getDefaultMiddleWare) => 
        getDefaultMiddleWare().concat(spotifyApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;