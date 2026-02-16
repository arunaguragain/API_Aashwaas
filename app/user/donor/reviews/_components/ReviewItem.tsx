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

const stars = (n: number) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={
          i < n
            ? "text-yellow-500 text-lg"
            : "text-gray-300 text-lg"
        }
      >★</span>
    ))}
  </div>
);

const ReviewItem: React.FC<Props> = ({ review, onEdit, onDelete, deleting, canModify }) => {
  const id = (review as any)._id ?? (review as any).id ?? "";
  return (
    <Card noPadding className="p-4 md:p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {stars(review.rating)}
          <div className="text-xs text-gray-500 font-medium">{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}</div>
        </div>
        {review.comment && <p className="mt-2 text-base text-gray-800 font-normal">{review.comment}</p>}

        {canModify ? (
          <div className="mt-4 flex flex-row gap-2 items-end">
            {onEdit && (
              <button
                onClick={() => onEdit(review)}
                className="text-xs rounded-full bg-[#009966] px-5 py-1.5 text-white font-bold shadow-sm hover:bg-[#007a53] transition border-none min-w-[80px]"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(review._id)}
                className="text-xs rounded-full border border-[#e57373] px-5 py-1.5 text-[#b71c1c] font-bold shadow-sm  hover:bg-[#ffeaea] transition min-w-[80px]"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        ) : (
          <div className="text-xs text-gray-400 mt-4 flex items-end">Not editable</div>
        )}
      </div>
    </Card>
  );
};

export default ReviewItem;
