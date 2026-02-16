import { DonationListParams, DonationModel } from "@/app/(platform)/donations/schemas";
import axios from "../axios";
import { API } from "../endpoints";


export const DonationsApi = {
  async list(params?: DonationListParams): Promise<{ data: DonationModel[]; source: "api" | "mock" }> {
    try {
      const response = await axios.get(API.DONATION.LIST, { params });
      const payload = response.data as unknown;
      const data = Array.isArray(payload)
        ? (payload as DonationModel[])
        : ((payload as { data?: DonationModel[] }).data ?? []);
      return { data, source: "api" };
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || "Failed to fetch donations");
    }
  },

  async getById(id: string): Promise<{ data: DonationModel; source: "api" | "mock" }> {
    try {
      const response = await axios.get(API.DONATION.GET(id));
      const data = (response.data as { data?: DonationModel }).data ?? response.data;
      return { data, source: "api" };
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || "Failed to fetch donation");
    }
  },

  async create(payload: any): Promise<{ data: DonationModel; source: "api" | "mock" }> {
    try {
      let response;
      // Send payload (axios will set headers appropriately)
      response = await axios.post(API.DONATION.CREATE, payload);
      const data = (response.data as { data?: DonationModel }).data ?? response.data;
      return { data, source: "api" };
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || "Create donation failed");
    }
  },

  async update(id: string, payload: Partial<Omit<DonationModel, "id" | "createdAt">>): Promise<{ data: DonationModel; source: "api" | "mock" }> {
    try {
      const response = await axios.patch(API.DONATION.GET(id), payload);
      const data = (response.data as { data?: DonationModel }).data ?? response.data;
      return { data, source: "api" };
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || "Update donation failed");
    }
  },

  async remove(id: string): Promise<{ data: { id: string }; source: "api" | "mock" }> {
    try {
      await axios.delete(API.DONATION.GET(id));
      return { data: { id }, source: "api" };
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || "Delete donation failed");
    }

  },
};

