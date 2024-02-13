import { baseApi } from "@/redux/api";

const saleApiWithTag = baseApi.enhanceEndpoints({
  addTagTypes: ['sale']
})

const salesApi = saleApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getAllSales: builder.query({
      query: (filterData) => ({
        url: `/sale/all?${filterData}`,
        method: 'GET'
      }),
      providesTags: ['sale']
    }),
    addSale: builder.mutation({
      query: (saleData) => ({
        url: '/sale/create',
        method: 'POST',
        body: saleData
      }),
      invalidatesTags: ['sale']
    })
  })
})

export const { useGetAllSalesQuery, useAddSaleMutation } = salesApi;