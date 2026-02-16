// Task schemas for (platform)

export type TaskStatus = "assigned" | "accepted" | "rejected" | "completed";

export interface TaskModel {
  _id: string;
  title: string;
  donationId: string;
  volunteerId: string;
  ngoId?: string;
  status: TaskStatus;
  assignedAt?: string;
  acceptedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}
