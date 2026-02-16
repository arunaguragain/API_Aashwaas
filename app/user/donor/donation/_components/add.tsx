"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleCreateDonorDonation } from "@/lib/actions/donor/donation-actions";
import { DonationModel } from "@/app/(platform)/donations/schemas";

export default function AddDonation() {
  const router = useRouter();
  const initialForm: Omit<DonationModel, "_id"> = {
    itemName: "",
    category: "Books",
    description: "",
    quantity: "",
    condition: "New",
    pickupLocation: "",
    media: "",
    donorId: "",
    ngoId: "",
    status: "pending",
  };
  const [form, setForm] = useState<Omit<DonationModel, "_id">>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Validation logic
  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!form.itemName) errors.itemName = "Item name is required.";
    if (!form.quantity || isNaN(Number(form.quantity))) errors.quantity = "Quantity must be a number.";
    if (!form.pickupLocation) errors.pickupLocation = "Pickup location is required.";
    return errors;
  };
  const validationErrors = validate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    if (Object.keys(validationErrors).length > 0) {
      setError("Please fix the errors in the form.");
      setLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      // Append all fields except media (image file handled separately)
      formData.append("itemName", form.itemName);
      formData.append("category", form.category);
      formData.append("description", form.description ?? "");
      formData.append("quantity", form.quantity);
      formData.append("condition", form.condition);
      formData.append("pickupLocation", form.pickupLocation);
      // Append image file
      if (photoFile) {
        formData.append("donationPhoto", photoFile);
      }
      // donorId and status are set server-side
      const res = await handleCreateDonorDonation(formData);
      if (res.success) {
        setSuccess(true);
        // navigate to My Donations list where the new item will appear
        setTimeout(() => {
          router.push("/user/donor/my-donations");
        }, 700);
      } else {
        setError(res.message || "Failed to add donation");
      }
    } catch (err: any) {
      setError(err.message || "Failed to add donation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Add Donation</h1>
        <p className="text-sm text-gray-600">Fill out the form to donate an item</p>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
          Donation added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative space-y-6 rounded-xl border border-gray-200 bg-white p-6">
        {loading && (
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

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-gray-900" htmlFor="itemName">Item Name</label>
            <input
              id="itemName"
              name="itemName"
              value={form.itemName}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              placeholder="e.g. Winter Jacket"
              className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm disabled:opacity-70"
            />
            {touched.itemName && validationErrors.itemName && (
              <p className="mt-1 text-xs text-rose-600">{validationErrors.itemName}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-900" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              disabled={loading}
              className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm disabled:opacity-70"
            >
              <option value="Clothes">Clothes</option>
              <option value="Books">Books</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Food">Food</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-900" htmlFor="description">Description <span className="text-xs text-gray-400">(optional)</span></label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading}
            placeholder="Describe the item"
            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm disabled:opacity-70"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-gray-900" htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              min={1}
              placeholder="Enter quantity"
              className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm disabled:opacity-70"
            />
            {touched.quantity && validationErrors.quantity && (
              <p className="mt-1 text-xs text-rose-600">{validationErrors.quantity}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-900" htmlFor="condition">Condition</label>
            <select
              id="condition"
              name="condition"
              value={form.condition}
              onChange={handleChange}
              disabled={loading}
              className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm disabled:opacity-70"
            >
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-900" htmlFor="pickupLocation">Pickup Location</label>
          <input
            id="pickupLocation"
            name="pickupLocation"
            value={form.pickupLocation}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading}
            placeholder="Enter pickup location"
            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm disabled:opacity-70"
          />
          {touched.pickupLocation && validationErrors.pickupLocation && (
            <p className="mt-1 text-xs text-rose-600">{validationErrors.pickupLocation}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-900" htmlFor="mediaFile">Upload Image</label>
          <input
            id="mediaFile"
            name="mediaFile"
            type="file"
            accept="image/*"
            disabled={loading}
            required
            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm disabled:opacity-70"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                setForm(prev => ({ ...prev, media: file.name }));
                setPhotoFile(file);
                setPhotoPreview(URL.createObjectURL(file));
              }
            }}
          />
        </div>
        {photoPreview && (
          <div>
            <p className="text-sm font-semibold text-gray-900">Preview</p>
            <div className="mt-3 max-w-sm rounded-lg border border-gray-200 p-2">
              <img src={photoPreview} alt="Donation photo preview" className="h-32 w-full rounded-md object-cover" />
              <button
                type="button"
                onClick={() => {
                  setPhotoFile(null);
                  setPhotoPreview(null);
                  setForm(prev => ({ ...prev, media: "" }));
                }}
                disabled={loading}
                className="mt-2 text-xs font-semibold text-red-600 disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          </div>
        )}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading || Object.keys(validationErrors).length > 0}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? "Adding..." : "Add Donation"}
          </button>

          <button
            type="button"
            onClick={() => {
              if (loading) return;
              setForm(initialForm);
              setTouched({});
              setPhotoFile(null);
              setPhotoPreview(null);
              setError(null);
              setSuccess(false);
              // go back to previous page
              router.back();
            }}
            disabled={loading}
            className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-70"
          >
            Cancel
          </button>
          
        </div>
      </form>
    </div>
  );
}
