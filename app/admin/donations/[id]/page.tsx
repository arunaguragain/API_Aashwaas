"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AdminDonationsApi } from "@/lib/api/admin/donations";
import Badge from "@/app/(platform)/_components/Badge";
import Skeleton from "@/app/(platform)/_components/Skeleton";
import { useToast } from "@/app/(platform)/_components/ToastProvider";
import axios from "@/lib/api/axios";
import { getUsers, getUserById } from "@/lib/api/admin/user";
import { AdminNGOsApi } from "@/lib/api/admin/ngos";
import ConfirmDialog from "@/app/(platform)/_components/ConfirmDialog";

export default function AdminDonationDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { pushToast } = useToast();

  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [volunteerId, setVolunteerId] = useState("");
  const [ngoId, setNgoId] = useState("");
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [ngos, setNgos] = useState<any[]>([]);
  const [donorName, setDonorName] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  // Always fetch donor name if missing, matching table logic
  useEffect(() => {
    if (!item) return;
    // 1. donorName direct
    if (item.donorName) {
      setDonorName(item.donorName);
      return;
    }
    // 2. donorId or donor as populated object
    const donorObj = (item.donorId && typeof item.donorId === 'object') ? item.donorId :
                     (item.donor && typeof item.donor === 'object' ? item.donor : null);
    if (donorObj) {
      setDonorName(donorObj.name || donorObj.fullName || donorObj.email || donorObj._id || "—");
      return;
    }
    // 3. donorId or donor as string (ObjectId)
    const donorIdToFetch = typeof item.donorId === 'string' ? item.donorId :
                          (typeof item.donor === 'string' ? item.donor : null);
    if (donorIdToFetch) {
      getUserById(donorIdToFetch)
        .then((user: any) => setDonorName(user?.name || user?.fullName || user?.email || user?._id || "—"))
        .catch(() => setDonorName("—"));
      return;
    }
    // 4. fallback
    setDonorName("—");
  }, [item]);

  useEffect(() => {
    // Fetch volunteers (users with role 'volunteer')
    getUsers().then((data: any) => {
      const all = Array.isArray(data.data) ? data.data : data;
      setVolunteers(
        all.filter((u: any) => u.role === 'volunteer')
      );
    }).catch(() => setVolunteers([]));

    // Fetch NGOs
    AdminNGOsApi.adminList().then((res) => {
      setNgos(res.data || []);
    }).catch(() => setNgos([]));
  }, []);

  if (loading) return <Skeleton className="h-72" />;
  if (error || !item)
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 max-w-4xl mx-auto">
        <h1 className="font-display text-3xl text-gray-900">Donation not found</h1>
        <p className="mt-2 text-sm text-gray-600">{error ?? "Try again later."}</p>
        <Link href="/admin/donations" className="mt-6 inline-flex text-sm font-semibold text-blue-600">Back to donations</Link>
      </div>
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

  const handleDeleteConfirmed = async () => {
    setDeleting(true);
    try {
      await AdminDonationsApi.remove(id);
      pushToast({ title: 'Donation removed', description: '', tone: 'success' });
      router.push('/admin/donations');
    } catch (e: any) {
      pushToast({ title: 'Unable to remove donation', description: e?.message || '', tone: 'error' });
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  const handleAssignVolunteer = async () => {
    if (!volunteerId) {
      pushToast({ title: 'Please select a volunteer', description: '', tone: 'error' });
      return;
    }
    try {
      await AdminDonationsApi.assign(id, volunteerId);
      pushToast({ title: 'Volunteer assigned', description: '', tone: 'success' });
      load();
    } catch (e: any) {
      pushToast({ title: 'Unable to assign volunteer', description: e?.message || '', tone: 'error' });
    }
  };

  // Suggest NGOs based on focus area/category
  const suggestedNgos = ngos.filter((ngo) => {
    if (!item.category || !ngo.focusAreas) return false;
    return Array.isArray(ngo.focusAreas)
      ? ngo.focusAreas.some((fa: string) => fa.toLowerCase() === item.category?.toLowerCase())
      : false;
  });
  // Suggest volunteers based on city (or fallback to all volunteers)
  const suggestedVolunteers = volunteers.filter((v) => {
    if (!item.city) return true;
    return v.city && v.city.toLowerCase() === item.city.toLowerCase();
  });
  // If no city match, show all
  const volunteerOptions = suggestedVolunteers.length > 0 ? suggestedVolunteers : volunteers;
  const ngoOptions = suggestedNgos.length > 0 ? suggestedNgos : ngos;

  return (
    <>
      <ConfirmDialog
        open={confirmOpen}
        title="Confirm delete"
        description="Are you sure you want to delete this donation? This action cannot be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirmed}
        loading={deleting}
      />
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{item.title || item.itemName}</h1>
            <p className="text-sm text-gray-500">Donation ID: {item._id || item.id}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/donations" className="inline-flex items-center rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50">Back to list</Link>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="grid gap-0 md:[grid-template-columns:320px_1fr] items-start">
            <div className="max-w-[320px]">
              <h2 className="text-lg font-semibold text-gray-900">Details</h2>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p><span className="font-medium text-gray-900">Donor:</span> {
                  donorName
                  || (typeof item?.donorId === 'string' ? item.donorId : undefined)
                  || (typeof item?.donor === 'string' ? item.donor : undefined)
                  || (item?.donor && typeof item.donor === 'object' ? (item.donor.name || item.donor.email || item.donor._id) : undefined)
                  || "—"
                }</p>
                <p><span className="font-medium text-gray-900">Pickup location:</span> {item.city || item.pickupLocation || 'Not provided'}</p>
                <p><span className="font-medium text-gray-900">NGO:</span> {item.ngoName || 'To be assigned'}</p>
                <p><span className="font-medium text-gray-900">Category:</span> {item.category}</p>
                <p><span className="font-medium text-gray-900">Condition:</span> {item.condition}</p>
                <p><span className="font-medium text-gray-900">Quantity:</span> {item.quantity}</p>
                <p><span className="font-medium text-gray-900">Description:</span> {item.description}</p>
              </div>

              {/* Action buttons inside card */}
              <div className="mt-6 flex flex-wrap gap-2">
                {item.status && <Badge tone={item.status} label={String(item.status)} />}
                {item.status === 'pending' && (
                  <button onClick={handleApprove} className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white">Approve</button>
                )}
                <button onClick={() => setConfirmOpen(true)} className="inline-flex items-center rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white">Delete</button>
              </div>

              {/* Volunteer assignment section */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign Volunteer</label>
                <div className="flex gap-2">
                  <select value={volunteerId} onChange={e => setVolunteerId(e.target.value)} className="rounded border border-gray-300 px-2 py-1 text-sm">
                    <option value="">Select volunteer</option>
                    {volunteerOptions.map(v => (
                      <option key={v._id || v.id} value={v._id || v.id}>
                        {v.name || v.fullName || v.email || v._id || v.id}
                      </option>
                    ))}
                  </select>
                  <button onClick={handleAssignVolunteer} className="rounded bg-sky-600 px-3 py-1 text-sm text-white">Assign</button>
                </div>
              </div>

              {/* NGO assignment section */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign NGO</label>
                <div className="flex gap-2">
                  <select value={ngoId} onChange={e => setNgoId(e.target.value)} className="rounded border border-gray-300 px-2 py-1 text-sm">
                    <option value="">Select NGO</option>
                    {ngoOptions.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
                  </select>
                  <button onClick={handleAssignVolunteer} className="rounded bg-sky-600 px-3 py-1 text-sm text-white">Assign</button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">Photo</h2>
              <div className="mt-4">
                {item.media ? (
                  <div className="rounded-lg overflow-hidden bg-slate-50 max-w-[320px] mx-auto">
                    <img
                      src={`${(axios.defaults && (axios.defaults as any).baseURL ? (axios.defaults as any).baseURL : "http://localhost:5050")}/item_photos/${item.media}`}
                      alt={item.title || item.itemName || "Donation image"}
                      className="w-full h-48 object-cover cursor-pointer"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No photo available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
