"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAdminTaskById, updateAdminTaskStatus } from "@/lib/actions/admin/task-actions";
import type { TaskStatus } from "@/lib/actions/admin/task-actions";

export default function AdminTaskDetailPage() {
  const params = useParams();
  console.log('AdminTaskDetailPage params:', params);
  const id = params?.id as string;
  console.log('AdminTaskDetailPage id:', id);
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<TaskStatus>("pending");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAdminTaskById(id).then((data) => {
      setTask(data);
      setStatus(data.status);
    }).finally(() => setLoading(false));
  }, [id]);

  const handleStatusUpdate = async () => {
    setSaving(true);
    await updateAdminTaskStatus(id, status);
    setSaving(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!task) return <div>Task not found.</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Task Detail</h1>
      <div className="mb-4">
        <strong>Title:</strong> {task.title}
      </div>
      <div className="mb-4">
        <strong>Description:</strong> {task.description}
      </div>
      <div className="mb-4">
        <strong>Status:</strong>
        <select
          value={status}
          onChange={e => setStatus(e.target.value as TaskStatus)}
          className="ml-2 border rounded px-2 py-1"
        >
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={handleStatusUpdate} disabled={saving} className="ml-2 px-4 py-1 bg-blue-600 text-white rounded">
          {saving ? "Saving..." : "Update Status"}
        </button>
      </div>
      <div className="mb-4">
        <strong>Assigned To:</strong> {task.assignedTo || "Unassigned"}
      </div>
      <div className="mb-4">
        <strong>NGO:</strong> {task.ngoName || "Unassigned"}
      </div>
      <div className="mb-4">
        <strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleString() : "Not set"}
      </div>
    </div>
  );
}
