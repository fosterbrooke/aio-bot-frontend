
import {apiService} from "../instance/axiosBaseQuery";

export const chatService = apiService
    .injectEndpoints({
        overrideExisting: true,
        endpoints: (build) => ({

            friends: build.query({
                query: (id) => ({ method: 'GET', url: `user/friend/${id}` }),
            }),
            sendInvitation: build.mutation({
                query: (data) => ({
                    method: 'POST',
                    url:  `user/friend/${id}`,
                    data: data,
                })}),

        })})

export const {
    useFriendsQuery,
    useSendInvitationMutation
} = chatService;
