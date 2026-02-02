import Link from "next/link";
import { handleGetUsers } from "@/lib/actions/admin/user-action";

export default async function Page() {
    const result = await handleGetUsers();
    const users = result.success ? (result.data || []) : [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
                    <p className="text-sm text-gray-500">Manage users and roles</p>
                </div>
                <Link
                    className="inline-flex items-center rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                    href="/admin/users/create"
                >
                    Create User
                </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.length === 0 ? (
                            <tr>
                                <td className="px-6 py-6 text-sm text-gray-500" colSpan={4}>
                                    {result.success ? "No users found." : (result.message || "Failed to load users.")}
                                </td>
                            </tr>
                        ) : (
                            users.map((user: any) => (
                                <tr key={user._id || user.id} className="text-sm text-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "—"}</td>
                                    <td className="px-6 py-4">{user.email || "—"}</td>
                                    <td className="px-6 py-4 capitalize">{user.role || "user"}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={`/admin/users/${user._id || user.id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/admin/users/${user._id || user.id}/edit`}
                                                className="text-gray-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}