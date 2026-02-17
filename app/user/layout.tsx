import { ReactNode } from "react";
import ToastProvider from "@/app/(platform)/_components/ToastProvider";

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return <ToastProvider>{children}</ToastProvider>;
}
