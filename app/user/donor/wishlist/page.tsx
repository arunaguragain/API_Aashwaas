"use client";

import React, { useEffect, useState } from "react";
import { handleMyWishlists } from "@/lib/actions/donor/wishlist-actions";
import WishlistItem from "./_components/WishlistItem";
import ConfirmDialog from "@/app/(platform)/_components/ConfirmDialog";
import Link from "next/link";
import { useToast } from "@/app/(platform)/_components/ToastProvider";

export default function MyWishlistPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  let pushToast: ((toast: { title: string; description?: string; tone: any }) => void) | undefined;
  try {
    const _ctx = useToast();
    pushToast = _ctx.pushToast;
  } catch (e) {
    pushToast = undefined;
  }

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    handleMyWishlists()
      .then((res) => {
        if (!mounted) return;
        if (res.success) {
          const fetched = res.data || [];
          // Merge any session-cached wishlist updates (fallback when backend update failed)
          try {
            const merged = fetched.map((it: any) => {
              const idKey = it.id || it._id;
              const raw = sessionStorage.getItem(`wishlistthe _update_${idKey}`);
              if (!raw) return it;
              try {
                const parsed = JSON.parse(raw);
                try {
                  sessionStorage.removeItem(`wishlist_update_${idKey}`);
                } catch (e) {}
                if (pushToast) pushToast({ title: "Donation recorded", description: "Wishlist updated locally. It will sync with server.", tone: "success" });
                return { ...it, ...parsed };
              } catch (e) {
                return it;
              }
            });
            setItems(merged);
          } catch (e) {
            setItems(fetched);
          }
        } else setError(res.message || "Unable to load wishlists");
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
          <WishlistItem
            key={it.id || it._id}
            item={it}
            onRemoved={(id) => setItems((prev) => prev.filter((p) => (p.id || p._id) !== id))}
          />
        ))}
      </div>
    </div>
  );
}
