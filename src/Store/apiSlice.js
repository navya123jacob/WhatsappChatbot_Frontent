import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
let url=process.env.REACT_APP_API_URL
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}/api`,
        credentials: 'include', 
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
        
        verifyOtp: builder.mutation({
            query: ({ email, otp }) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: { email, otp },
            }),
        }),
        resendOtp: builder.mutation({
            query: ({ email }) => ({
                url: '/auth/resend-otp',
                method: 'POST',
                body: { email },
            }),
        }),
        generateQRCode: builder.query({
            query: () => ({
                url: '/chatbot/generate-qr',
                method: 'GET',
            }),
        }),
        sendMessage: builder.mutation({
            query: (messageData) => ({
                url: '/chatbot/message',
                method: 'POST',
                body: messageData,
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useFetchDashboardQuery,
    useVerifyOtpMutation,
    useResendOtpMutation,
    useGenerateQRCodeQuery,
    useSendMessageMutation,
} = authApi;
