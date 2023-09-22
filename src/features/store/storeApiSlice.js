import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const productAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = productAdapter.getInitialState();

export const productApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedProducts = responseData.map((product) => {
          // container.id = container._id;
          return product;
        });

        return productAdapter.setAll(initialState, loadedProducts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Product", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Product", id })),
          ];
        } else return [{ type: "Product", id: "LIST" }];
      },
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result, error, arg) => [
        { type: "Product", id: result?.slug },
      ],
    }),
    // changeContainerStatus: builder.mutation({
    //   query: (payload) => {
    //     return {
    //       url: `/containers/${payload.id}/change-status`,
    //       method: "PUT",
    //       body: payload.status,
    //     };
    //   },
    //   invalidatesTags: (result, error, arg) => [
    //     { type: "Container", id: result?.slug },
    //   ],
    // }),
    // exitContainer: builder.mutation({
    //   query: (payload) => {
    //     return {
    //       url: `/containers/${payload.id}/exit`,
    //       method: "PUT",
    //       body: payload.exit,
    //     };
    //   },
    //   invalidatesTags: (result, error, arg) => [
    //     { type: "Container", id: result?.slug },
    //   ],
    // }),

    // updateContainer: builder.mutation({
    //   query: (payload) => {
    //     return {
    //       url: `/containers/${payload.id}`,
    //       method: "PUT",
    //       body: payload.data,
    //     };
    //   },
    //   invalidatesTags: (result, error, arg) => [
    //     { type: "Container", id: result?.slug },
    //   ],
    // }),
    // updateLocalBlog: builder.mutation({
    //   query: ({ id, ...blog }) => ({
    //     url: `/admin/blog/${id}/update-local`,
    //     method: "PUT",
    //     body: {
    //       ...blog,
    //     },
    //   }),
    //   invalidatesTags: (result, error, arg) => [{ type: "Blog", id: arg.id }],
    // }),
    // deleteBlog: builder.mutation({
    //   query: (id) => ({
    //     url: `/admin/blog/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: (result, error, arg) => [{ type: "Blog", id: arg.id }],
    // }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  // useGetSingleContainerQuery,
  // useAddContainerMutation,
  // useChangeContainerStatusMutation,
  // useExitContainerMutation,
  // useUpdateContainerMutation,
  // useUpdateLocalBlogMutation,
  // useDeleteBlogMutation,
} = productApiSlice;

// returns the query result object
export const selectProductResult =
  productApiSlice.endpoints.getProducts.select();

// creates memoized selector
const selectProductsData = createSelector(
  selectProductResult,
  (productsResult) => productsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
  // Pass in a selector that returns the notes slice of state
} = productAdapter.getSelectors(
  (state) => selectProductsData(state) ?? initialState
);
