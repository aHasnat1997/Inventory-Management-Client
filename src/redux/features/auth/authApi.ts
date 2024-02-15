import { baseApi } from "@/redux/api";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/user/login',
        method: 'POST',
        body: userInfo
      })
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: '/user/register',
        method: 'POST',
        body: userInfo
      })
    }),
    logout: builder.query({
      query: () => ({
        url: '/user/logout',
        method: 'GET'
      })
    }),
  })
});

export const { useLoginMutation, useRegisterMutation, useLogoutQuery } = authApi;