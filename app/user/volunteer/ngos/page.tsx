"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/api/axios";
import { API } from "@/lib/api/endpoints";
import NgoCard from "../../../(platform)/_components/NgoCard";

export default function Page() {
  const [ngos, setNgos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchNgos = async () => {
      try {
        const res = await axios.get(API.NGO.LIST);
        const payload = res?.data;
        const data = Array.isArray(payload) ? payload : payload?.data ?? [];
        if (mounted) setNgos(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Failed to load NGOs", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchNgos();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">NGO Directory</h1>
          <p className="text-sm text-gray-500">Browse NGOs registered on the platform</p>
        </div>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading NGOs...</div>
      ) : ngos.length === 0 ? (
        <div className="text-gray-500">No NGOs found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ngos.map((ngo: any) => (
            <NgoCard key={ngo.id || ngo._id || ngo.name} ngo={ngo} />
          ))}
        </div>
      )}
    </div>
  );
}
