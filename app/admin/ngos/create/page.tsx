"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminNGOsApi } from "@/lib/api/admin/ngos";

type FormState = {
  name: string;
  registrationNumber: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  focusAreas: string;
  image: string;
};

export default function AdminNGOCreatePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    registrationNumber: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    focusAreas: "",
    image: "",
  });

  const updateField = (key: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhotos = (files: FileList | null) => {
    if (!files) return;
    const [file] = Array.from(files);
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setForm((prev) => ({ ...prev, image: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.registrationNumber.trim()) next.registrationNumber = "Registration number is required.";
    if (!form.contactPerson.trim()) next.contactPerson = "Contact person is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.address.trim()) next.address = "Address is required.";
    return next;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    try {
      const focusAreas = form.focusAreas
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const result = await AdminNGOsApi.adminCreate(
        {
        name: form.name,
        registrationNumber: form.registrationNumber,
        contactPerson: form.contactPerson,
        phone: form.phone,
        email: form.email,
        address: form.address,
        focusAreas,
        image: form.image,
        },
        photoFile
      );

      router.push(`/admin/ngos/${result.data.id}`);
    } catch (error) {
      const responseData = (error as { response?: { data?: unknown; status?: number } })?.response?.data;
      const status = (error as { response?: { status?: number } })?.response?.status;
      const message =
        (responseData as { message?: string; error?: string } | undefined)?.message ??
        (responseData as { message?: string; error?: string } | undefined)?.error ??
        (error as Error)?.message;
      const details =
        typeof responseData === "string"
          ? responseData.slice(0, 300)
          : responseData
            ? JSON.stringify(responseData).slice(0, 300)
            : "";
      const responseText =
        typeof responseData === "string"
          ? responseData
          : responseData
            ? JSON.stringify(responseData)
            : "";
      console.error("NGO create failed", { status, responseText });
      setErrors({
        form: message
          ? `Unable to create NGO: ${message}`
          : status
            ? `Unable to create NGO: HTTP ${status}${details ? ` - ${details}` : ""}`
            : "Unable to create NGO right now.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Add NGO</h1>
        <p className="text-sm text-gray-500">Create a new NGO profile for the platform</p>
      </div>

      {errors.form && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-gray-900" htmlFor="name">
              NGO name
            </label>
            <input
              id="name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            />
            {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-900" htmlFor="registrationNumber">
              Registration number
            </label>
            <input
              id="registrationNumber"
              value={form.registrationNumber}
              onChange={(event) => updateField("registrationNumber", event.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            />
            {errors.registrationNumber && (
              <p className="mt-1 text-xs text-rose-600">{errors.registrationNumber}</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-900" htmlFor="contactPerson">
            Contact person
          </label>
          <input
            id="contactPerson"
            value={form.contactPerson}
            onChange={(event) => updateField("contactPerson", event.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
          />
          {errors.contactPerson && (
            <p className="mt-1 text-xs text-rose-600">{errors.contactPerson}</p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-gray-900" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            />
            {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-900" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            />
            {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-900" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            value={form.address}
            onChange={(event) => updateField("address", event.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
          />
          {errors.address && <p className="mt-1 text-xs text-rose-600">{errors.address}</p>}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-gray-900" htmlFor="focusAreas">
              Focus areas
            </label>
            <input
              id="focusAreas"
              value={form.focusAreas}
              onChange={(event) => updateField("focusAreas", event.target.value)}
              placeholder="Education, Shelter, Nutrition"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-900" htmlFor="photos">
              Photo
            </label>
            <input
              id="photos"
              type="file"
              accept="image/*"
              onChange={(event) => handlePhotos(event.target.files)}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            />
          </div>
        </div>

        {photoPreview && (
          <div>
            <p className="text-sm font-semibold text-gray-900">Preview</p>
            <div className="mt-3 max-w-sm rounded-lg border border-gray-200 p-2">
              <img src={photoPreview} alt="NGO photo preview" className="h-32 w-full rounded-md object-cover" />
              <button
                type="button"
                onClick={removePhoto}
                className="mt-2 text-xs font-semibold text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
        >
          {saving ? "Saving..." : "Create NGO"}
        </button>
      </form>
    </div>
  );
}
