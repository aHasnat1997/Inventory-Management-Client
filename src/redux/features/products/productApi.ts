import { baseApi } from "@/redux/api";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (filterData) => ({
        url: `/product/all?${filterData}`,
        method: 'GET'
      }),
      providesTags: ['products']
    }),
    getSingleProducts: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: 'GET'
      }),
      providesTags: ['products']
    }),
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: '/product/create',
        method: 'POST',
        body: productInfo
      }),
      invalidatesTags: ['products', 'categories']
    }),
    updateProduct: builder.mutation({
      query: ({ id, productInfo }) => ({
        url: `/product/${id}`,
        method: 'PATCH',
        body: productInfo
      }),
      invalidatesTags: ['products']
    }),
    deleteProduct: builder.mutation({
      query: (ids) => ({
        url: '/product/delete',
        method: 'PUT',
        body: { ids }
      }),
      invalidatesTags: ['products']
    }),
  })
})

export const {
  useGetAllProductsQuery,
  useGetSingleProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productApi;
