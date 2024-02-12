
import {apiService} from "../instance/axiosBaseQuery";

export const chatService = apiService
    .injectEndpoints({
        overrideExisting: true,
        endpoints: (build) => ({

            friends: build.query({
                query: (id) => ({ method: 'GET', url: `user/friend${id}` }),
            }),

        })})

export const {
    useFriendsQuery,
} = chatService;
