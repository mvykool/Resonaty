/* eslint-disable indent */
/* eslint-disable eol-last */
import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazamCoreApi } from './services/shazamCore';

export const store = configureStore({
    reducer: {
        [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
        player: playerReducer,
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(shazamCoreApi.middleware),
});