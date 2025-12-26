"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Lock, Mail, CheckCircle2, Shield, Heart, Users } from "lucide-react";
import { loginSchema, LoginData} from "../schema";
import Link from "next/link";

interface LoginFormProps {
  userType: "Admin" | "Donor" | "Volunteer";
  onSubmit?: (values: { email: string; password: string }) => void;
  registerLink?: string;
  forgotPasswordLink?: string;
  showGoogleSignIn?: boolean;
}

export default function LoginForm({
  userType,
  onSubmit,
  registerLink,
  forgotPasswordLink = "/forgot-password",
  showGoogleSignIn = false
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    formState: { errors, isSubmitting, touchedFields, isSubmitted }
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" }
  });

  const watchEmail = watch("email");
  const watchPassword = watch("password");

  const colorSchemes = {
    Admin: {
      primary: "purple",
      gradient: "from-purple-600 via-violet-600 to-purple-700",
      bgGradient: "from-purple-50 via-violet-50 to-purple-100",
      glow: "shadow-purple-500/30",
      glowHover: "hover:shadow-purple-500/50",
      ring: "focus:ring-purple-500 focus:border-purple-500",
      button: "from-purple-600 via-violet-600 to-purple-700 hover:from-purple-700 hover:via-violet-700 hover:to-purple-800",
      buttonGlow: "shadow-purple-500/50 hover:shadow-purple-600/60",
      icon: Shield,
      accent: "text-purple-600",
      accentBg: "bg-purple-600",
      lightAccent: "bg-purple-100 text-purple-700",
      borderAccent: "border-purple-200",
      dotColor: "bg-purple-500"
    },
    Donor: {
      primary: "blue",
      gradient: "from-blue-600 via-cyan-600 to-blue-700",
      bgGradient: "from-blue-50 via-cyan-50 to-blue-100",
      glow: "shadow-blue-500/30",
      glowHover: "hover:shadow-blue-500/50",
      ring: "focus:ring-blue-500 focus:border-blue-500",
      button: "from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800",
      buttonGlow: "shadow-blue-500/50 hover:shadow-blue-600/60",
      icon: Heart,
      accent: "text-blue-600",
      accentBg: "bg-blue-600",
      lightAccent: "bg-blue-100 text-blue-700",
      borderAccent: "border-blue-200",
      dotColor: "bg-blue-500"
    },
    Volunteer: {
      primary: "green",
      gradient: "from-green-600 via-emerald-600 to-green-700",
      bgGradient: "from-green-50 via-emerald-50 to-green-100",
      glow: "shadow-green-500/30",
      glowHover: "hover:shadow-green-500/50",
      ring: "focus:ring-green-500 focus:border-green-500",
      button: "from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800",
      buttonGlow: "shadow-green-500/50 hover:shadow-green-600/60",
      icon: Users,
      accent: "text-green-600",
      accentBg: "bg-green-600",
      lightAccent: "bg-green-100 text-green-700",
      borderAccent: "border-green-200",
      dotColor: "bg-green-500"
    }
  };

  const scheme = colorSchemes[userType];
  const IconComponent = scheme.icon;

  const onSubmitForm = async (data: LoginData) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    if (onSubmit) onSubmit(data);
    const path = userType.toLowerCase();
    router.push(`/${path}`);
  };

  return (
    <div className="w-full max-w-130 relative">
      <div className={`absolute -top-32 -left-32 w-96 h-96 bg-linear-to-br ${scheme.gradient} rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-pulse`}></div>
      <div className={`absolute -bottom-32 -right-32 w-96 h-96 bg-linear-to-br ${scheme.gradient} rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse`} style={{ animationDelay: '2s' }}></div>
      <div className="relative">
        <div className={`absolute -top-6 -right-6 w-32 h-32 bg-linear-to-br ${scheme.gradient} rounded-3xl opacity-20 blur-2xl`}></div>
        <div className={`absolute -bottom-6 -left-6 w-32 h-32 bg-linear-to-br ${scheme.gradient} rounded-3xl opacity-20 blur-2xl`}></div>
        
        <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden">
          <div className={`h-2 bg-linear-to-r ${scheme.gradient}`}></div>
          
          <div className="p-10">
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <div className={`absolute inset-0 bg-linear-to-br ${scheme.gradient} rounded-2xl blur-2xl opacity-40`}></div>
                <div className="relative">
                  <div className={`w-20 h-20 bg-linear-to-br ${scheme.gradient} rounded-2xl ${scheme.glow} transform transition-all duration-500 hover:scale-110 hover:rotate-6 flex items-center justify-center`}>
                    <IconComponent className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                  
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                {userType} Login
              </h1>
              <p className="text-gray-500 text-sm">
                {userType === "Admin" 
                  ? "Secure portal for authorized personnel"
                  : `Sign in to your ${userType.toLowerCase()} account`}
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    id="email"
                    type="email"
                    placeholder={`${userType.toLowerCase()}@gmail.com`}
                    {...register("email")}
                    onBlur={() => trigger("email")}
                    className={`w-full h-12 px-4 text-sm rounded-xl border-2 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
                      errors.email && (touchedFields.email || isSubmitted)
                        ? 'border-red-400 focus:ring-2 focus:ring-red-500'
                        : `border-gray-200 ${scheme.ring} focus:ring-2`
                    }`}
                  />
                  {!errors.email && (touchedFields.email || isSubmitted) && watchEmail && (
                    <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.email && (touchedFields.email || isSubmitted) && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    onBlur={() => trigger("password")}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSubmit(onSubmitForm)();
                      }
                    }}
                    className={`w-full h-12 px-4 pr-12 text-sm rounded-xl border-2 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
                      errors.password && (touchedFields.password || isSubmitted)
                        ? 'border-red-400 focus:ring-2 focus:ring-red-500'
                        : `border-gray-200 ${scheme.ring} focus:ring-2`
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-lg"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  {!errors.password && (touchedFields.password || isSubmitted) && watchPassword && (
                    <CheckCircle2 className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.password && (touchedFields.password || isSubmitted) && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-5 h-5 border-2 border-gray-300 rounded peer-checked:${scheme.accentBg} peer-checked:border-transparent transition-all flex items-center justify-center`}>
                      {rememberMe && (
                        <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors select-none">Remember me</span>
                </label>
                
                {forgotPasswordLink && (
                  <Link 
                    href={forgotPasswordLink}
                    className={`text-sm font-semibold ${scheme.accent} hover:underline transition-all`}
                  >
                    Forgot Password?
                  </Link>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleSubmit(onSubmitForm)()}
                disabled={isSubmitting}
                className={`group relative w-full h-12 text-sm rounded-xl bg-linear-to-r ${scheme.button} text-white font-bold focus:outline-none focus:ring-4 ${scheme.ring} focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${scheme.buttonGlow} overflow-hidden`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>

            {showGoogleSignIn && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white text-gray-500 font-medium uppercase tracking-wider">Or</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all flex items-center justify-center gap-3 group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </>
            )}

            {userType === "Admin" && (
              <div className={`mt-6 p-4 rounded-xl bg-linear-to-br ${scheme.bgGradient} ${scheme.borderAccent} border`}>
                <div className="flex gap-3 items-start">
                  <div className={`${scheme.accentBg} p-2 rounded-lg shrink-0`}>
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-900 mb-1">Secure Access</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      This portal is protected and monitored. Unauthorized access attempts will be logged.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {registerLink && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  New to आश्वास?{" "}
                  <Link 
                    href={registerLink}
                    className={`font-bold ${scheme.accent} hover:underline transition-all`}
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}