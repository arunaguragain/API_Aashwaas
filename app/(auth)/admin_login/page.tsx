"use client";

import LoginForm from "../_components/LoginForm";

export default function AdminLoginPage() {
  const handleSubmit = (values: { email: string; password: string }) => {
    console.log("Admin login:", values);
  };

  return (
    <LoginForm
      userType="Admin"
      onSubmit={handleSubmit}
      registerLink={undefined} 
      forgotPasswordLink="/admin/forgot-password"
      showGoogleSignIn={false}
    />
  );
}