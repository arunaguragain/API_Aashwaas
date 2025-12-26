"use client";

import LoginForm from "../_components/LoginForm";

export default function DonorLoginPage() {
  const handleSubmit = (values: { email: string; password: string }) => {
    console.log("Donor login:", values);
  };

  return (
    <LoginForm
      userType="Donor"
      onSubmit={handleSubmit}
      registerLink="/donor_register"
      forgotPasswordLink="/donor/forgot-password"
      showGoogleSignIn={true}
    />
  );
}