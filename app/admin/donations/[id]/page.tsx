"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AdminDonationsApi } from "@/lib/api/admin/donations";
import Card from "@/app/(platform)/_components/Card";
import Badge from "@/app/(platform)/_components/Badge";
import Skeleton from "@/app/(platform)/_components/Skeleton";
import { useToast } from "@/app/(platform)/_components/ToastProvider";

export default function AdminDonationDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { pushToast } = useToast();

  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    AdminDonationsApi.getById(id)
      .then((res: { data: any }) => setItem(res.data))
      .catch(() => setError("Donation details are not available right now."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!id) return;
    load();
  }, [id]);

  if (loading) return <Skeleton className="h-72" />;
  if (error || !item)
    return (
      <Card>
        <h1 className="font-display text-3xl text-(--cocoa-900)">Donation not found</h1>
        <p className="mt-2 text-sm text-(--cocoa-700)">{error ?? "Try again later."}</p>
        <Link href="/admin/donations" className="mt-6 inline-flex text-sm font-semibold text-(--cocoa-900)">
          Back to donations
        </Link>
      </Card>
    );

  const handleApprove = async () => {
    try {
      await AdminDonationsApi.approve(id);
      pushToast({ title: 'Donation approved', description: '', tone: 'success' });
      load();
    } catch (e: any) {
      pushToast({ title: 'Unable to approve', description: e?.message || '', tone: 'error' });
    }
  };

  const handleAssign = async () => {
    const volunteerId = window.prompt('Enter volunteer id to assign to this donation');
    if (!volunteerId) return;
    try {
      await AdminDonationsApi.assign(id, volunteerId);
      pushToast({ title: 'Volunteer assigned', description: '', tone: 'success' });
      load();
    } catch (e: any) {
      pushToast({ title: 'Unable to assign volunteer', description: e?.message || '', tone: 'error' });
    }
  };

  const handleDelete = async () => {
    const ok = window.confirm('Delete this donation?');
    if (!ok) return;
    try {
      await AdminDonationsApi.remove(id);
      pushToast({ title: 'Donation removed', description: '', tone: 'success' });
      router.push('/admin/donations');
    } catch (e: any) {
      pushToast({ title: 'Unable to remove donation', description: e?.message || '', tone: 'error' });
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-(--cocoa-700)">Donation detail</p>
          <h1 className="font-display text-4xl text-(--cocoa-900)">{item.title || item.itemName}</h1>
          <p className="mt-2 text-sm text-(--cocoa-700)">{item.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge tone={item.status} label={String(item.status)} />
          {item.status === 'pending' && (
            <button onClick={handleApprove} className="inline-flex items-center rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white">Approve</button>
          )}
          <button onClick={handleAssign} className="inline-flex items-center rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white">Assign volunteer</button>
          <button onClick={handleDelete} className="inline-flex items-center rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white">Delete</button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-display text-2xl text-(--cocoa-900)">Pickup details</h2>
          <div className="mt-4 space-y-3 text-sm text-(--cocoa-700)">
            <p><span className="font-semibold text-(--cocoa-900)">Donor:</span> {item.donorName}</p>
            <p><span className="font-semibold text-(--cocoa-900)">Location:</span> {item.city || item.pickupLocation}</p>
            <p><span className="font-semibold text-(--cocoa-900)">Pickup window:</span> {item.pickupWindow || 'Not provided'}</p>
            <p><span className="font-semibold text-(--cocoa-900)">NGO:</span> {item.ngoName || 'To be assigned'}</p>
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-2xl text-(--cocoa-900)">Donation summary</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#ead8c5] bg-white px-4 py-3 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-(--cocoa-700)">Category</p>
              <p className="mt-1 font-semibold text-(--cocoa-900)">{item.category}</p>
            </div>
            <div className="rounded-2xl border border-[#ead8c5] bg-white px-4 py-3 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-(--cocoa-700)">Condition</p>
              <p className="mt-1 font-semibold text-(--cocoa-900)">{item.condition}</p>
            </div>
            <div className="rounded-2xl border border-[#ead8c5] bg-white px-4 py-3 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-(--cocoa-700)">Quantity</p>
              <p className="mt-1 font-semibold text-(--cocoa-900)">{item.quantity}</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
