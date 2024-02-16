
import {apiService} from "../instance/axiosBaseQuery";

export const chatService = apiService
    .injectEndpoints({
        overrideExisting: true,
        endpoints: (build) => ({

            friends: build.query({
                query: (id) => ({ method: 'GET', url: `user/friend/${id}` }),
            }),
            getUser: build.query({
                query: (id) => ({ method: 'GET', url: `user/${id}` }),
            }),
            sendInvitation: build.mutation({
                query: (data) => ({
                    method: 'POST',
                    url:  `chat/invite`,
                    data: data,
                })}),

        })})

export const {
    useFriendsQuery,
    useGetUserQuery,
    useSendInvitationMutation
} = chatService;
