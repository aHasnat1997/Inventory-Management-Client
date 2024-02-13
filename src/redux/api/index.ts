import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: import.meta.env.VITE_BASE_API_URL,
    baseUrl: 'https://store-management-server-kohl.vercel.app/api/v1',
    credentials: 'include',
  }),
  endpoints: () => ({})
});