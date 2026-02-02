"use client";

import Link from "next/link";
import { Bell, HelpCircle, Search } from "lucide-react";

export default function AdminHeader() {
	return (
		<header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
			<div className="mx-auto flex h-16 items-center justify-between px-6">
				<div className="flex items-center gap-4">
					<div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-500 md:flex">
						<Search className="h-4 w-4" />
						<span>Search users, donations, NGOs...</span>
					</div>
				</div>

				<nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 lg:flex">
					<Link href="/" className="hover:text-gray-900">Home</Link>
					<Link href="/about" className="hover:text-gray-900">About Us</Link>
					<Link href="/contact" className="hover:text-gray-900">Contact</Link>
					<Link href="/help" className="hover:text-gray-900 flex items-center gap-2">
						<HelpCircle className="h-4 w-4" /> Help
					</Link>
				</nav>

				<div className="flex items-center gap-3">
					<button
						type="button"
						className="relative rounded-full border border-gray-200 bg-white p-2 text-gray-600 hover:bg-gray-50"
						aria-label="Notifications"
					>
						<Bell className="h-4 w-4" />
						<span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-rose-500" />
					</button>
					<div className="hidden items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 md:flex">
						<div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500" />
						<span className="text-sm font-semibold text-gray-700">Admin</span>
					</div>
				</div>
			</div>
		</header>
	);
}
