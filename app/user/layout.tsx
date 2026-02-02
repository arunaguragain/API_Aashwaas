import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-gray-50">
			{children}
		</div>
	);
}
