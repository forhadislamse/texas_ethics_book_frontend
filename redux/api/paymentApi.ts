import { baseApi } from "./baseApi";

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSubscriptionIntent: builder.mutation({
            query: (data: { planId: string }) => ({
                url: "/payment/create-subscription-intent",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        confirmPayment: builder.mutation({
            query: ({ id, paymentIntentId }: { id: string; paymentIntentId: string }) => ({
                url: `/payment/confirm-payment/${id}`,
                method: "POST",
                body: { paymentIntentId },
            }),
            invalidatesTags: ["User", "Chapters", "Chapter", "Section"],
        }),
        getMyPaymentHistory: builder.query({
            query: () => ({
                url: "/payment/my-payment-history",
                method: "GET",
            }),
            providesTags: ["Transactions"],
        }),
    }),
});

export const {
    useCreateSubscriptionIntentMutation,
    useConfirmPaymentMutation,
    useGetMyPaymentHistoryQuery,
} = paymentApi;
