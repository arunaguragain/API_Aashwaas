import { Users, Package, TrendingUp, Clock } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
      <p className="mt-2 text-zinc-500">
        Welcome back! Here’s a quick overview of your system.
      </p>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-zinc-500">Users</span>
          </div>
          <p className="mt-3 text-2xl font-semibold text-zinc-900">1,245</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-green-600" />
            <span className="text-sm text-zinc-500">Donations</span>
          </div>
          <p className="mt-3 text-2xl font-semibold text-zinc-900">320</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="text-sm text-zinc-500">Growth</span>
          </div>
          <p className="mt-3 text-2xl font-semibold text-zinc-900">+18%</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-orange-600" />
            <span className="text-sm text-zinc-500">Pending</span>
          </div>
          <p className="mt-3 text-2xl font-semibold text-zinc-900">12</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-10 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">
          Recent Activity
        </h2>

        <ul className="mt-4 space-y-3 text-sm text-zinc-600">
          <li>• New user registered</li>
          <li>• Donation request approved</li>
          <li>• Inventory updated</li>
          <li>• Monthly report generated</li>
        </ul>
      </div>

      {/* Placeholder Section */}
      <div className="mt-10 rounded-xl border border-dashed bg-zinc-50 p-10 text-center">
        <p className="text-zinc-500">
          More dashboard features coming soon 🚀
        </p>
      </div>
    </div>
  );
}
