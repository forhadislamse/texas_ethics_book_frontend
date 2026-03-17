import { baseApi } from "./baseApi";

export const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlans: builder.query({
      query: () => ({
        url: "/plans",
        method: "GET",
      }),
      providesTags: ["Plans"],
    }),
    getPlanById: builder.query({
      query: (id: string) => ({
        url: `/plans/${id}`,
        method: "GET",
      }),
      providesTags: ["Plan"],
    }),
  }),
});

export const { useGetAllPlansQuery, useGetPlanByIdQuery } = planApi;
