import { baseApi } from "@/redux/api";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSales: builder.query({
      query: (filterData) => ({
        url: `/sale/all?${filterData}`,
        method: 'GET'
      }),
      providesTags: ['sales']
    }),
    addSale: builder.mutation({
      query: (saleData) => ({
        url: '/sale/create',
        method: 'POST',
        body: saleData
      }),
      invalidatesTags: ['sales']
    })
  })
})

export const { useGetAllSalesQuery, useAddSaleMutation } = salesApi;