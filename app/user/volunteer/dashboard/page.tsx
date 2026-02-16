
"use client";

import { CheckCircle, TrendingUp, Award } from "lucide-react";

export default function VolunteerDashboard() {
  const userName = "Aruna";

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName} !</h1>
        <p className="text-gray-500 mt-1">Here's an overview of your volunteer activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-4 right-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 mb-2">Task Completed</p>
          <p className="text-4xl font-bold text-gray-900 mb-2">47</p>
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+7% this month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <Award className="w-6 h-6 text-yellow-600" />
          </div>
          <p className="text-sm text-gray-500 mb-2">Impact Points</p>
          <p className="text-4xl font-bold text-gray-900 mb-2">920</p>
          <p className="text-sm text-gray-500">Top 5% donors</p>
        </div>
      </div>

      {/* Charts and Quick Actions Row */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Monthly Task Completion */}
        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Task Completion</h2>
          <div className="h-64 flex items-end justify-between gap-8 px-4">
            {/* Bar chart */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-full bg-green-500 rounded-t-lg" style={{ height: "180px" }}></div>
              <span className="text-sm text-gray-600 mt-2">Jun</span>
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-full bg-green-500 rounded-t-lg" style={{ height: "140px" }}></div>
              <span className="text-sm text-gray-600 mt-2">Jul</span>
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-full bg-green-500 rounded-t-lg" style={{ height: "180px" }}></div>
              <span className="text-sm text-gray-600 mt-2">Aug</span>
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-full bg-green-500 rounded-t-lg" style={{ height: "60px" }}></div>
              <span className="text-sm text-gray-600 mt-2">Sep</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
              View Available Tasks
            </button>
            <button className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Update Availability
            </button>
            <button className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              View Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Recent Donations Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Donations</h2>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Item</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Donor</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Pick Up</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Delivery</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-4 px-4 text-sm text-gray-900">Winter Clothes</td>
                <td className="py-4 px-4 text-sm text-gray-600">Clothing</td>
                <td className="py-4 px-4 text-sm text-gray-600">15 items</td>
                <td className="py-4 px-4 text-sm text-gray-600">Moonlight Foundation</td>
                <td className="py-4 px-4 text-sm text-gray-600">Jun 20, 2025</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Delivered
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="px-3 py-1 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800">
                    Accept
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-4 px-4 text-sm text-gray-900">School Books</td>
                <td className="py-4 px-4 text-sm text-gray-600">Education</td>
                <td className="py-4 px-4 text-sm text-gray-600">25 books</td>
                <td className="py-4 px-4 text-sm text-gray-600">Hope Foundation</td>
                <td className="py-4 px-4 text-sm text-gray-600">Nov 20, 2025</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    In Transit
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
