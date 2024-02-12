
import axios from 'axios';
import {getLocalStorage, setLocalStorage} from "../common/helpers/localStorage";
import {BASE_URL} from "./instance";
import jwt_decode from 'jwt-decode';

export const getAccessToken = async () => {
    const accessToken = getLocalStorage('access-token');
    return accessToken

    try {
        // if (!accessToken || isTokenExpired(accessToken)) {
        //     const res = await axios.post(
        //         BASE_URL+ 'auth/refresh-token',
        //         {},
        //         { withCredentials: true },
        //     );
        //
        //     const { accessToken } = res.data;
        //
        //     setLocalStorage('access-token', accessToken);
        //
        //     return accessToken;
        // }
        //
        // return accessToken;
    } catch (e) {
        return null;
    }
};

export const isTokenExpired = (token) => {
    // if (!token) {
    //     return true;
    // }
    //
    // const userTokenDecoded = jwt_decode(token);
    //
    // const tokenExpired = dayjs.unix(userTokenDecoded.exp).diff(dayjs()) < 60 * 1000;

   // return tokenExpired;
};
