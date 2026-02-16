"use client";

import Badge from "@/app/(platform)/_components/Badge";
import Card from "@/app/(platform)/_components/Card";

import React from "react";


export default function WishlistItem({ item }: { item: any }) {
  return (
    <Card noPadding className="overflow-hidden">
      <div className="p-4 bg-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.notes}</p>
          </div>
          <div className="ml-4 text-right">
            <div className="text-xs text-gray-500">Planned: {item.plannedDate}</div>
            <div className="mt-2">
              <Badge label={item.category || "Other"} tone={"silver"} />
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
          <div>{item.donorId?.name ?? item.donorId ?? "You"}</div>
          <div className="uppercase text-xs font-semibold">{(item.status || "active").slice(0, 10)}</div>
        </div>
      </div>
    </Card>
  );
}
