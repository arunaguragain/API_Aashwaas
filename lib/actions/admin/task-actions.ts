// "use server";
import { TasksApi, Task, TaskStatus } from "@/lib/api/admin/tasks";
// import { revalidatePath } from 'next/cache';

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

export async function updateAdminTask(
  id: string,
  payload: Partial<Task> & { assigneeName?: string }
) {
  // If only assigneeName is present, use assign endpoint. Otherwise, use update endpoint.
  if (payload.assigneeName && Object.keys(payload).length === 1) {
    const res = await TasksApi.assign(id, payload.assigneeName);
    return res.data;
  }
  if (TasksApi.update) {
    // Remove assigneeName before sending to update endpoint
    const { assigneeName, ...updatePayload } = payload;
    const res = await TasksApi.update(id, updatePayload);
    return res.data;
  }
  throw new Error("Update method not implemented in TasksApi.");
}

export async function updateAdminTaskStatus(id: string, status: TaskStatus) {
  const res = await TasksApi.updateStatus(id, status);
  return res.data;
}

export type { TaskStatus };

