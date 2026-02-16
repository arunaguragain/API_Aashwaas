import axios from "./axios";
import { API } from "./endpoints";
import type { ReviewModel, ReviewListParams } from "@/app/(platform)/reviews/schemas";

export const ReviewsApi = {
  async list(params?: ReviewListParams): Promise<{ data: ReviewModel[]; pagination?: any; source: "api" | "mock" }> {
    try {
      const response = await axios.get(API.REVIEWS.LIST, { params });
      const payload: any = response.data ?? {};
      const data: ReviewModel[] = Array.isArray(payload)
        ? payload
        : (payload.reviews ?? payload.data ?? []);
      const pagination = payload.pagination ?? null;
      return { data, pagination, source: "api" };
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || "Failed to fetch reviews");
    }
  },

  async listMy(params?: ReviewListParams): Promise<{ data: ReviewModel[]; pagination?: any; source: "api" | "mock" }> {
    try {
      const response = await axios.get(API.REVIEWS.MY, { params });
      const payload: any = response.data ?? {};
      const data: ReviewModel[] = Array.isArray(payload)
        ? payload
        : (payload.reviews ?? payload.data ?? []);
      const pagination = payload.pagination ?? null;
      return { data, pagination, source: "api" };
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || "Failed to fetch user reviews");
    }
  },

  async create(payload: { rating: number; comment?: string }): Promise<{ data: ReviewModel; source: "api" | "mock" }> {
    try {
      const response = await axios.post(API.REVIEWS.CREATE, payload);
      const data: ReviewModel = (response.data && (response.data.data ?? response.data)) || response.data;
      return { data, source: "api" };
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || "Create review failed");
    }
  },

  async getById(id: string): Promise<{ data: ReviewModel; source: "api" | "mock" }> {
    try {
      const response = await axios.get(API.REVIEWS.GET(id));
      const data: ReviewModel = (response.data && (response.data.data ?? response.data)) || response.data;
      return { data, source: "api" };
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || "Failed to fetch review");
    }
  },

  async update(id: string, payload: Partial<Pick<ReviewModel, "rating" | "comment">>): Promise<{ data: ReviewModel; source: "api" | "mock" }> {
    try {
      const response = await axios.put(API.REVIEWS.UPDATE(id), payload);
      const data: ReviewModel = (response.data && (response.data.data ?? response.data)) || response.data;
      return { data, source: "api" };
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || "Update review failed");
    }
  },

  async remove(id: string): Promise<{ data: { id: string }; source: "api" | "mock" }> {
    try {
      await axios.delete(API.REVIEWS.DELETE(id));
      return { data: { id }, source: "api" };
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || "Delete review failed");
    }
  },
};
