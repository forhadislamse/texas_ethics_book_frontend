"use client";

import { useGetMeQuery } from "@/redux/api/authApi";
import { useGetMyPaymentHistoryQuery } from "@/redux/api/paymentApi";
import { useAppSelector } from "@/redux/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, BookOpen, CreditCard, CalendarDays, ShieldCheck, BadgeCheck, ChevronRight, Clock, User, PieChart } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { useMemo, useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPaid = (p: any) => p.status === "PAID";

export default function UserDashboardPage() {
    const token = useAppSelector((state) => state.auth.token);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: userData, isLoading: userLoading } = useGetMeQuery(undefined, { skip: !token }) as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: paymentHistoryData, isLoading: paymentsLoading } = useGetMyPaymentHistoryQuery(undefined, { skip: !token }) as any;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = userData?.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payments: any[] = paymentHistoryData?.data || [];

    // Subscription status
    const isSubscribed = user?.isSubscribed;
    const subscriptionExpiresAt = user?.subscriptionExpiresAt ? new Date(user.subscriptionExpiresAt) : null;
    const plan = user?.plan;

    // Track current date for expiry calculations
    const [currentDate, setCurrentDate] = useState(() => new Date());
    useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);
    const isExpired = subscriptionExpiresAt && subscriptionExpiresAt < currentDate;
    const activeSubscription = isSubscribed && !isExpired;
    const daysRemaining = useMemo(() => {
        if (!subscriptionExpiresAt) return 0;
        return Math.max(0, Math.ceil((subscriptionExpiresAt.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));
    }, [subscriptionExpiresAt, currentDate]);

    // Get total spent
    const totalSpent = useMemo(() => {
        return payments.filter(isPaid).reduce((sum: number, p: { amount: number }) => sum + p.amount, 0);
    }, [payments]);

    // Subscription status badge
    const getSubscriptionBadge = () => {
        if (plan?.price === 0 || (!plan && !isSubscribed)) {
            return <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 font-medium text-[10px] uppercase tracking-wider">Free Plan</Badge>;
        }
        if (activeSubscription) {
            return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium text-[10px] uppercase tracking-wider">Active</Badge>;
        }
        if (isExpired) {
            return <Badge variant="destructive" className="bg-red-50 text-red-600 border-red-200 font-medium text-[10px] uppercase tracking-wider">Expired</Badge>;
        }
        return <Badge variant="secondary" className="font-medium text-[10px] uppercase tracking-wider">Inactive</Badge>;
    };

    // Progress bar % - use useMemo
    const progressPercent = useMemo(() => {
        if (!activeSubscription || daysRemaining <= 0) return 0;
        return Math.min(100, (daysRemaining / 365) * 100);
    }, [activeSubscription, daysRemaining]);

    if (userLoading || paymentsLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-[#0D7C84]" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-8 text-center text-red-500">
                Error loading user data. Please try again.
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <User className="h-6 w-6 text-[#0D7C84]" />
                        My Dashboard
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your subscription and account</p>
                </div>
                <Link href="/user/dashboard/profile">
                    <Button variant="outline" className="gap-2 border-gray-200">
                        <User className="h-4 w-4" />
                        Edit Profile
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>

            {/* Subscription Overview Card */}
            <Card className="border border-gray-100 shadow-sm overflow-hidden">
                <div className={`h-2 ${activeSubscription ? 'bg-emerald-500' : plan?.price === 0 || (!plan && !isSubscribed) ? 'bg-gray-300' : 'bg-red-400'}`} />
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-[#0D7C84]" />
                            Subscription Overview
                        </CardTitle>
                        {getSubscriptionBadge()}
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Current Plan Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Current Plan</div>
                            <div className="text-xl font-bold text-gray-900">
                                {plan?.name || "Free Plan"}
                            </div>
                            {plan && (
                                <div className="text-sm text-gray-500 mt-1">
                                    ${plan.price}{plan.duration === 'unlimited' ? '' : `/${plan.duration === 'yearly' ? 'yr' : 'mo'}`}
                                </div>
                            )}
                        </div>

                        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Status</div>
                            <div className="flex items-center gap-2">
                                {activeSubscription ? (
                                    <>
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-lg font-bold text-emerald-600">Active</span>
                                    </>
                                ) : isExpired ? (
                                    <>
                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                        <span className="text-lg font-bold text-red-600">Expired</span>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                                        <span className="text-lg font-bold text-gray-600">Free / Inactive</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Total Spent</div>
                            <div className="text-xl font-bold text-gray-900">
                                ${totalSpent.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                                {payments.filter(isPaid).length} payment(s)
                            </div>
                        </div>
                    </div>

                    {/* Subscription Expiry with Donut Chart */}
                    {subscriptionExpiresAt && (
                        <div className="p-4 border border-gray-100 rounded-xl">
                            <div className="flex items-center gap-6">
                                {/* Donut Chart */}
                                {activeSubscription && daysRemaining > 0 && (
                                    <div className="relative w-20 h-20 flex-shrink-0">
                                        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                                            <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                                            <circle
                                                cx="18" cy="18" r="15.5"
                                                fill="none"
                                                stroke="#10b981"
                                                strokeWidth="3"
                                                strokeDasharray={`${progressPercent} ${100 - progressPercent}`}
                                                strokeLinecap="round"
                                                className="transition-all duration-700 ease-out"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-sm font-bold text-gray-900">{daysRemaining}</span>
                                        </div>
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <CalendarDays className="h-4 w-4 text-gray-400" />
                                            {activeSubscription ? "Renews on:" : "Expired on:"}
                                            <span className="font-bold text-gray-900">{format(subscriptionExpiresAt, "MMMM dd, yyyy")}</span>
                                        </div>
                                        {activeSubscription && (
                                            <span className="text-sm font-bold text-emerald-600">{daysRemaining} days remaining</span>
                                        )}
                                    </div>
                                    {activeSubscription && daysRemaining > 0 && (
                                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                                style={{ width: `${progressPercent}%` }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Plan Features */}
                    {plan?.features && plan.features.length > 0 && (
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Plan Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {plan.features.map((feature: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                        <BadgeCheck className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Upgrade / Manage Button */}
                    <div className="flex gap-3 pt-2">
                        {!activeSubscription || plan?.price === 0 ? (
                            <Link href="/#pricing">
                                <Button className="bg-[#0D7C84] hover:bg-[#0B656B] text-white gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    Upgrade Subscription
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/#pricing">
                                <Button variant="outline" className="border-gray-200 gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    Change Plan
                                </Button>
                            </Link>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/user/reader">
                    <Card className="border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0D7C84]/30 transition-all cursor-pointer group">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Read the Guide</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Access full content</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-300 ml-auto group-hover:text-gray-500 transition-colors" />
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/user/dashboard/profile">
                    <Card className="border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0D7C84]/30 transition-all cursor-pointer group">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                                <User className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">My Profile</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Manage account details</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-300 ml-auto group-hover:text-gray-500 transition-colors" />
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/user/search">
                    <Card className="border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0D7C84]/30 transition-all cursor-pointer group">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                <PieChart className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Search Guide</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Find content quickly</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-300 ml-auto group-hover:text-gray-500 transition-colors" />
                        </CardContent>
                    </Card>
                </Link>
            </div>

            {/* Payment History Table */}
            <Card className="border border-gray-100 shadow-sm">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-[#0D7C84]" />
                            Payment History
                        </CardTitle>
                        <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 text-xs">
                            {payments.length} total
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    {payments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left py-3 px-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                                        <th className="text-left py-3 px-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Plan</th>
                                        <th className="text-left py-3 px-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                                        <th className="text-left py-3 px-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                        <th className="text-left py-3 px-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Transaction ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment: { id: string; createdAt: string; plan?: { name: string }; amount: number; status: string; transactionId?: string }) => (
                                        <tr key={payment.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="py-3 px-2 text-sm text-gray-700">
                                                {format(new Date(payment.createdAt), "MMM dd, yyyy")}
                                            </td>
                                            <td className="py-3 px-2">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {payment.plan?.name || "N/A"}
                                                </span>
                                            </td>
                                            <td className="py-3 px-2">
                                                <span className="text-sm font-bold text-gray-900">
                                                    ${payment.amount.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="py-3 px-2">
                                                {payment.status === "PAID" ? (
                                                    <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                                                        Paid
                                                    </Badge>
                                                ) : payment.status === "PENDING" ? (
                                                    <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 text-[10px] font-bold uppercase tracking-wider">
                                                        Pending
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="destructive" className="bg-red-50 text-red-600 border-red-200 text-[10px] font-bold uppercase tracking-wider">
                                                        Failed
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="py-3 px-2">
                                                <span className="text-xs text-gray-400 font-mono">
                                                    {payment.transactionId?.substring(0, 16)}...
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CreditCard className="h-8 w-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">No Payments Yet</h3>
                            <p className="text-sm text-gray-500 mb-6">{`You haven't made any payments yet. Subscribe to a plan to get started.`}</p>
                            <Link href="/#pricing">
                                <Button className="bg-[#0D7C84] hover:bg-[#0B656B] text-white">
                                    View Plans
                                </Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}