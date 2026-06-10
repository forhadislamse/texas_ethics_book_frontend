"use client";

import { useGetMeQuery, useDeleteUserMutation, useLogoutMutation, useUpdateUserMutation } from "@/redux/api/authApi";
import { logout } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, Edit2, X, Save, Camera, ShieldCheck, CalendarDays, BadgeCheck, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
    const token = useAppSelector((state) => state.auth.token);
    const dispatch = useAppDispatch();
    const router = useRouter();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: userData, isLoading, isError } = useGetMeQuery(undefined, { skip: !token }) as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = userData?.data;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation() as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation() as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [logoutMutation] = useLogoutMutation() as any;

    // Subscription status
    const subscriptionExpiresAt = user?.subscriptionExpiresAt ? new Date(user.subscriptionExpiresAt) : null;
    const isSubscribed = user?.isSubscribed;
    const plan = user?.plan;
    const isActive = isSubscribed && subscriptionExpiresAt && subscriptionExpiresAt > new Date();

    // Edit states
    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            
            // The backend expects a 'data' field with stringified JSON
            const data = JSON.stringify({
                fullName,
                phone,
            });
            formData.append("data", data);
            
            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            await updateUser(formData).unwrap();
            toast.success("Profile updated successfully");
            setIsEditing(false);
            setSelectedFile(null);
            setPreviewUrl(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update profile");
        }
    };

    const handleDeleteAccount = async () => {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                await deleteUser({}).unwrap();
                toast.success("Account deleted successfully");

                try {
                    await logoutMutation({}).unwrap();
                } catch (e) {
                    console.error("Logout after delete failed", e);
                }
                dispatch(logout());
                router.push("/login");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Account Management</h1>
                {!isEditing ? (
                    <Button 
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                    >
                        <Edit2 size={16} /> Edit Profile
                    </Button>
                ) : (
                    <Button 
                        variant="ghost" 
                        onClick={() => {
                            setIsEditing(false);
                            setPreviewUrl(null);
                            setSelectedFile(null);
                        }}
                        className="text-gray-500"
                    >
                        <X size={16} className="mr-2" /> Cancel
                    </Button>
                )}
            </div>

            <Card className="overflow-hidden border-none shadow-sm">
                <CardHeader className="bg-white border-b border-gray-100 p-8">
                    <form onSubmit={handleUpdateProfile}>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="relative group">
                                <Avatar className="w-32 h-32 border-4 border-gray-50 shadow-md">
                                    <AvatarImage 
                                        src={previewUrl || user.profileImage} 
                                        alt={user.fullName} 
                                        className="object-cover" 
                                    />
                                    <AvatarFallback className="text-3xl bg-blue-50 text-blue-600 font-bold">
                                        {user.fullName?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                {isEditing && (
                                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="text-white w-8 h-8" />
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            accept="image/*" 
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                )}
                            </div>
                            
                            <div className="flex-1 space-y-4 w-full">
                                {!isEditing ? (
                                    <>
                                        <div>
                                            <CardTitle className="text-2xl font-bold text-gray-900">{user.fullName}</CardTitle>
                                            <p className="text-gray-500 font-medium">{user.email}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-widest border border-blue-100">
                                                {user.role}
                                            </span>
                                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-widest border border-emerald-100">
                                                {user.status}
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="fullName" className="text-gray-600 font-bold uppercase text-[10px] tracking-widest">Full Name</Label>
                                            <Input 
                                                id="fullName"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-100"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="phone" className="text-gray-600 font-bold uppercase text-[10px] tracking-widest">Phone Number</Label>
                                            <Input 
                                                id="phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-100"
                                            />
                                        </div>
                                        <Button 
                                            type="submit" 
                                            disabled={isUpdating}
                                            className="w-full bg-blue-600 hover:bg-blue-700 py-6 font-bold uppercase tracking-widest text-xs"
                                        >
                                            {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                            Save Changes
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </CardHeader>
                
                {!isEditing && (
                    <CardContent className="p-8 bg-white space-y-12">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Account Details</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-3 border-b border-gray-50">
                                        <span className="text-sm text-gray-400">Phone Number</span>
                                        <span className="text-sm font-bold text-gray-700">{user.phone || "Not provided"}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-50">
                                        <span className="text-sm text-gray-400">Join Date</span>
                                        <span className="text-sm font-bold text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Subscription Section */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0D7C84]">My Subscription</h3>
                                <div className="p-6 border border-gray-100 bg-gray-50/30 rounded-2xl space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="h-4 w-4 text-[#0D7C84]" />
                                            <span className="text-sm font-bold text-gray-900">{plan?.name || "Free Plan"}</span>
                                        </div>
                                        {isActive ? (
                                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium text-[10px]">
                                                Active
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200 font-medium text-[10px]">
                                                {plan?.price === 0 ? "Free" : "Inactive"}
                                            </Badge>
                                        )}
                                    </div>
                                    {plan && (
                                        <div className="text-sm text-gray-500">
                                            ${plan.price}{plan.duration === 'unlimited' ? '' : `/${plan.duration === 'yearly' ? 'yr' : 'mo'}`}
                                        </div>
                                    )}
                                    {isActive && subscriptionExpiresAt && (
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <CalendarDays className="h-3 w-3" />
                                            Renews: {subscriptionExpiresAt.toLocaleDateString()}
                                        </div>
                                    )}
                                    {plan?.features && plan.features.length > 0 && (
                                        <div className="pt-2 space-y-1.5">
                                            {plan.features.slice(0, 3).map((f: string, idx: number) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                                                    <BadgeCheck className="h-3 w-3 text-emerald-500 shrink-0" />
                                                    {f}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <Link href="/user">
                                        <Button variant="link" className="text-[#0D7C84] text-xs p-0 h-auto font-bold">
                                            Manage Subscription <CreditCard className="h-3 w-3 ml-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Danger Zone</h3>
                                <div className="p-6 border border-red-50 bg-red-50/20 rounded-2xl">
                                    <p className="text-xs text-red-400 mb-6 leading-relaxed">
                                        Deleting your account is permanent. All your data and active subscriptions will be removed immediately.
                                    </p>
                                    <Button
                                        variant="destructive"
                                        className="w-full flex items-center justify-center gap-2 py-6 rounded-xl font-bold uppercase tracking-widest text-[10px] bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100 transition-all shadow-none"
                                        onClick={handleDeleteAccount}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                        Delete My Account
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>
    );
}