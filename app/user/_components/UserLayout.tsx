"use client";

import { ReactNode } from "react";
import UserSidebar from "./UserSidebar";

interface UserLayoutProps {
  children: ReactNode;
  userType: "donor" | "volunteer";
  userName?: string;
}

export default function UserLayout({ children, userType, userName = "Aruna" }: UserLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserSidebar userType={userType} />

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
