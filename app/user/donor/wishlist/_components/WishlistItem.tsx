"use client";

import Badge from "@/app/(platform)/_components/Badge";
import Card from "@/app/(platform)/_components/Card";
import Link from "next/link";
import React from "react";

export default function WishlistItem({ item }: { item: any }) {
  const remaining = (Number(item.amountNeeded || 0) - Number(item.amountRaised || 0)) || 0;
  const isFulfilled = (item.status || '').toString().toLowerCase() === 'fulfilled' || remaining <= 0;
  return (
    <Card noPadding className="overflow-hidden">
      <div className="p-4 bg-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.notes}</p>
            <div className="mt-3 flex items-center gap-3 text-sm text-gray-700">
              <div>Needed: <span className="font-semibold">{item.amountNeeded ?? '—'}</span></div>
              <div>Raised: <span className="font-semibold">{item.amountRaised ?? 0}</span></div>
              <div>Remaining: <span className="font-semibold">{remaining}</span></div>
            </div>
          </div>
          <div className="ml-4 text-right">
            <div className="text-xs text-gray-500">Planned: {item.plannedDate}</div>
            <div className="mt-2">
              <Badge label={item.category || "Other"} tone={"silver"} />
            </div>
            {!isFulfilled && (
              <div className="mt-4">
                <Link href={`/user/donor/donation?wishlistId=${item.id || item._id}`} className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-1 text-sm font-semibold text-white hover:opacity-95">Donate Now</Link>
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
          <div>{item.donorId?.name ?? item.donorId ?? "You"}</div>
          <div className="uppercase text-xs font-semibold">{isFulfilled ? 'FULFILLED' : (item.status || "active").slice(0, 10)}</div>
        </div>
      </div>
    </Card>
  );
}
