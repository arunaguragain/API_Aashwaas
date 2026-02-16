import { ReactNode } from "react";

interface UserLayoutProps {
	children: ReactNode;
	userType?: string;
}

export default function UserLayout({ children, userType }: UserLayoutProps) {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Optionally display userType or use it as needed */}
			{children}
		</div>
	);
}
