import { baseApi } from "@/redux/api";

const servicingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServicing: builder.query({
      query: (filterData) => ({
        url: `/servicing/all?${filterData}`,
        method: 'GET'
      }),
      providesTags: ['servicing']
    }),
    getMyServicing: builder.query({
      query: (filterData) => ({
        url: `/servicing/my-servicing?${filterData}`,
        method: 'GET'
      }),
      providesTags: ['servicing']
    }),
    addServicing: builder.mutation({
      query: (servicingData) => ({
        url: '/servicing/create',
        method: 'POST',
        body: servicingData
      }),
      invalidatesTags: ['servicing']
    })
  })
})

export const { useGetAllServicingQuery, useGetMyServicingQuery, useAddServicingMutation } = servicingApi;