"use client";
import UserLayout from "../../_components/UserLayout";
import AddDonation from "./_components/add";

export default function AddDonationPage() {
  return (
    <UserLayout userType="donor">
      <AddDonation />
    </UserLayout>
  );
}
