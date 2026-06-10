/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import PHInput from "@/components/form/NRInput";
import { Button } from "@/components/ui/button";
import { useLoginMutation, useRegisterMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setCookie } from "@/src/utils/cookies";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Lock, Mail, Phone, User, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type LoginFormValues = {
  email: string;
  password: string;
};

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

const registrationSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreedToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

const AuthPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isLogin = pathname === "/login" || pathname === "/signin";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation() as any;
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation() as any;

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false,
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      const res = await login(data).unwrap();
      if (res.success) {
        const token = res.data.token;
        setCookie(token);
        const decodedUser = jwtDecode<CustomJwtPayload>(token);
        const user = {
          ...decodedUser,
          fullName: res.data.fullName,
          profileImage: res.data.profileImage,
        };
        dispatch(setUser({ token, user }));
        toast.success(res.message || "Login successful!");
        if (user?.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const onRegisterSubmit = async (data: RegistrationFormData) => {
    const payload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phoneNumber,
      password: data.password,
      role: "USER",
      fcmToken: "",
    };
    try {
      const res = await register(payload).unwrap();
      if (res.success) {
        toast.success(res.message || "Registration successful");
        router.push(`/register/verify-email?email=${payload.email}`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0F172A]">
      {/* Full Screen Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/dark_legal_library_bg.png"
          alt="Legal Library Background"
          fill
          className="object-cover"
          priority
        />
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
      </div>

      {/* Auth Forms Container */}
      <div className="relative z-10 w-full max-w-md px-4">

        {/* Toggle */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex border-b border-gray-200">
              <button
                onClick={() => router.push("/login")}
                className={`flex-1 py-3.5 text-center font-semibold text-sm transition-all duration-300 ${
                  isLogin
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/register")}
                className={`flex-1 py-3.5 text-center font-semibold text-sm transition-all duration-300 ${
                  !isLogin
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                Sign Up
              </button>
          </div>

          <div className="p-6">
            {/* Login Form */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                isLogin
                  ? "opacity-100 translate-y-0 h-auto"
                  : "opacity-0 translate-y-4 h-0 overflow-hidden"
              }`}
            >
              {isLogin && (
                <>
                  <h1 className="text-center text-2xl font-semibold">Welcome Back</h1>
                  <p className="mb-5 mt-2 text-center text-sm text-gray-600">
                    Sign in to your account
                  </p>
                  <FormProvider {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <PHInput
                        control={loginForm.control}
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                      />
                      <PHInput
                        control={loginForm.control}
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                      />
                      <div className="flex justify-end">
                        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Button type="submit" disabled={isLoginLoading} className="w-full py-5 font-semibold">
                        {isLoginLoading ? "Loading..." : "Sign In"}
                      </Button>
                    </form>
                  </FormProvider>
                  <p className="mt-5 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button onClick={() => router.push("/register")} className="text-primary font-semibold hover:underline">
                      Sign Up
                    </button>
                  </p>
                </>
              )}
            </div>

            {/* Register Form */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                !isLogin
                  ? "opacity-100 translate-y-0 h-auto"
                  : "opacity-0 translate-y-4 h-0 overflow-hidden"
              }`}
            >
              {!isLogin && (
                <>
                  <h2 className="text-center text-2xl font-bold text-gray-800 mb-1">
                    Join Our Club
                  </h2>
                  <p className="text-center text-gray-600 mb-5 text-sm">
                    Create your membership account
                  </p>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name*
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          {...registerForm.register("fullName")}
                          placeholder="John Doe"
                          className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                        />
                      </div>
                      {registerForm.formState.errors.fullName?.message && (
                        <p className="text-red-500 text-xs mt-0.5">{registerForm.formState.errors.fullName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address*
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          {...registerForm.register("email")}
                          placeholder="you@example.com"
                          className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                        />
                      </div>
                      {registerForm.formState.errors.email?.message && (
                        <p className="text-red-500 text-xs mt-0.5">{registerForm.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number*
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          {...registerForm.register("phoneNumber")}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                        />
                      </div>
                      {registerForm.formState.errors.phoneNumber?.message && (
                        <p className="text-red-500 text-xs mt-0.5">{registerForm.formState.errors.phoneNumber.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password*
                      </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            {...registerForm.register("password")}
                            placeholder="Enter your password"
                            className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      {registerForm.formState.errors.password?.message && (
                        <p className="text-red-500 text-xs mt-0.5">{registerForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password*
                      </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            {...registerForm.register("confirmPassword")}
                            placeholder="Confirm your password"
                            className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      {registerForm.formState.errors.confirmPassword?.message && (
                        <p className="text-red-500 text-xs mt-0.5">{registerForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>

                    <div className="pt-1">
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          {...registerForm.register("agreedToTerms")}
                          className="mt-0.5 w-3.5 h-3.5 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label className="text-xs text-gray-600">
                          I agree to the{" "}
                          <Link href="/terms" className="text-primary hover:underline font-medium">
                              Terms & Conditions
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-primary hover:underline font-medium">
                              Privacy Policy
                            </Link>
                        </label>
                      </div>
                      {registerForm.formState.errors.agreedToTerms?.message && (
                        <p className="text-red-500 text-xs mt-0.5">{registerForm.formState.errors.agreedToTerms.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isRegisterLoading}
                      className="w-full text-white bg-primary font-semibold py-5 rounded-lg transition-colors"
                    >
                      {isRegisterLoading ? "Loading..." : "Sign Up"}
                    </Button>
                  </form>

                  <p className="text-center text-sm text-gray-600 mt-5">
                    Already have an account?{" "}
                    <button onClick={() => router.push("/login")} className="text-primary font-semibold hover:underline">
                      Log in
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;