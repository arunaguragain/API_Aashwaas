"use client";

import React from "react";

type Props = {
  initial?: { rating?: number; comment?: string };
  onCancel?: () => void;
  onSubmit: (payload: { rating: number; comment?: string }) => Promise<any> | any;
  submitting?: boolean;
  submitLabel?: string;
};

const ReviewForm: React.FC<Props> = ({ initial, onCancel, onSubmit, submitting, submitLabel = "Save" }) => {
  const [rating, setRating] = React.useState<number>(initial?.rating ?? 5);
  const [comment, setComment] = React.useState<string>(initial?.comment ?? "");
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || rating < 1 || rating > 5) return setError("Rating must be between 1 and 5");
    setError(null);
    await onSubmit({ rating, comment });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium w-20">Rating</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="rounded-md border px-3 py-2 text-sm w-32">
          {[5, 4, 3, 2, 1].map((v) => (
            <option key={v} value={v}>
              {v} ★
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="mt-2 w-full rounded-md border px-3 py-2 text-sm"
          placeholder="Optional - share your experience"
        />
      </div>

      <div className="flex items-center gap-2">
        <button type="submit" disabled={submitting} className="inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60">
          {submitting ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
        )}
      </div>

      {error && <div className="text-rose-600 text-sm">{error}</div>}
    </form>
  );
};

export default ReviewForm;
