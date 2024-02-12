
import {createApi } from '@reduxjs/toolkit/query/react';
import { instance } from './instance';


const axiosBaseQuery = async ({ url, method, data, params }) => {
    try {
        console.log(url,method,data,params)
        const result = await instance({
            url,
            method,
            data,
            params,
        });

        return { data: result.data };
    } catch (axiosError) {
        const error = axiosError
        console.log(error)
        console.log('error')

        return {
            error: {

                message: error.response?.data.message,

            },
        };
    }
};

export const apiService = createApi({
    baseQuery: axiosBaseQuery,
    endpoints: () => ({}),
});
