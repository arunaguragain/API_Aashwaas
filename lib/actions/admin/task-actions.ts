import { TasksApi, Task, TaskStatus } from "@/lib/api/admin/tasks";

export async function fetchAdminTasks(params?: { status?: string; search?: string }) {
  const res = await TasksApi.list(params);
  return res.data;
}

export async function fetchAdminTaskById(id: string) {
  const res = await TasksApi.getById(id);
  return res.data;
}

export async function createAdminTask(payload: Partial<Task>) {
  const res = await TasksApi.create(payload);
  return res.data;
}

export async function updateAdminTask(id: string, payload: Partial<Task>) {
  // If you add an update method to TasksApi, use it here
  // Example: const res = await TasksApi.update(id, payload);
  // return res.data;
  throw new Error("Update method not implemented in TasksApi");
}

export async function updateAdminTaskStatus(id: string, status: TaskStatus) {
  const res = await TasksApi.updateStatus(id, status);
  return res.data;
}

export type { TaskStatus };

