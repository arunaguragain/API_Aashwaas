import React from "react";
import Card from "./Card";
import { resolveNgoPhotoUrl } from "@/lib/api/admin/ngos";

type Ngo = {
  id?: string;
  name?: string;
  address?: string;
  image?: string;
  [key: string]: any;
};

export default function NgoCard({ ngo }: { ngo: Ngo }) {
  const img = resolveNgoPhotoUrl(ngo?.image || ngo?.photo || "");
  return (
    <Card className="flex items-center gap-4">
      <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={ngo?.name || "ngo"} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">No Image</div>
        )}
      </div>
      <div className="flex-1">
        <div className="text-lg font-semibold text-gray-800">{ngo?.name || "Unnamed NGO"}</div>
        {ngo?.address ? (
          <div className="text-sm text-gray-500 mt-1">{ngo.address}</div>
        ) : null}
      </div>
    </Card>
  );
}
