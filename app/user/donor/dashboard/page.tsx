"use client";

import { Heart, TrendingUp, Award, Calendar, Package, Clock, MapPin } from "lucide-react";
import UserLayout from "../../_components/UserLayout";

export default function DonorDashboard() {
  const userName = "Aruna";

  return (
    <UserLayout userType="donor" userName={userName}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName} !</h1>
        <p className="text-gray-500 mt-1">Here's an overview of your donation activity</p>
      </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-4 right-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-500 mb-2">Total Donations</p>
            <p className="text-4xl font-bold text-gray-900 mb-2">47</p>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12% this month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-sm text-gray-500 mb-2">Impact Score</p>
            <p className="text-4xl font-bold text-gray-900 mb-2">850</p>
            <p className="text-sm text-gray-500">Top 10% donors</p>
          </div>
        </div>

        {/* Charts and Pickups Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Donation Trends */}
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Donation Trends</h2>
            <div className="h-64 flex items-end justify-between gap-2">
              {/* Simple area chart visualization */}
              <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#86efac" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#86efac" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 180 L 50 160 L 100 140 L 150 120 L 200 100 L 250 80 L 300 60 L 350 90 L 400 70 L 450 50 L 500 40 L 550 30 L 600 50 L 600 200 L 0 200 Z"
                  fill="url(#gradient)"
                  stroke="#22c55e"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
            </div>
          </div>

          {/* Upcoming Pickups */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Pickups</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <p className="font-medium text-gray-900 mb-2">Furniture Set</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Nov 27, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>10:00 Am</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Rajesh Kumar</span>
                  </div>
                </div>
              </div>
              <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium">
                View All Pickups
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Quantity</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">NGO</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </UserLayout>
  );
}
