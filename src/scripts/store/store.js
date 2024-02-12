import { configureStore } from '@reduxjs/toolkit';
import appReducers from "./slices/app/app-slices";
import {apiService} from "../instance/axiosBaseQuery";


const store = configureStore({
    reducer: {
        app: appReducers,
        [apiService.reducerPath]: apiService.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
});

export default store;
