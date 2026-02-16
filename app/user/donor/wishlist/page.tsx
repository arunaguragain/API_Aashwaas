"use client";

import React, { useEffect, useState } from "react";
import { handleMyWishlists } from "@/lib/actions/donor/wishlist-actions";
import WishlistItem from "./_components/WishlistItem";
import ConfirmDialog from "@/app/(platform)/_components/ConfirmDialog";
import Link from "next/link";

export default function MyWishlistPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    handleMyWishlists()
      .then((res) => {
        if (!mounted) return;
        if (res.success) setItems(res.data || []);
        else setError(res.message || "Unable to load wishlists");
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e?.message || "Unable to load wishlists");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Wishlist</h1>
          <p className="text-sm text-gray-600">Items you have saved</p>
        </div>
        <div>
          <Link href="/user/donor/wishlist/new" className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Add Wishlist
          </Link>
        </div>
      </div>

      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-rose-600">{error}</div>}

      {!loading && items.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-700">Your wishlist is empty.</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {items.map((it) => (
          <WishlistItem key={it.id || it._id} item={it} />
        ))}
      </div>
    </div>
  );
}
