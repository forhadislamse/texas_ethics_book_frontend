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

        // Admin Only Content Management
        createChapter: builder.mutation({
            query: (data) => ({
                url: "/guide/chapters",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Chapters"],
        }),
        updateChapter: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/guide/chapters/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Chapters", "Chapter"],
        }),
        deleteChapter: builder.mutation({
            query: (id) => ({
                url: `/guide/chapters/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Chapters"],
        }),

        createSection: builder.mutation({
            query: (data) => ({
                url: "/guide/sections",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Chapters", "Section"],
        }),
        updateSection: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/guide/sections/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Chapters", "Chapter", "Section"],
        }),
        deleteSection: builder.mutation({
            query: (id) => ({
                url: `/guide/sections/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Chapters", "Chapter", "Section"],
        }),

        createInternalRef: builder.mutation({
            query: (data) => ({
                url: "/guide/internal-refs",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Section", "Chapter"],
        }),
        updateInternalRef: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/guide/internal-refs/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Section", "Chapter"],
        }),
        deleteInternalRef: builder.mutation({
            query: (id) => ({
                url: `/guide/internal-refs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Section", "Chapter"],
        }),

        createExternalRef: builder.mutation({
            query: (data) => ({
                url: "/guide/external-refs",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Section", "Chapter"],
        }),
        updateExternalRef: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/guide/external-refs/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Section", "Chapter"],
        }),
        deleteExternalRef: builder.mutation({
            query: (id) => ({
                url: `/guide/external-refs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Section", "Chapter"],
        }),
    }),
});

export const {
    useGetAllChaptersQuery,
    useGetChapterByIdQuery,
    useGetSectionByIdQuery,
    useSearchGuideQuery,
    useCreateChapterMutation,
    useUpdateChapterMutation,
    useDeleteChapterMutation,
    useCreateSectionMutation,
    useUpdateSectionMutation,
    useDeleteSectionMutation,
    useCreateInternalRefMutation,
    useUpdateInternalRefMutation,
    useDeleteInternalRefMutation,
    useCreateExternalRefMutation,
    useUpdateExternalRefMutation,
    useDeleteExternalRefMutation,
} = guideApi;
