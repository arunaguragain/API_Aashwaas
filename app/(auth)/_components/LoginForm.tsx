"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { startTransition, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { loginSchema } from "../schema";



type LoginData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  userType: "Admin" | "Donor" | "Volunteer";
  onSuccess?: (values: LoginData) => void;
  registerLink?: string;
  forgotPasswordLink?: string;
}

export default function LoginForm({
  userType,
  onSuccess,
  registerLink = "/register",
  forgotPasswordLink = "/forgot-password",
}: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const submit = async (values: LoginData) => {
    setTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`${userType} login`, values);
      if (onSuccess) onSuccess(values);
      router.push("/dashboard"); 
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4 p-6 bg-white rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">{userType} Login</h2>

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={`Enter your ${userType.toLowerCase()} email`}
          className="h-10 w-full rounded-md border border-black/10 px-3 text-sm outline-none focus:border-foreground/40"
          {...register("email")}
        />
        {errors.email?.message && <p className="text-xs text-red-600">{errors.email.message}</p>}
      </div>

      <div className="space-y-1 relative">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="••••••"
          className="h-10 w-full rounded-md border border-black/10 px-3 text-sm outline-none focus:border-foreground/40 pr-10"
          {...register("password")}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
        {errors.password?.message && <p className="text-xs text-red-600">{errors.password.message}</p>}
      </div>

      <div className="flex justify-between items-center text-sm">
        {forgotPasswordLink && (
          <Link href={forgotPasswordLink} className="text-purple-600 hover:underline">
            Forgot Password?
          </Link>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="h-10 w-full rounded-md bg-purple-600 text-white font-semibold hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting || pending ? "Logging in..." : "Log in"}
      </button>

      {registerLink && (
        <div className="mt-2 text-center text-sm text-gray-600">
          Don't have an account? <Link href={registerLink} className="text-purple-600 hover:underline">Sign up</Link>
        </div>
      )}
    </form>
  );
}
