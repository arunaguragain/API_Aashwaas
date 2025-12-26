"use client";

import RegsiterForm from "../_components/RegisterForm";

export default function DonorRegisterPage() {
  const handleSubmit = (values: any) => {
    console.log("Donor register:", values);
  };

  return (
    <RegsiterForm
      userType="Donor"
      onSubmit={handleSubmit}
      loginLink="/donor_login"
    />
  );
}
