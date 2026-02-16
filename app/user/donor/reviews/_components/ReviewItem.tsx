"use client";

import React from "react";
import Card from "@/app/(platform)/_components/Card";
import { ReviewModel } from "@/app/(platform)/reviews/schemas";

type Props = {
  review: ReviewModel;
  onEdit?: (r: ReviewModel) => void;
  onDelete?: (id: string) => void;
  deleting?: boolean;
  canModify?: boolean;
};

const stars = (n: number) => Array.from({ length: n }).map((_, i) => <span key={i}>★</span>);

const ReviewItem: React.FC<Props> = ({ review, onEdit, onDelete, deleting, canModify }) => {
  const id = (review as any)._id ?? (review as any).id ?? "";
  return (
    <Card noPadding className="p-3">
      <div className="flex items-start justify-between">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-yellow-600 font-semibold text-sm">{stars(review.rating)}</div>
            <div className="text-xs text-gray-500">{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}</div>
          </div>
          {review.comment && <p className="mt-2 text-sm text-gray-700 line-clamp-3">{review.comment}</p>}
        </div>

        <div className="ml-4 flex flex-col gap-2 items-end">
          {canModify ? (
            <>
              {onEdit && (
                <button onClick={() => onEdit(review)} className="text-sm rounded-md bg-slate-50 px-3 py-1 text-slate-700 hover:bg-slate-100">
                  Edit
                </button>
              )}
              {onDelete && (
                <button onClick={() => onDelete(review._id)} className="text-sm rounded-md border border-rose-200 px-3 py-1 text-rose-600 hover:bg-rose-50">
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              )}
            </>
          ) : (
            <div className="text-xs text-gray-400">Not editable</div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ReviewItem;
