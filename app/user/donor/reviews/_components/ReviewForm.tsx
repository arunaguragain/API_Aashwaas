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

  const [hover, setHover] = React.useState<number | null>(null);

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium w-20">Rating</label>
        <div role="radiogroup" aria-label="Rating" className="inline-flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((v) => {
            const filled = (hover ?? rating) >= v;
            return (
              <button
                key={v}
                type="button"
                aria-checked={rating === v}
                role="radio"
                onClick={() => setRating(v)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft" || e.key === "ArrowDown") setRating((r) => Math.max(1, (r ?? 1) - 1));
                  if (e.key === "ArrowRight" || e.key === "ArrowUp") setRating((r) => Math.min(5, (r ?? 1) + 1));
                }}
                onMouseEnter={() => setHover(v)}
                onMouseLeave={() => setHover(null)}
                className={`inline-flex items-center justify-center rounded px-2 py-1 text-xl leading-none focus:outline-none ${filled ? 'text-yellow-400' : 'text-slate-300'}`}
                title={`${v} star${v > 1 ? 's' : ''}`}
              >
                <span aria-hidden>{filled ? '★' : '☆'}</span>
              </button>
            );
          })}
        </div>
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
