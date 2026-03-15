/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { useRegisterMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  ChevronDown,
  ImageIcon,
  Lock,
  Mail,
  Phone,
  User,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const registrationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  skillLevel: z.string().min(1, "Skill level is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [photoError, setPhotoError] = useState<string>("");

  const [register, { isLoading }] = useRegisterMutation() as any;

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      dateOfBirth: "",
      skillLevel: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false,
    },
  });

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("registrationData");
    const savedPhotoPreview = localStorage.getItem("photoPreview");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      reset({
        ...parsedData,
        password: "",
        confirmPassword: "",
      });
    }

    if (savedPhotoPreview) {
      setPhotoPreview(savedPhotoPreview);
    }
  }, [reset]);

  const handlePhotoUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const preview = URL.createObjectURL(file);
      setPhotoPreview(preview);
      localStorage.setItem("photoPreview", preview);
      setPhotoError("");
    }
  };

  const nextStep = async () => {
    const fieldsToValidate: (keyof RegistrationFormData)[] =
      step === 1 ? ["fullName", "phoneNumber", "dateOfBirth", "skillLevel"] : [];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      localStorage.setItem("registrationData", JSON.stringify(getValues()));
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const onSubmit = async (data: RegistrationFormData) => {
    const payload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phoneNumber,
      password: data.password,
      role: "USER",
      fcmToken: ""
    };

    try {
      const res = await register(payload).unwrap();

      if (res.success) {
        toast.success(res.message || "Registration successful");
        localStorage.removeItem("registrationData");
        localStorage.removeItem("photoPreview");
        router.push(`/register/verify-email?email=${payload.email}`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 bg-[#0a1628] rounded-3xl p-12 flex items-center justify-center lg:min-h-[600px]">
          <Image
            src="/Logo.png"
            alt="Logo"
            className="w-48 h-auto object-contain"
            width={500}
            height={500}
          />
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-3xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Join Our Club
            </h2>
            <p className="text-gray-600">
              Create your Tennis Club membership account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 ? (
              <>
                <div className="flex flex-col items-center">
                  <label className="text-sm font-medium text-gray-700 mb-3 self-start">
                    Upload your photo (Optional)
                  </label>
                  <label className="w-24 h-24 border-2 border-dashed border-[#a4d65e] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden">
                    {photoPreview ? (
                      <Image
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        width={500}
                        height={500}
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name*
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      {...formRegister("fullName")}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a4d65e] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {errors.fullName?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number*
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-10 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      {...formRegister("phoneNumber")}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a4d65e] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {errors.phoneNumber?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth*
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      {...formRegister("dateOfBirth")}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a4d65e] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {errors.dateOfBirth?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Level*
                  </label>
                  <div className="relative">
                    <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      {...formRegister("skillLevel")}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a4d65e] focus:border-transparent outline-none transition-all appearance-none bg-white"
                    >
                      <option value="">Select skill level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.skillLevel?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.skillLevel.message}</p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-full text-gray-800 font-semibold py-6 rounded-lg transition-colors"
                >
                  Next
                </Button>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address*
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      {...formRegister("email")}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a4d65e] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {errors.email?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password*
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      {...formRegister("password")}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a4d65e] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {errors.password?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password*
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      {...formRegister("confirmPassword")}
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a4d65e] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {errors.confirmPassword?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      {...formRegister("agreedToTerms")}
                      className="mt-1 w-4 h-4 text-[#a4d65e] border-gray-300 rounded focus:ring-[#a4d65e]"
                    />
                    <label className="text-sm text-gray-600">
                      I agree to the{" "}
                      <Link href="/terms-privacy" className="text-[#f4d03f] hover:underline font-medium">
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/terms-privacy" className="text-[#f4d03f] hover:underline font-medium">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {errors.agreedToTerms?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.agreedToTerms.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-gray-800 font-semibold py-6 rounded-lg transition-colors"
                  >
                    {isLoading ? "Loading..." : "Sign Up"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors"
                  >
                    ← Back
                  </Button>
                </div>
              </>
            )}
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-gray-800 font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
