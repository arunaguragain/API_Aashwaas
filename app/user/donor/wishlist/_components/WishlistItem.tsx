"use client";

import Badge from "@/app/(platform)/_components/Badge";
import Card from "@/app/(platform)/_components/Card";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { WishlistApi } from "@/lib/api/donor/wishlist";
import { useRouter } from "next/navigation";
import ConfirmDialog from "@/app/(platform)/_components/ConfirmDialog";
import { useToast } from "@/app/(platform)/_components/ToastProvider";

export default function WishlistItem({ item, onRemoved }: { item: any; onRemoved?: (id: string) => void }) {
  const router = useRouter();
  let pushToast: ((toast: { title: string; description?: string; tone: any }) => void) | undefined;
  try {
    const _ctx = useToast();
    pushToast = _ctx.pushToast;
  } catch (e) {
    pushToast = undefined;
  }

  const [localItem, setLocalItem] = useState<any>(item);
  useEffect(() => setLocalItem(item), [item]);

  // parse numeric amounts only when present
  const amountNeeded = localItem.amountNeeded == null ? null : Number(localItem.amountNeeded);
  const amountRaised = localItem.amountRaised == null ? null : Number(localItem.amountRaised || 0);
  const remaining = typeof amountNeeded === "number" && amountNeeded > 0 ? Math.max(amountNeeded - (amountRaised ?? 0), 0) : null;
  const isFulfilled = (localItem.status || "").toString().toLowerCase() === "fulfilled" || (remaining !== null && remaining <= 0);

  const [confirmDonateOpen, setConfirmDonateOpen] = useState(false);
  const [donateLoading, setDonateLoading] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const idKey = localItem.id || localItem._id;

  const handleConfirmDonate = async () => {
    setDonateLoading(true);
    try {
      // simple behaviour: mark fulfilled immediately (send both amount fields if available)
      const newRaised = amountNeeded != null ? amountNeeded : (amountRaised ?? 0);
      await WishlistApi.update(idKey, { amountRaised: newRaised, amount: newRaised, status: "fulfilled" });
      setLocalItem((prev: any) => ({ ...prev, amountRaised: newRaised, status: "fulfilled" }));
      if (pushToast) pushToast({ title: "Wishlist updated", description: "Marked as fulfilled.", tone: "success" });
    } catch (e) {
      // fallback: optimistic local update and session cache
      try {
        const merged = { ...(localItem || {}), status: "fulfilled" };
        sessionStorage.setItem(`wishlist_update_${idKey}`, JSON.stringify(merged));
        setLocalItem(merged);
        if (pushToast) pushToast({ title: "Wishlist updated locally", description: "Will sync when possible.", tone: "info" });
      } catch (se) {
        if (pushToast) pushToast({ title: "Failed to update", description: "Could not update wishlist.", tone: "error" });
      }
    } finally {
      setDonateLoading(false);
      setConfirmDonateOpen(false);
      // navigate to donation form with wishlistId
      router.push(`/user/donor/donation?wishlistId=${idKey}`);
    }
  };

  const handleConfirmCancel = async () => {
    setCancelLoading(true);
    try {
      await WishlistApi.remove(idKey);
      if (pushToast) pushToast({ title: "Wishlist removed", tone: "success" });
      if (onRemoved) onRemoved(idKey);
      else router.replace(window.location.pathname);
    } catch (e) {
      console.error(e);
      if (pushToast) pushToast({ title: "Failed to remove", description: "Could not cancel wishlist.", tone: "error" });
    } finally {
      setCancelLoading(false);
      setConfirmCancelOpen(false);
    }
  };

  return (
    <>
      <Card noPadding className="overflow-hidden">
        <div className="p-4 bg-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 pr-4">
              <h3 className="text-base font-semibold text-gray-900">{localItem.title}</h3>
              {localItem.notes && <p className="text-sm text-gray-600 mt-1">{localItem.notes}</p>}

              {amountNeeded !== null && (
                <div className="mt-3 flex items-center gap-3 text-sm text-gray-700">
                  <div>Needed: <span className="font-semibold">{amountNeeded}</span></div>
                  <div>Raised: <span className="font-semibold">{amountRaised ?? 0}</span></div>
                  <div>Remaining: <span className="font-semibold">{remaining ?? 0}</span></div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-end">
              {localItem.plannedDate && <div className="text-xs text-gray-500">Planned: {localItem.plannedDate}</div>}
              <div className="mt-2 flex items-center gap-3">
                <Badge label={localItem.category || "Other"} tone={"silver"} />
                <div className="uppercase text-xs font-semibold text-slate-800">{localItem.status ? (isFulfilled ? "FULFILLED" : localItem.status.toString().slice(0, 10)) : ""}</div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 justify-end">
            {!isFulfilled && (
              <button onClick={() => setConfirmDonateOpen(true)} className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-1 text-sm font-semibold text-white hover:opacity-95">Donate Now</button>
            )}
            {!isFulfilled && (
              <Link href={`/user/donor/wishlist/${idKey}/edit`} className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-800 hover:bg-slate-50">Edit</Link>
            )}
            {!isFulfilled && (
              <button
                onClick={() => setConfirmCancelOpen(true)}
                className="inline-flex items-center rounded-lg border border-rose-200 px-3 py-1 text-sm font-medium text-rose-600 hover:bg-rose-50"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </Card>

      <ConfirmDialog
        open={confirmDonateOpen}
        title="Proceed to Donate?"
        description="We'll mark this wishlist as fulfilled and take you to the donation form. Continue?"
        onCancel={() => setConfirmDonateOpen(false)}
        onConfirm={handleConfirmDonate}
        confirmLabel={donateLoading ? "Processing…" : "Proceed"}
        cancelLabel="Back"
        loading={donateLoading}
      />

      <ConfirmDialog
        open={confirmCancelOpen}
        title="Cancel wishlist?"
        description="This will remove the wishlist item. Are you sure?"
        onCancel={() => setConfirmCancelOpen(false)}
        onConfirm={handleConfirmCancel}
        confirmLabel={cancelLoading ? "Cancelling…" : "cancel wishlist"}
        cancelLabel="cancel"
        loading={cancelLoading}
      />
    </>
  );
}
