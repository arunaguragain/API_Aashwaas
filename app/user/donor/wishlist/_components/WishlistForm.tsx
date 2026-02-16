"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { handleCreateWishlist, handleGetWishlist, handleUpdateWishlist } from "@/lib/actions/donor/wishlist-actions";
import { WishlistModel } from "@/app/(platform)/wishlists/schemas";

type Props = { wishlistId?: string | null; onSuccess?: () => void };

export default function WishlistForm({ wishlistId, onSuccess }: Props) {
  const router = useRouter();
  const params = useParams();
  const effectiveId = wishlistId ?? (params && (params as any).id) ?? null;

  const initial: Omit<WishlistModel, "id"> = {
    title: "",
    category: "Other",
    plannedDate: "",
    notes: "",
    donorId: "",
    status: "active",
  };

  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!effectiveId) return;
    setLoadingItem(true);
    handleGetWishlist(effectiveId)
      .then((res) => {
        if (res.success && res.data) {
          const raw = res.data as any;
          const donorId = raw?.donorId && typeof raw.donorId === "object" ? (raw.donorId.id ?? raw.donorId._id ?? String(raw.donorId)) : raw?.donorId;
          setForm((prev) => ({ ...prev, ...raw, donorId }));
        } else setError(res.message || "Failed to load wishlist");
      })
      .catch((e) => setError(e?.message || "Failed to load wishlist"))
      .finally(() => setLoadingItem(false));
  }, [effectiveId]);

  const handleChange = (e: any) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let res;
      if (effectiveId) res = await handleUpdateWishlist(effectiveId, form);
      else res = await handleCreateWishlist(form);
      if (res.success) {
        if (onSuccess) onSuccess();
        else router.push("/user/donor/wishlist");
        const payload = { ...form } as any;
        if (payload.donorId && typeof payload.donorId === "object") payload.donorId = payload.donorId.id ?? payload.donorId._id ?? String(payload.donorId);
        let res2;
        if (effectiveId) res2 = await handleUpdateWishlist(effectiveId, payload);
        else res2 = await handleCreateWishlist(payload);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{effectiveId ? "Edit Wishlist" : "Add Wishlist"}</h1>
        <p className="text-sm text-gray-600">{effectiveId ? "Update wishlist item" : "Create a new wishlist item"}</p>
      </div>

      {error && <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">{error}</div>}

      <form onSubmit={handleSubmit} className="relative space-y-6 rounded-xl border border-gray-200 bg-white p-6">
          {(loading || loadingItem) && (
            <div className="absolute inset-0 z-10 flex items-start justify-center bg-white/70 p-6">
              <div className="w-full max-w-3xl animate-pulse">
                <div className="h-6 w-1/3 rounded bg-gray-200" />
                <div className="mt-4 h-8 w-full rounded bg-gray-200" />
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div className="h-8 rounded bg-gray-200" />
                  <div className="h-8 rounded bg-gray-200" />
                </div>
                <div className="mt-3 h-40 rounded bg-gray-200" />
              </div>
            </div>
          )}

        <div>
          <label className="text-sm font-semibold text-gray-900">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm disabled:opacity-70"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-gray-900">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm disabled:opacity-70"
            >
              <option>Clothes</option>
              <option>Books</option>
              <option>Electronics</option>
              <option>Furniture</option>
              <option>Food</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900">Planned Date</label>
            <input
              type="date"
              name="plannedDate"
              value={form.plannedDate || ""}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm disabled:opacity-70"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-900">Notes</label>
          <textarea
            name="notes"
            value={form.notes || ""}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm disabled:opacity-70"
          />
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={loading} className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-70">
            {loading ? (effectiveId ? "Saving..." : "Adding...") : (effectiveId ? "Save changes" : "Add Wishlist")}
          </button>
          <Link href="/user/donor/wishlist" className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
