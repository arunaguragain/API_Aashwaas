import axiosInstance from "../axios";
import { API } from "../endpoints";

export type TaskStatus = "pending" | "assigned" | "completed";

export type Task = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  ngoName?: string;
  dueDate?: string;
  assignedTo?: string | null;
  status: TaskStatus;
  createdAt?: string;
};

export const TasksApi = {
  async list(params?: { status?: string; search?: string }): Promise<{ data: Task[]; source: "api" | "mock" }> {
    try {
      const response = await axiosInstance.get(API.TASK.LIST, { params });
      const payload = response.data as unknown;
      const data = Array.isArray(payload) ? (payload as Task[]) : ((payload as any).data ?? []);
      return { data, source: "api" };
    } catch (err) {
      return { data: [], source: "api" };
    }
  },

  async getById(id: string): Promise<{ data: Task; source: "api" | "mock" }> {
    try {
      const response = await axiosInstance.get(API.TASK.GET(id));
      const payload = response.data as any;
      const data = payload?.data ?? payload;
      return { data, source: "api" };
    } catch (err) {
      throw new Error("Task not found");
    }
  },

  async assign(id: string, name: string): Promise<{ data: Task; source: "api" | "mock" }> {
    try {
      const response = await axiosInstance.post(API.TASK.ASSIGN(id), { assignedTo: name });
      const payload = response.data as any;
      const data = payload?.data ?? payload;
      return { data, source: "api" };
    } catch (err) {
      throw new Error("Assign failed");
    }
  },

  async create(payload: Partial<Task>): Promise<{ data: Task; source: "api" | "mock" }> {
    try {
      const response = await axiosInstance.post(API.TASK.LIST, payload);
      const payloadData = response.data as any;
      const data = payloadData?.data ?? payloadData;
      return { data, source: "api" };
    } catch (err) {
      throw new Error("Create task failed");
    }
  },

  async updateStatus(id: string, status: TaskStatus): Promise<{ data: Task; source: "api" | "mock" }> {
    try {
      const response = await axiosInstance.post(API.TASK.UPDATE_STATUS(id), { status });
      const payload = response.data as any;
      const data = payload?.data ?? payload;
      return { data, source: "api" };
    } catch (err) {
      throw new Error("Update status failed");
    }
  },
};

export default TasksApi;
