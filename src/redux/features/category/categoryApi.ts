import { baseApi } from "@/redux/api";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: '/categories',
        method: 'GET'
      }),
      providesTags: ['categories']
    })
  })
})

export const { useGetAllCategoriesQuery } = categoryApi;