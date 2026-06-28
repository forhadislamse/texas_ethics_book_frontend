"use client";

import Otp from "@/components/module/Auth/otp";
import { useVerifyOtpMutation } from "@/redux/api/authApi";

export default function VerifyEmail() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <div className="hidden lg:flex lg:w-1/2 relative min-h-screen">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
                        backgroundImage: "url('/dark_legal_library_bg.png')",
                    }}
                ></div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
                <Otp
                    successRedirect={() => "/login"}
                    successMessage="Email verified successfully! You can now log in."
                />
            </div>
        </div>
    );
}
