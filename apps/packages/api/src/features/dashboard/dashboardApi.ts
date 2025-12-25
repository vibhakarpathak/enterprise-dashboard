import { baseApi } from "../../core/baseApi";
import type { RevenueWidget } from "./dashboard.types";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRevenueWidget: builder.query<RevenueWidget, void>({
      query: () => "/dashboard/revenue",
      providesTags: ["Widget"],
    }),
  }),
});

export const { useGetRevenueWidgetQuery } = dashboardApi;
