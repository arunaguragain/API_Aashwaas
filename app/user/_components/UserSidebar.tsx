"use client";

import { Heart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/lib/actions/auth-actions";

interface UserSidebarProps {
  userType: "donor" | "volunteer";
}

const navigationConfig = {
  donor: [
    { href: "/user/donor/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/user/donor/my-donations", label: "My Donation", icon: "❤️" },
    { href: "/user/donor/add-donation", label: "Add Donation", icon: "⊕" },
    { href: "/user/donor/ngo-directory", label: "NGO Directory", icon: "🏛️" },
    { href: "/user/donor/wishlist", label: "Wishlist", icon: "📋" },
    { href: "/user/donor/reviews", label: "Reviews", icon: "⭐" },
  ],
  volunteer: [
    { href: "/user/volunteer/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/user/volunteer/my-tasks", label: "My Tasks", icon: "✓" },
    { href: "/user/volunteer/history", label: "History", icon: "🕒" },
  ],
};

export default function UserSidebar({ userType }: UserSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const navigation = navigationConfig[userType];

  const onLogout = async () => {
    const res = await handleLogout();
    if (res.success) {
      router.push(userType === "donor" ? "/donor_login" : "/volunteer_login");
      return;
    }
    console.error(res.message || "Logout failed");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">आश्वास</h1>
            <p className="text-xs text-gray-500">
              {userType === "donor" ? "Donor Portal" : "Volunteer Portal"}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
                isActive
                  ? "bg-green-50 text-green-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">{item.icon}</div>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link
          href="/user/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 mb-2"
        >
          <User className="w-5 h-5" />
          Profile
        </Link>
        <Link
          href="/user/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 mb-2"
        >
          <div className="w-5 h-5 flex items-center justify-center">⚙️</div>
          Settings
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full"
        >
          <div className="w-5 h-5 flex items-center justify-center">⏻</div>
          Logout
        </button>
      </div>
    </aside>
  );
}
