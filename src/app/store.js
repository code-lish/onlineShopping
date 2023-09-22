import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../../src/features/api/apiSlice";
import testSlice from "../features/testSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    test: testSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
