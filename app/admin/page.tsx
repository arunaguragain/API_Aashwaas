import { Users, Package, TrendingUp, Clock } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-zinc-900">Admin Dashboard</h1>
      <p className="mt-2 text-zinc-500">
        Welcome! Here's a quick overview of your system.
      </p>
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
        <h2 className="text-lg font-semibold text-zinc-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center justify-between border-b pb-4 last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <div>
                  <p className="font-medium text-zinc-900">Activity {item}</p>
                  <p className="text-sm text-zinc-500">2 hours ago</p>
                </div>
              </div>
              <span className="text-sm text-zinc-500">View</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
