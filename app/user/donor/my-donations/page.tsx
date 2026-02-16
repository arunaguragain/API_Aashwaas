"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/api/axios";
import Link from "next/link";

type Donation = {
  _id?: string;
  itemName?: string;
  category?: string;
  description?: string;
  quantity?: string;
  condition?: string;
  pickupLocation?: string;
  media?: string;
  status?: string;
  createdAt?: string;
};

export default function MyDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchMyDonations() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/api/donations/my");
        const data = (res.data && (res.data.data ?? res.data)) || [];
        if (mounted) setDonations(Array.isArray(data) ? data : []);
      } catch (err: any) {
        if (mounted) setError(err?.response?.data?.message || err.message || "Failed to load donations");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchMyDonations();
    return () => { mounted = false };
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Donations</h1>
          <p className="text-sm text-gray-600">Items you've donated</p>
        </div>
        <div>
          <Link href="/user/donor/donation" className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Add Donation
          </Link>
        </div>
      </div>

      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-rose-600">{error}</div>}

      {!loading && donations.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-700">You haven't added any donations yet.</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {donations.map((d) => (
          <div key={d._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            {d.media ? (
              <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5050'}/item_photos/${d.media}`} alt={d.itemName || 'photo'} className="h-40 w-full object-cover rounded-md mb-3" />
            ) : (
              <div className="h-40 w-full rounded-md bg-gray-100 mb-3 flex items-center justify-center text-gray-400">No image</div>
            )}
            <h2 className="text-lg font-semibold">{d.itemName}</h2>
            <p className="text-sm text-gray-500">{d.category} • {d.condition}</p>
            <p className="mt-2 text-sm text-gray-700 truncate">{d.description}</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="text-gray-600">Qty: {d.quantity}</div>
              <div className="text-gray-600">{new Date(d.createdAt || '').toLocaleDateString()}</div>
            </div>
            <div className="mt-3 flex gap-2">
              <Link href={`/user/donor/donation/${d._id}`} className="text-sm text-sky-600">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
