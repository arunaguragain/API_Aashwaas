"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import type { NgoModel } from "@/app/admin/ngos/schemas";
import { AdminNGOsApi, resolveNgoPhotoUrl } from "@/lib/api/admin/ngos";


export default function AdminNGODetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [ngo, setNgo] = useState<NgoModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Missing NGO id.");
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    setError(null);
    AdminNGOsApi.adminGetById(id)
      .then((result: { data: NgoModel }) => {
        if (!active) return;
        setNgo(result.data);
      })
      .catch(() => {
        if (!active) return;
        setError("Unable to load NGO details.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">Loading NGO...</div>;
  }

  if (error || !ngo) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-600">{error ?? "NGO not found."}</p>
        <Link href="/admin/ngos" className="mt-4 inline-flex text-sm font-semibold text-blue-600">
          Back to NGOs
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{ngo.name}</h1>
          <p className="text-sm text-gray-500">Registration: {ngo.registrationNumber}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/ngos/${ngo.id}/edit`}
            className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Edit
          </Link>
          <Link
            href="/admin/ngos"
            className="inline-flex items-center rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
          >
            Back to list
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Contact</h2>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>Contact person: {ngo.contactPerson}</p>
            <p>Email: {ngo.email}</p>
            <p>Phone: {ngo.phone}</p>
            <p>Address: {ngo.address}</p>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Details</h2>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>Focus areas: {ngo.focusAreas.join(", ")}</p>
            <p>Photo: {ngo.image ? "" : "None"}</p>
          </div>
          {ngo.image && (
            <div className="mt-4">
              <img
                src={resolveNgoPhotoUrl(ngo.image)}
                alt="NGO photo"
                className="h-40 w-full rounded-lg object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
