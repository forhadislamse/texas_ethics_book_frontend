import { baseApi } from "./baseApi";

export const guideApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllChapters: builder.query({
            query: () => ({
                url: "/guide/chapters",
                method: "GET",
            }),
            providesTags: ["Chapters"],
        }),
        getChapterById: builder.query({
            query: (id: string) => ({
                url: `/guide/chapters/${id}`,
                method: "GET",
            }),
            providesTags: ["Chapter"],
        }),
        getSectionById: builder.query({
            query: (id: string) => ({
                url: `/guide/sections/${id}`,
                method: "GET",
            }),
            providesTags: ["Section"],
        }),
        searchGuide: builder.query({
            query: (params: { q: string; page?: number; limit?: number }) => ({
                url: "/guide/search",
                method: "GET",
                params,
            }),
        }),
    }),
});

export const {
    useGetAllChaptersQuery,
    useGetChapterByIdQuery,
    useGetSectionByIdQuery,
    useSearchGuideQuery,
} = guideApi;
