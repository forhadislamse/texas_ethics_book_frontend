"use client";

import { useGetMeQuery, useDeleteUserMutation, useLogoutMutation } from "@/redux/api/authApi";
import { logout } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

export default function ProfilePage() {
    const token = useAppSelector((state) => state.auth.token);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { data: user, isLoading, isError } = useGetMeQuery({ skip: !token }) as any;
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const [logoutMutation] = useLogoutMutation();

    const handleDeleteAccount = async () => {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                await deleteUser({}).unwrap();
                toast.success("Account deleted successfully");

                // Clear local state and redirect
                try {
                    await logoutMutation({}).unwrap();
                } catch (e) {
                    console.error("Logout after delete failed", e);
                }
                dispatch(logout());
                router.push("/login");
            } catch (err: any) {
                toast.error(err?.data?.message || "Failed to delete account");
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError || !user) {
        return (
            <div className="p-8 text-center text-red-500">
                Error loading profile. Please try again.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>

            <Card className="overflow-hidden border-none shadow-sm">
                <CardHeader className="bg-white border-b border-gray-100 p-8">
                    <div className="flex items-center gap-6">
                        <Avatar className="w-24 h-24 border-2 border-gray-100">
                            <AvatarImage src={user.image} alt={user.fullName} className="object-cover" />
                            <AvatarFallback className="text-2xl">{user.fullName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl font-bold">{user.fullName}</CardTitle>
                            <p className="text-gray-500">{user.email}</p>
                            <div className="flex gap-2 mt-2">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full uppercase tracking-wider">
                                    {user.role}
                                </span>
                                <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full uppercase tracking-wider">
                                    {user.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8 bg-white space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Account Information</h3>
                            <div className="grid gap-1">
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{user.phone || "Not provided"}</p>
                            </div>
                            <div className="grid gap-1">
                                <p className="text-sm text-gray-500">Gender</p>
                                <p className="font-medium">{user.gender}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Danger Zone</h3>
                            <div className="p-4 border border-red-100 bg-red-50/30 rounded-xl space-y-4">
                                <p className="text-sm text-gray-600">
                                    Deleting your account is permanent and will remove all your data.
                                </p>
                                <Button
                                    variant="destructive"
                                    className="w-full flex items-center justify-center gap-2 py-6 rounded-lg font-bold"
                                    onClick={handleDeleteAccount}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                    DELETE ACCOUNT
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
