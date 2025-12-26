"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CheckCircle2, Lock, Mail, Users, Eye, EyeOff } from "lucide-react";
import { registerSchema, RegisterData } from "../schema";

interface Props {
  userType: "Admin" | "Donor" | "Volunteer";
  onSubmit?: (values: RegisterData) => void;
  loginLink?: string;
}

export default function RegsiterForm({ userType, onSubmit, loginLink }: Props) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    formState: { errors, isSubmitting, touchedFields, isSubmitted }
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" }
  });

  const watchEmail = watch("email");
  const watchPassword = watch("password");

  const buttonGradientMap: Record<string, string> = {
    Admin: "from-purple-600 via-violet-600 to-purple-700",
    Donor: "from-blue-600 via-cyan-600 to-blue-700",
    Volunteer: "from-green-600 via-emerald-600 to-green-700",
  };

  const buttonGradient = buttonGradientMap[userType];

  const onSubmitForm = async (data: RegisterData) => {
    // simulate API
    await new Promise((r) => setTimeout(r, 900));
    if (onSubmit) onSubmit(data);

    // redirect to dashboard
    const path = userType.toLowerCase();
    router.push(`/${path}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative px-4 sm:px-6 lg:px-0">
      <div className="absolute -top-44 -left-44 w-40 h-40 bg-linear-to-br from-sky-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-45 animate-pulse hidden lg:block"></div>
      <div className="absolute -bottom-40 -right-40 w-36 h-36 bg-linear-to-br from-pink-200 to-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-35 animate-pulse hidden lg:block" style={{ animationDelay: '1.5s' }}></div>
      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
        <div className="h-1.5 bg-linear-to-r from-sky-400 to-indigo-400"></div>

        {/* Decorative corner glows */}
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-linear-to-br from-sky-100 to-blue-200 rounded-2xl opacity-40 blur-2xl transform rotate-12 pointer-events-none hidden lg:block"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-linear-to-br from-pink-100 to-rose-200 rounded-2xl opacity-30 blur-2xl transform -rotate-12 pointer-events-none hidden lg:block"></div>

        <div className="p-12 lg:p-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3 tracking-tight">Create {userType} Account</h1>
            <p className="text-gray-600 text-base lg:text-lg">Fill in details to get started</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmitForm)}>
            {/* Name */}
            <div>
              <label htmlFor="name" className="text-base font-semibold text-gray-700 mb-2 block">Full Name</label>
              <input id="name" {...register("name")} onBlur={() => trigger("name")} className={`w-full h-14 lg:h-16 px-4 text-base lg:text-lg rounded-2xl border-2 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${errors.name && (touchedFields.name || isSubmitted) ? 'border-red-400 focus:ring-2 focus:ring-red-500' : 'border-gray-200 focus:ring-2'}`} placeholder="Your full name" />
              {errors.name && (touchedFields.name || isSubmitted) && <p className="mt-1.5 text-xs text-red-600">{errors.name?.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 block">Email Address</label>
              <input id="email" type="email" {...register("email")} onBlur={() => trigger("email")} className={`w-full h-12 px-4 text-sm rounded-xl border-2 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${errors.email && (touchedFields.email || isSubmitted) ? 'border-red-400 focus:ring-2 focus:ring-red-500' : 'border-gray-200 focus:ring-2'}`} placeholder="you@gmail.com" />
              {errors.email && (touchedFields.email || isSubmitted) && <p className="mt-1.5 text-xs text-red-600">{errors.email?.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-2 block">Password</label>
              <div className="relative">
                <input id="password" type={showPassword ? "text" : "password"} {...register("password")} onBlur={() => trigger("password")} className={`w-full h-14 lg:h-16 px-4 pr-12 text-base lg:text-lg rounded-2xl border-2 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${errors.password && (touchedFields.password || isSubmitted) ? 'border-red-400 focus:ring-2 focus:ring-red-500' : 'border-gray-200 focus:ring-2'}`} placeholder="Choose a strong password" />
                <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
              </div>
              {errors.password && (touchedFields.password || isSubmitted) && <p className="mt-1.5 text-xs text-red-600">{errors.password?.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 mb-2 block">Confirm Password</label>
              <div className="relative">
                <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword")} onBlur={() => trigger("confirmPassword")} className={`w-full h-14 lg:h-16 px-4 text-base lg:text-lg rounded-2xl border-2 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${errors.confirmPassword && (touchedFields.confirmPassword || isSubmitted) ? 'border-red-400 focus:ring-2 focus:ring-red-500' : 'border-gray-200 focus:ring-2'}`} placeholder="Repeat your password" />
                <button type="button" aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'} onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg">
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (touchedFields.confirmPassword || isSubmitted) && <p className="mt-1.5 text-xs text-red-600">{errors.confirmPassword?.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" disabled={isSubmitting} className={`w-full h-16 lg:h-18 text-lg rounded-2xl bg-linear-to-r ${buttonGradient} text-white font-bold focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-transform transform hover:scale-[1.02] active:scale-[0.98] shadow-lg`}>{isSubmitting ? 'Creating...' : 'Create Account'}</button>
            </div>

            {loginLink && (
              <div className="mt-4 text-center text-sm text-gray-600">Already registered? <a href={loginLink} className="text-blue-600 font-medium">Sign in</a></div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}
