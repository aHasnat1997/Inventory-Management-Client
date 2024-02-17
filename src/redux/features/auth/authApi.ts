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
    logout: builder.mutation({
      query: (value) => ({
        url: '/user/logout',
        method: 'POST',
        body: value
      }),
      invalidatesTags: ['sales']
    }),
  })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;