"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { handleUpdateProfile } from "@/lib/actions/auth-actions";
import { updateProfileSchema, UpdateProfileData } from "./schema";
import { Eye, EyeOff, User, Mail, Phone, Camera } from "lucide-react";
import Image from "next/image";

export default function UserProfilePage() {
  const { user, checkAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, touchedFields, isSubmitted }
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    }
  });

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: UpdateProfileData) => {
    setSuccessMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      
      // Only append password if it's provided
      if (data.password) {
        formData.append("password", data.password);
      }
      
      // Only append image if it's provided
      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await handleUpdateProfile(formData);
      
      if (!res.success) {
        throw new Error(res.message || "Profile update failed");
      }

      setSuccessMessage("Profile updated successfully!");
      await checkAuth(); // Refresh user data
      
      // Clear password fields after successful update
      setValue("password", "");
      setValue("confirmPassword", "");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setErrorMessage(err?.message || "Profile update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
        
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
            <p className="text-gray-600">Update your personal information and password</p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {imagePreview ? (
                    <Image 
                      src={imagePreview} 
                      alt="Profile preview" 
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : user.image ? (
                    <Image 
                      src={user.image} 
                      alt="Profile" 
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                <label 
                  htmlFor="image-upload" 
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer shadow-lg transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-3">Click camera icon to update profile picture</p>
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className={`w-full h-14 pl-12 pr-4 text-base rounded-xl border-2 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
                    errors.name && (touchedFields.name || isSubmitted)
                      ? "border-red-400 focus:ring-2 focus:ring-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (touchedFields.name || isSubmitted) && (
                <p className="mt-1.5 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`w-full h-14 pl-12 pr-4 text-base rounded-xl border-2 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
                    errors.email && (touchedFields.email || isSubmitted)
                      ? "border-red-400 focus:ring-2 focus:ring-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                  placeholder="abc@example.com"
                />
              </div>
              {errors.email && (touchedFields.email || isSubmitted) && (
                <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-2 block">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className={`w-full h-14 pl-12 pr-4 text-base rounded-xl border-2 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
                    errors.phone && (touchedFields.phone || isSubmitted)
                      ? "border-red-400 focus:ring-2 focus:ring-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                  placeholder="9800000000"
                />
              </div>
              {errors.phone && (touchedFields.phone || isSubmitted) && (
                <p className="mt-1.5 text-xs text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password (Optional)</h3>
              <p className="text-sm text-gray-600 mb-4">Leave blank if you don't want to change your password</p>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-2 block">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full h-14 pl-4 pr-12 text-base rounded-xl border-2 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
                    errors.password && (touchedFields.password || isSubmitted)
                      ? "border-red-400 focus:ring-2 focus:ring-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (touchedFields.password || isSubmitted) && (
                <p className="mt-1.5 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 mb-2 block">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className={`w-full h-14 pl-4 pr-12 text-base rounded-xl border-2 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
                    errors.confirmPassword && (touchedFields.confirmPassword || isSubmitted)
                      ? "border-red-400 focus:ring-2 focus:ring-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (touchedFields.confirmPassword || isSubmitted) && (
                <p className="mt-1.5 text-xs text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-14 rounded-xl text-white font-semibold text-lg transition-all ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:shadow-lg hover:scale-[1.02]"
                }`}
              >
                {isSubmitting ? "Updating Profile..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
