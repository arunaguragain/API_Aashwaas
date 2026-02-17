
"use client";

import { TrendingUp, Award, Package } from "lucide-react";
import { useMemo, useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { fetchVolunteerTasks } from '@/lib/actions/volunteer/task-actions';
import { VolunteerTask } from '@/app/(platform)/tasks/schemas';
import { useAuth } from '@/context/AuthContext';

export default function VolunteerDashboard() {

  const auth = useAuth();
  const [tasks, setTasks] = useState<VolunteerTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await fetchVolunteerTasks();
        if (!mounted) return;
        setTasks(data || []);
        setError(null);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || 'Failed to load tasks');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  // Prefer values from profile (auth.user) when available; otherwise compute from tasks
  const totalTasks = auth.user?.totalTasks ?? tasks.length;
  const impactPoints = auth.user?.impactPoints ?? (tasks.filter(t => t.status === 'completed').length * 10);
  const completedTasks = auth.user?.completedTasks ?? tasks.filter(t => t.status === 'completed').length;
  const upcoming = tasks.filter(t => (t.status === 'assigned' || t.status === 'accepted')).length;

  const chartData = useMemo(() => {
    const map: Record<string, number> = {};
    tasks.forEach(t => {
      const d = new Date(t.createdAt || t.assignedAt || t.updatedAt || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      map[d] = (map[d] || 0) + 1;
    });
    return Object.entries(map).map(([name, Tasks]) => ({ name, Tasks }));
  }, [tasks]);

  const pieData = useMemo(() => {
    const map: Record<string, number> = {};
    tasks.forEach(t => { map[t.status] = (map[t.status] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [tasks]);

  const PIE_COLORS = ['#1E3A8A', '#7C3AED', '#06B6D4', '#F59E0B'];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Volunteer Dashboard</h1>
      <p className="text-sm text-gray-600 mb-4">Welcome back, here's a quick summary of your volunteer impact.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-500">Tasks Completed</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{completedTasks}</p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-yellow-600" />
            <span className="text-sm text-gray-500">Impact Points</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{impactPoints}</p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-500">Upcoming Shifts</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{upcoming}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Tasks Overview</h2>
            <div className="text-sm text-gray-500">Recent</div>
          </div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="taskColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.85} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0.06} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fill: '#64748b' }} />
                <YAxis tick={{ fill: '#64748b' }} />
                <CartesianGrid strokeDasharray="3 3" stroke="#e6edf6" />
                <Tooltip formatter={(v: any) => [v, 'Tasks']} />
                <Area type="monotone" dataKey="Tasks" stroke="#10B981" strokeWidth={2} fill="url(#taskColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Task Categories</h3>
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
}
