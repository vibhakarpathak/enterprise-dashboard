import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import { baseApi } from "@enterprise/api";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefault) =>
    getDefault().concat(baseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
