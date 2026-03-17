import { baseApi } from "./baseApi";

export const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlans: builder.query({
      query: () => ({
        url: "/plan",
        method: "GET",
      }),
      providesTags: ["Plans"],
    }),
    getPlanById: builder.query({
      query: (id: string) => ({
        url: `/plan/${id}`,
        method: "GET",
      }),
      providesTags: ["Plan"],
    }),
  }),
});

export const { useGetAllPlansQuery, useGetPlanByIdQuery } = planApi;
