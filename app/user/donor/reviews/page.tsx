"use client";

import React, { useEffect, useState } from "react";
import Card from "@/app/(platform)/_components/Card";
import ConfirmDialog from "@/app/(platform)/_components/ConfirmDialog";
import { useToast } from "@/app/(platform)/_components/ToastProvider";
import ReviewForm from "./_components/ReviewForm";
import ReviewItem from "./_components/ReviewItem";
import { handleCreateReview, handleListMyReviews, handleRemoveReview, handleUpdateReview } from "@/lib/actions/donor/review-actions";
import type { ReviewModel } from "@/app/(platform)/reviews/schemas";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ReviewModel | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toastCtx = (() => {
    try {
      return useToast();
    } catch (e) {
      return null;
    }
  })();

  const pushToast = toastCtx ? toastCtx.pushToast : undefined;

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await handleListMyReviews({ page: 1, perPage: 50 });
        if (res.success) {
          if (mounted) setReviews(Array.isArray(res.data) ? res.data : []);
        } else {
          if (mounted) setError(res.message || "Failed to load reviews");
        }
      } catch (err: any) {
        if (mounted) setError(err?.message || "Failed to load reviews");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false };
  }, []);

  const handleCreate = async (payload: { rating: number; comment?: string }) => {
    setSubmitting(true);
    try {
      const res = await handleCreateReview(payload);
      if (res.success && res.data) {
        setReviews((p) => [res.data as ReviewModel, ...p]);
        setShowForm(false);
        if (pushToast) pushToast({ title: "Review added", tone: "success" });
      } else {
        if (pushToast) pushToast({ title: "Unable to add review", description: res.message, tone: "error" });
      }
    } catch (err: any) {
      if (pushToast) pushToast({ title: "Unable to add review", description: err?.message || "Try again", tone: "error" });
    }
    setSubmitting(false);
  };

  const handleStartEdit = (r: ReviewModel) => {
    setEditing(r);
    setShowForm(true);
  };

  const handleSubmitEdit = async (payload: { rating: number; comment?: string }) => {
    if (!editing) return;
    setSubmitting(true);
    try {
      const res = await handleUpdateReview(editing._id, payload);
      if (res.success && res.data) {
        setReviews((prev) => prev.map((it) => (it._id === editing._id ? (res.data as ReviewModel) : it)));
        setEditing(null);
        setShowForm(false);
        if (pushToast) pushToast({ title: "Review updated", tone: "success" });
      } else {
        if (pushToast) pushToast({ title: "Unable to update", description: res.message, tone: "error" });
      }
    } catch (err: any) {
      if (pushToast) pushToast({ title: "Unable to update", description: err?.message || "Try again", tone: "error" });
    }
    setSubmitting(false);
  };

  const handleConfirmDelete = async (id: string) => {
    setPendingDeleteId(null);
    setDeletingId(id);
    try {
      const res = await handleRemoveReview(id);
      if (res.success) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
        if (pushToast) pushToast({ title: "Review removed", tone: "success" });
      } else {
        if (pushToast) pushToast({ title: "Unable to remove", description: res.message, tone: "error" });
      }
    } catch (err: any) {
      if (pushToast) pushToast({ title: "Unable to remove", description: err?.message || "Try again", tone: "error" });
    }
    setDeletingId(null);
  };

  return (
    <div className="p-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Reviews</h1>
          <p className="text-sm text-gray-600">View and manage your reviews</p>
        </div>
        <div>
          <button onClick={() => { setShowForm((s) => !s); setEditing(null); }} className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            {showForm ? "Close" : "Add Review"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4">
          <ReviewForm initial={editing ? { rating: editing.rating, comment: editing.comment } : undefined} onCancel={() => { setShowForm(false); setEditing(null); }} onSubmit={editing ? handleSubmitEdit : handleCreate} submitting={submitting} submitLabel={editing ? "Update review" : "Add review"} />
        </div>
      )}

      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-rose-600">{error}</div>}

      {!loading && reviews.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-700">You have not added any reviews yet.</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 mt-4">
        <ConfirmDialog
          open={!!pendingDeleteId}
          title="Confirm delete"
          description="Are you sure you want to delete this review? This action cannot be undone."
          onCancel={() => setPendingDeleteId(null)}
          onConfirm={() => (pendingDeleteId ? handleConfirmDelete(pendingDeleteId) : undefined)}
          confirmLabel="Delete review"
          loading={!!(pendingDeleteId && deletingId === pendingDeleteId)}
        />

        {reviews.map((r) => (
          <ReviewItem key={r._id} review={r} onEdit={handleStartEdit} onDelete={(id) => setPendingDeleteId(id)} deleting={deletingId === r._id} />
        ))}
      </div>
    </div>
  );
}
