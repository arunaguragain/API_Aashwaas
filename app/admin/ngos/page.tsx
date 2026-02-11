"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { NgoType } from "@/app/admin/ngos/schemas";
import { AdminNGOsApi } from "@/lib/api/admin/ngos";
type NGO = NgoType & { id: string; createdAt?: string; updatedAt?: string; image?: string };

export default function AdminNGOPage() {
  const [items, setItems] = useState<NGO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"api" | "mock">("api");

  const load = () => {
    setLoading(true);
    setError(null);
    AdminNGOsApi.adminList()
      .then((result) => {
        setItems(result.data);
        setSource(result.source);
      })
      .catch(() => {
        setError("Unable to load NGOs.");
        setItems([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Delete this NGO? This action cannot be undone.");
    if (!ok) return;
    try {
      await AdminNGOsApi.adminRemove(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setError("Unable to delete NGO right now.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">NGO Management</h1>
          <p className="text-sm text-gray-500">Create, review, and maintain NGO profiles</p>
        </div>
        <Link
          href="/admin/ngos/create"
          className="inline-flex items-center rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
        >
          Add NGO
        </Link>
      </div>

      {source === "mock" && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Live data is unavailable. Showing offline NGO records.
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Reg. No.</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td className="px-6 py-6 text-sm text-gray-500" colSpan={6}>
                  Loading NGOs...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td className="px-6 py-6 text-sm text-gray-500" colSpan={6}>
                  No NGOs found.
                </td>
              </tr>
            ) : (
              items.map((ngo) => (
                <tr key={ngo.id} className="text-sm text-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900">{ngo.name}</td>
                  <td className="px-6 py-4">{ngo.registrationNumber}</td>
                  <td className="px-6 py-4">{ngo.contactPerson}</td>
                  <td className="px-6 py-4">{ngo.phone}</td>
                  <td className="px-6 py-4">{ngo.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/ngos/${ngo.id}`} className="text-blue-600 hover:underline">
                        View
                      </Link>
                      <Link href={`/admin/ngos/${ngo.id}/edit`} className="text-gray-600 hover:underline">
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(ngo.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
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
