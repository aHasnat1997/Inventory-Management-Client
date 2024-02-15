import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).userInfo.token?.access
    if (token) {
      headers.set('authorization', token)
    }
    return headers;
  }
})

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  tagTypes: ['categories', 'products', 'sales'],
  endpoints: () => ({})
});