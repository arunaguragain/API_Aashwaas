import { ReactNode } from "react";
import UserHeader from "./_components/UserHeader";
import UserSidebar from "./_components/UserSidebar";

interface UserLayoutProps {
	children: ReactNode;
	userType?: "donor" | "volunteer";
}

export default function UserLayout({ children, userType = "donor" }: UserLayoutProps) {
	return (
		<div className="min-h-screen bg-gray-50">
			<UserSidebar userType={userType} />
			<div className="ml-56"> 
				<UserHeader userType={userType} />
				<main className="p-6 pt-6">{children}</main>
			</div>
		</div>
	);
}
