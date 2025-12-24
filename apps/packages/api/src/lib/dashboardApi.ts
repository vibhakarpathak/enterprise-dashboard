import { baseApi } from "./baseApi";

export interface RevenueWidget {
  id: string;
  value: number;
  trend: "up" | "down";
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRevenueWidget: builder.query<RevenueWidget, void>({
      query: () => ({
        url: "/dashboard/revenue",
        method: "GET"
      }),
      providesTags: ["Widget"]
    })
  })
});

export const {
  useGetRevenueWidgetQuery
} = dashboardApi;
