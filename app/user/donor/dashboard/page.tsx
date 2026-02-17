"use client";

import { TrendingUp, Award, Package } from "lucide-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { handleListDonorDonations } from "@/lib/actions/donor/donation-actions";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

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
  const impactScore = totalDonations * 10;
  const upcomingPickups = donations.filter(d => d.status === "assigned" || d.status === "pending");

  const formatDate = (d?: string) => {
    if (!d) return "TBD";
    try {
      const dt = new Date(d);
      return dt.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    } catch {
      return d;
    }
  };

  // Build chart data for last N days
  const buildChartData = useCallback((items: Donation[], days = 30) => {
    const out: { name: string; Donations: number }[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toDateString();
      const sum = items.reduce((s, it) => {
        const created = it.pickupDate || it.pickupTime || (it as any).createdAt;
        if (!created) return s;
        const dt = new Date(created).toDateString();
        if (dt === key) return s + (Number(it.quantity) || 0);
        return s;
      }, 0);
      out.push({ name: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), Donations: sum });
    }
    return out;
  }, []);

  const chartData = useMemo(() => buildChartData(donations, 30), [donations, buildChartData]);

  const pieData = useMemo(() => {
    const map: Record<string, number> = {};
    donations.forEach(d => {
      const key = d.category || 'Other';
      map[key] = (map[key] || 0) + (Number(d.quantity) || 0);
    });
    return Object.entries(map).slice(0, 6).map(([name, value]) => ({ name, value }));
  }, [donations]);
  const PIE_COLORS = ['#1E3A8A', '#7C3AED', '#06B6D4', '#F59E0B', '#10B981', '#EF4444'];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Donor Dashboard</h1>
      <p className="text-sm text-gray-600 mb-4">A quick summary of your recent activity and impact.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-500">Total Donations</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{totalDonations}</p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-yellow-600" />
            <span className="text-sm text-gray-500">Impact Score</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{impactScore}</p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-500">Growth</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{upcomingPickups.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Donations Overview</h2>
            <div className="text-sm text-gray-500">Last 30 days</div>
          </div>
          <div style={{ height: 260 }}>
            {loading ? (
              <div className="flex items-center justify-center h-full text-gray-500">Loading chart…</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="donColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.85} />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.06} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fill: '#64748b' }} />
                  <YAxis tick={{ fill: '#64748b' }} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#e6edf6" />
                  <Tooltip formatter={(v: any) => [v, 'Items']} />
                  <Area type="monotone" dataKey="Donations" stroke="#4f46e5" strokeWidth={2} fill="url(#donColor)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Donation Breakdown</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width={260} height={240}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={36}>
                  {pieData.map((entry, idx) => (
                    <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            {pieData.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span style={{ width: 12, height: 12, background: PIE_COLORS[i % PIE_COLORS.length], display: 'inline-block', borderRadius: 3 }} />
                <span>{p.name} ({p.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboardPage;
