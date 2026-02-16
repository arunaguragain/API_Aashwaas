"use client";

import { Heart, TrendingUp, Award, Calendar, Package, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { handleListDonorDonations } from "@/lib/actions/donor/donation-actions";

type Donation = {
  _id: string;
  itemName: string;
  category: string;
  quantity: number;
  ngoId?: string;
  status: string;
  pickupDate?: string;
  pickupTime?: string;
  pickupLocation?: string;
};

const DonorDashboardPage = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userName = "Aruna";

  useEffect(() => {
    async function fetchDonations() {
      setLoading(true);
      const res = await handleListDonorDonations();
      if (res.success) {
        setDonations(
          (res.data ?? []).map((d: any) => ({
            ...d,
            quantity: typeof d.quantity === "string" ? Number(d.quantity) : d.quantity,
          }))
        );
        setError("");
      } else {
        setError(res.message || "Failed to load donations");
      }
      setLoading(false);
    }
    fetchDonations();
  }, []);

  // Calculate stats
  const totalDonations = donations.length;
  // Example: Impact score calculation (replace with real logic)
  const impactScore = totalDonations * 10;
  // Example: Trends (replace with real chart logic)
  const monthlyTrends = Array(12).fill(0);
  donations.forEach(d => {
    // Example: count per month (replace with real date parsing)
    // monthlyTrends[monthIndex] += 1;
  });

  // Example: Upcoming pickups (filter donations with status 'assigned' or 'pending')
  const upcomingPickups = donations.filter(d => d.status === "assigned" || d.status === "pending");

  // Example: Recent donations (last 5)
  const recentDonations = donations.slice(0, 5);

  return (
    <>
      {/* Welcome & About Section */}
      <div className="mb-8 flex flex-col md:flex-row items-center gap-8">
        <img src="/images/aashwaas_logo.png" alt="Aashwaas Logo" className="w-32 h-32 rounded-full shadow-md" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Aashwaas, {userName}!</h1>
          <p className="text-gray-600 mb-4">Aashwaas is a platform connecting donors, volunteers, and NGOs to make a real impact. Start your journey by exploring donations, NGOs, and your profile.</p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold" onClick={() => window.location.href='/user/donor/donation'}>Donate Now</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold" onClick={() => window.location.href='/user/donor/my-donations'}>My Donations</button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold" onClick={() => window.location.href='/user/donor/ngos'}>Explore NGOs</button>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <img src="/images/gallery1.jpg" alt="Gallery 1" className="rounded-xl shadow-md w-full h-48 object-cover" />
        <img src="/images/gallery2.jpg" alt="Gallery 2" className="rounded-xl shadow-md w-full h-48 object-cover" />
        <img src="/images/gallery3.jpg" alt="Gallery 3" className="rounded-xl shadow-md w-full h-48 object-cover" />
      </div>

      {/* Basic Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
          <Package className="w-8 h-8 text-blue-600 mb-2" />
          <p className="text-sm text-gray-500 mb-2">Total Donations</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{totalDonations}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
          <Award className="w-8 h-8 text-yellow-600 mb-2" />
          <p className="text-sm text-gray-500 mb-2">Impact Score</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{impactScore}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
          <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
          <p className="text-sm text-gray-500 mb-2">Active Pickups</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{upcomingPickups.length}</p>
        </div>
      </div>

      {/* Recent Donations Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Donations</h2>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => window.location.href='/user/donor/my-donations'}>
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Item</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Quantity</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">NGO</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((donation) => (
                  <tr key={donation._id} className="border-b border-gray-100">
                    <td className="py-4 px-4 text-sm text-gray-900">{donation.itemName}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{donation.category}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{donation.quantity}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{donation.ngoId || "N/A"}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${donation.status === "completed" ? "bg-green-100 text-green-700" : donation.status === "pending" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default DonorDashboardPage;
