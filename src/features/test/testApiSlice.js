import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const testAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = testAdapter.getInitialState();

export const testApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTestPosts: builder.query({
      query: () => ({
        url: "/posts",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedPosts = responseData.map((post) => {
          // container.id = container._id;
          return post;
        });
        return testAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Post", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Post", id })),
          ];
        } else return [{ type: "Post", id: "LIST" }];
      },
    }),
    // addContainer: builder.mutation({
    //   query: (payload) => ({
    //     url: "/containers",
    //     method: "POST",
    //     body: payload,
    //   }),
    //   invalidatesTags: [{ type: "Container", id: "LIST" }],
    // }),
    // getSingleContainer: builder.query({
    //   query: (id) => ({
    //     url: `/containers/${id}`,
    //     validateStatus: (response, result) => {
    //       return response.status === 200 && !result.isError;
    //     },
    //   }),
    //   providesTags: (result, error, arg) => [
    //     { type: "Container", id: result?.slug },
    //   ],
    // }),
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
  useGetTestPostsQuery,
  // useGetSingleContainerQuery,
  // useAddContainerMutation,
  // useChangeContainerStatusMutation,
  // useExitContainerMutation,
  // useUpdateContainerMutation,
  // useUpdateLocalBlogMutation,
  // useDeleteBlogMutation,
} = testApiSlice;

// returns the query result object
export const selectTestResult = testApiSlice.endpoints.getTestPosts.select();

// creates memoized selector
const selectPostsData = createSelector(
  selectTestResult,
  (postsResult) => postsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the notes slice of state
} = testAdapter.getSelectors((state) => selectPostsData(state) ?? initialState);
