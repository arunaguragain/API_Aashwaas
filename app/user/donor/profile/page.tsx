"use client";
import React, { useEffect } from "react";
import axios from "@/lib/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { handleListDonorDonations } from "@/lib/actions/donor/donation-actions";

export default function DonorProfile() {
  const auth = useAuth();
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [editData, setEditData] = React.useState<any>(null);
  const [editLoading, setEditLoading] = React.useState(false);
  const [editError, setEditError] = React.useState("");
  const [editing, setEditing] = React.useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchUser() {
      setLoading(true);
      setError("");
      try {
        const res = await import("@/lib/actions/auth-actions").then(m => m.handleWhoAmI());
        if (res.success) {
          if (mounted) setUser(res.data);
        } else {
          if (mounted) setError(res.message || "Failed to fetch user data");
        }
      } catch (err: any) {
        if (mounted) setError(err.message || "Failed to fetch user data");
      }
      if (mounted) setLoading(false);
    }

    if (auth.user) {
      setUser(auth.user);
      setLoading(false);
    } else {
      fetchUser();
    }

    return () => { mounted = false };
  }, [auth.user]);

  // Compute donation aggregates client-side and merge into user state.
  useEffect(() => {
    let mounted = true;
    const computeTotals = async () => {
      if (!user) return;
      try {
        const donorId = user._id || user.id;
        // Try server-side filtered list first
        let res = await handleListDonorDonations({ donorId });
        let donations: any[] = [];
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          // If server returned results, ensure they belong to this donor. If not, apply client-side filter.
          const allReturned = res.data as any[];
          const extractId = (d: any) => {
            if (!d) return null;
            // donorId may be a string or an object like { _id } or { id }
            const cand = d.donorId ?? d.donor ?? d.donor_id ?? d.user;
            if (!cand) return null;
            if (typeof cand === "string") return cand;
            if (typeof cand === "number") return String(cand);
            if (typeof cand === "object") return cand._id || cand.id || null;
            return null;
          };
          const allMatch = allReturned.every((d: any) => {
            const did = extractId(d);
            return did && String(did) === String(donorId);
          });
          if (allMatch) {
            donations = allReturned;
          } else {
            // server did not filter; apply client-side filter on returned array
            donations = allReturned.filter((d: any) => {
              const did = extractId(d);
              return did && String(did) === String(donorId);
            });
          }
        } else {
          // Fallback: fetch all donations and filter client-side
          try {
            const all = await handleListDonorDonations({});
            if (all && all.success && Array.isArray(all.data)) {
              const extractId = (d: any) => {
                if (!d) return null;
                const cand = d.donorId ?? d.donor ?? d.donor_id ?? d.user;
                if (!cand) return null;
                if (typeof cand === "string") return cand;
                if (typeof cand === "number") return String(cand);
                if (typeof cand === "object") return cand._id || cand.id || null;
                return null;
              };
              donations = all.data.filter((d: any) => {
                const did = extractId(d);
                return did && String(did) === String(donorId);
              });
            }
          } catch (e) {
            // ignore
          }
        }

        const totalDonations = donations.length;
        const itemsDonated = donations.reduce((sum: number, d: any) => {
          const qRaw = d.quantity;
          let q = 0;
          if (typeof qRaw === "number") q = qRaw;
          else if (typeof qRaw === "string") {
            const parsed = parseInt(qRaw.replace(/[^0-9-]/g, ""), 10);
            q = isNaN(parsed) ? 0 : parsed;
          }
          return sum + q;
        }, 0);
        const impactPoints = totalDonations * 10;
        if (mounted) {
          const merged = { ...user, totalDonations, itemsDonated, impactPoints };
          setUser(merged);
          try { auth.setUser && auth.setUser(merged); } catch (e) {}
        }
      } catch (err) {
        // ignore errors
      }
    };
    computeTotals();
    return () => { mounted = false };
  }, [user?._id, user?.id]);

  const handleEditProfile = () => {
    setEditData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || user.phoneNumber || "",
      image: null,
    });
    setEditing(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setEditData({ ...editData, image: files && files[0] ? files[0] : null });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    try {
      const formData = new FormData();
      formData.append("name", editData.name);
      formData.append("email", editData.email);
      formData.append("phoneNumber", editData.phone);
      if (editData.image) {
        formData.append("image", editData.image);
      }
      const userId = user && (user._id || user.id);
      if (!userId) {
        setEditError("User ID not found. Cannot update profile.");
        setEditLoading(false);
        return;
      }
      const res = await import("@/lib/actions/auth-actions").then(m => m.handleUpdateProfile(userId, formData));
      if (res && res.success && (res.data?._id || res.data?.id)) {
        setUser(res.data);
        setEditing(false);
      } else {
        setEditError(res.message || "Failed to update profile");
      }
    } catch (err: any) {
      setEditError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update profile"
      );
    }
    setEditLoading(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!user) return <div>No user data found.</div>;

  // Format createdAt to "Month Year"
  let memberSince = "";
  if (user.createdAt) {
    const date = new Date(user.createdAt);
    memberSince = date.toLocaleString("default", { month: "long", year: "numeric" });
  }

  return (
      <div className="p-0">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="mb-6 text-gray-500">Manage your account information and view your donation statistics</p>
        <div className="flex flex-wrap gap-6">
          {/* Profile Info */}
          <div className="bg-white rounded-lg shadow p-6 flex-1 min-w-[320px]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex flex-col items-center justify-center">
                {editing ? (
                  <>
                    {editData && editData.image ? (
                      <img
                        src={URL.createObjectURL(editData.image)}
                        alt="Profile Preview"
                        className="w-20 h-20 object-cover object-center rounded-full aspect-square"
                      />
                    ) : user && user.profilePicture ? (
                      <img
                        src={`${(axios.defaults && (axios.defaults).baseURL ? (axios.defaults).baseURL : "http://localhost:5050")}/item_photos/${user.profilePicture}`}
                        alt="Profile"
                        className="w-20 h-20 object-cover object-center rounded-full aspect-square"
                      />
                    ) : user && user.image ? (
                      <img
                        src={user.image}
                        alt="Profile"
                        className="w-20 h-20 object-cover object-center rounded-full aspect-square"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-400">No Image</div>
                    )}
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleEditChange}
                      className="mt-2 text-xs block"
                    />
                  </>
                ) : user.profilePicture ? (
                  <img
                    src={`${(axios.defaults && (axios.defaults).baseURL ? (axios.defaults).baseURL : "http://localhost:5050")}/item_photos/${user.profilePicture}`}
                    alt="Profile"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                ) : user.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                ) : null}
              </div>
              <div>
                {editing ? (
                  <input name="name" value={editData.name} onChange={handleEditChange} className="text-xl font-semibold border rounded px-2 py-1" />
                ) : (
                  <div className="text-xl font-semibold">{user.name}</div>
                )}
                <div className="text-blue-600 font-medium">Verified Donor</div>
              </div>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="material-icons">email: </span>
              {editing ? (
                <input name="email" value={editData.email} onChange={handleEditChange} className="border rounded px-2 py-1" />
              ) : (
                <span>{user.email}</span>
              )}
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="material-icons">phone: </span>
              {editing ? (
                <input name="phone" value={editData.phone} onChange={handleEditChange} className="border rounded px-2 py-1" />
              ) : (
                <span>{user.phone || user.phoneNumber}</span>
              )}
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="material-icons">Donor since </span>
              <span>{memberSince}</span>
            </div>
            {editing ? (
              <form onSubmit={handleEditSubmit} className="mt-4 flex gap-2">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={editLoading || !user || !(user._id || user.id)}
                >
                  {editLoading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
                {editError && <div className="text-red-600 ml-2">{editError}</div>}
              </form>
            ) : (
              <button
                className="mt-4 inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            )}
          </div>
          {/* Account Status */}
          <div className="bg-white rounded-lg shadow p-6 min-w-55">
            <div className="font-semibold mb-2">Account Status</div>
            <div className="mb-1">Account Type: <span className="font-medium">Donor</span></div>
            <div className="mb-1">Verification: <span className="text-green-600">✔ Verified</span></div>
            <div className="mb-1">Member Since: <span>{memberSince}</span></div>
            <div className="mb-1">Total Donations: <span className="font-semibold">{user.totalDonations || 0}</span></div>
            <div className="mb-1">Items Donated: <span className="font-semibold">{user.itemsDonated || 0}</span></div>
            <div>Total Impact: <span className="text-purple-600 font-semibold">{user.impactPoints || 0} pts</span></div>
          </div>
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6 min-w-55 flex flex-col gap-2">
            <div className="font-semibold mb-2">Quick Actions</div>
            <button onClick={() => router.push('/user/donor/donation')} className="bg-purple-600 text-white px-4 py-2 rounded">Add donation</button>
            <button onClick={() => router.push('/user/donor/my-donations')} className="bg-gray-200 px-4 py-2 rounded">View Donations</button>
            <button className="bg-gray-200 px-4 py-2 rounded">View NGOs</button>
          </div>
        </div>
        {/* Impact This Year */}
        <div className="mt-8 bg-green-100 rounded-lg p-6 text-center">
          <div className="font-semibold mb-2">Your Impact this year</div>
          <div>Keep up the amazing work!</div>
            <div className="mt-2 text-green-700 text-xl font-bold">{user.impactPoints || 0} pts</div>
        </div>
      </div>
  );
}
