"use client";

import RegsiterForm from "../_components/RegisterForm";

export default function VolunteerRegisterPage() {
  const handleSubmit = (values: any) => {
  };

  return (
    <RegsiterForm
      userType="Volunteer"
      onSubmit={handleSubmit}
      loginLink="/volunteer_login"
    />
  );
}
