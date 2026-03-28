/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: "/admin/dashboard-stats",
        method: "GET",
      }),
      providesTags: ["AdminStats"],
    }),

    getAllUsers: builder.query({
      query: (params: any) => ({
        url: "/admin/users",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
    }),

    getSubscriptionAnalytics: builder.query({
      query: (params: any) => ({
        url: "/admin/subscriptions",
        method: "GET",
        params,
      }),
      providesTags: ["Subscriptions"],
    }),

    getAllPaidTransactions: builder.query({
      query: (params: any) => ({
        url: "/admin/paid-transactions",
        method: "GET",
        params,
      }),
      providesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetAllUsersQuery,
  useGetSubscriptionAnalyticsQuery,
  useGetAllPaidTransactionsQuery,
} = adminApi;
