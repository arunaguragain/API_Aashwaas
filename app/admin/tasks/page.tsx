"use client";

import { useEffect, useState } from "react";
import { fetchAdminTasks } from "@/lib/actions/admin/task-actions";
import Link from "next/link";
import TaskTable from "./_components/TaskTable";
import { AdminDonationsApi } from "@/lib/api/admin/donations";
import { AdminNGOsApi } from "@/lib/api/admin/ngos";
import { getUserById } from "@/lib/api/admin/user";

function getDonorContactFromObj(d: any) {
  if (!d) return "-";
  const name = d.name || d.fullName || d.username || d.firstName || d.lastName || "";
  // Collect both email and phone number if available
  const email = d.email || "";
  const phone = d.phoneNumber || d.phone || d.mobile || d.contactNumber || d.contact || "";
  let contact = "";
  if (email && phone) contact = `${email}, ${phone}`;
  else if (email) contact = email;
  else if (phone) contact = phone;
  if (name && contact) return `${name} (${contact})`;
  if (name) return name;
  if (contact) return contact;
  return "-";
}

function getDonorContact(donor: any) {
  if (!donor || !donor.data) return "-";
  return getDonorContactFromObj(donor.data);
}

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const rawTasks = await fetchAdminTasks();
      const tasksWithDetails = await Promise.all(
        rawTasks.map(async (task: any) => {
          let donation = null;
          let ngo = null;
          let donorContact = "-";
          let volunteerName = "-";
          try {
            donation = task.donationId ? (await AdminDonationsApi.getById(task.donationId)).data : null;
            // donorId can be an object or a string
            if (donation?.donorId && typeof donation.donorId === "object") {
              donorContact = getDonorContactFromObj(donation.donorId);
            } else if (donation?.donorId && typeof donation.donorId === "string") {
              try {
                const donor = await getUserById(donation.donorId);
                donorContact = getDonorContact(donor);
              } catch (err) {
                donorContact = "-";
              }
            }
          } catch (err) {}

          // Only use volunteerId for volunteer name
          if (task.volunteerId) {
            try {
              const volunteer = await getUserById(task.volunteerId);
              volunteerName = volunteer?.data?.name || volunteer?.data?.fullName || volunteer?.data?.username || volunteer?.data?.email || volunteer?.data?.phoneNumber || task.volunteerId;
            } catch (err) {
              volunteerName = task.volunteerId;
            }
          }
          try {
            ngo = task.ngoId ? (await AdminNGOsApi.adminGetById(task.ngoId)).data : null;
          } catch {}
          return {
            ...task,
            donationTitle: donation?.itemName || donation?.title || task.donationId,
            pickupLocation: donation?.pickupLocation,
            dropLocation: ngo?.address,
            donorContact,
            ngoContact: ngo ? `${ngo.contactPerson || ""} (${ngo.phone || ngo.email || ""})` : "-",
            volunteer: volunteerName,
          };
        })
      );
      setTasks(tasksWithDetails);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="p-0">
      <h1 className="text-2xl font-bold mb-4">Admin Task Management</h1>
      {loading ? (
        <div>Loading...</div>
      ) : tasks.length === 0 ? (
        <div>No tasks found.</div>
      ) : (
        <TaskTable tasks={tasks} />
      )}
    </div>
  );
}
