"use client";

import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import { resolveNgoPhotoUrl } from "@/lib/api/admin/ngos";

type User = any;

export default function UsersTable({ initialUsers }: { initialUsers: User[] }) {
  const [items, setItems] = useState<User[]>(initialUsers || []);
  const [perPage, setPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("");
  const [filterHost, setFilterHost] = useState<HTMLElement | null>(null);

  useEffect(() => setItems(initialUsers || []), [initialUsers]);

  useEffect(() => {
    // find the host element in the page header where filters should appear
    const host = document.getElementById("users-filters-host");
    if (host) setFilterHost(host);
  }, []);

  const roles = useMemo(() => {
    const set = new Set<string>();
    for (const u of items) {
      if (u.role) set.add(u.role.toString());
    }
    return Array.from(set).sort();
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((u) => {
      const name = (u.name || `${u.firstName || ""} ${u.lastName || ""}`).toString();
      const matchesText = !q || name.toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q);
      const matchesRole = !roleFilter || (u.role || "").toString() === roleFilter;
      return matchesText && matchesRole;
    });
  }, [items, query, roleFilter]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [pages, page]);

  return (
    <div className="space-y-4">
      {/* Render filters into header host via portal when available, otherwise inline */}
      {(() => {
        const filterNode = (
          <div className="flex items-center gap-3">
            <input
              aria-label="Search users"
              placeholder="Search users by name or email..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              className="w-72 rounded-md border border-gray-400 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <select
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="">All roles</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        );
        return filterHost ? ReactDOM.createPortal(filterNode, filterHost) : <div>{filterNode}</div>;
      })()}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow">
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-200 sticky top-0 z-10">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-800">
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Profile Picture</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Action</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
            {paged.length === 0 ? (
              <tr>
                <td className="px-6 py-6 text-sm text-gray-600" colSpan={6}>No users found.</td>
              </tr>
            ) : (
              paged.map((user: User, idx: number) => {
                const photo = (user.image || user.photo || user.avatar || "").toString();
                const src = photo ? resolveNgoPhotoUrl(photo) : "/images/user.png";
                return (
                  <tr key={user._id || user.id} className="text-sm text-gray-800 hover:bg-gray-100">
                    <td className="px-4 py-4">{(page - 1) * perPage + idx + 1}</td>
                    <td className="px-4 py-4">
                      <img src={src} alt={user.name || "avatar"} className="h-10 w-10 rounded-full object-cover" />
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-900">{user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "—"}</td>
                    <td className="px-4 py-4 text-gray-700">{user.email || "—"}</td>
                    <td className="px-4 py-4 text-gray-700 capitalize">{user.role || "user"}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/users/${user._id || user.id}`} className="inline-flex h-9 w-9 items-center justify-center rounded bg-amber-200 border border-amber-300 text-amber-900 hover:opacity-95 shadow-sm" title="View">
                          <span className="sr-only">View</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <Link href={`/admin/users/${user._id || user.id}/edit`} className="inline-flex h-9 w-9 items-center justify-center rounded bg-sky-200 border border-sky-300 text-sky-900 hover:opacity-95 shadow-sm" title="Edit">
                          <span className="sr-only">Edit</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4h6l3 3v6" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 13l-9 9H3v-6l9-9" />
                          </svg>
                        </Link>
                        <button
                          type="button"
                          onClick={async () => {
                            const ok = confirm("Delete this user? This action cannot be undone.");
                            if (!ok) return;
                            try {
                              const res = await fetch(`/api/admin/users/${user._id || user.id}`, { method: "DELETE", credentials: "include" });
                              if (!res.ok) throw new Error("Delete failed");
                              setItems((prev) => prev.filter((it) => (it._id || it.id) !== (user._id || user.id)));
                            } catch (e) {
                              alert("Unable to delete user right now.");
                            }
                          }}
                          className="inline-flex h-9 w-9 items-center justify-center rounded bg-rose-200 border border-rose-300 text-rose-900 hover:opacity-95 shadow-sm"
                          title="Delete"
                        >
                          <span className="sr-only">Delete</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3h4l1 4H9l1-4z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Showing {paged.length} of {total} entries</div>
        <div className="flex items-center gap-2">
          <button
            className={page <= 1
              ? "rounded border border-gray-700 bg-gray-700 px-3 py-1 text-sm text-white opacity-80 cursor-not-allowed"
              : "rounded border border-transparent bg-sky-600 px-3 py-1 text-sm text-white hover:bg-sky-700"
            }
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>

          {(() => {
            const pagesToShow: number[] = [];
            const start = Math.max(1, page - 2);
            const end = Math.min(pages, page + 2);
            if (start > 1) pagesToShow.push(1);
            if (start > 2) pagesToShow.push(-1);
            for (let i = start; i <= end; i++) pagesToShow.push(i);
            if (end < pages - 1) pagesToShow.push(-1);
            if (end < pages) pagesToShow.push(pages);
            return pagesToShow.map((pnum, i) =>
              pnum === -1 ? (
                <span key={`e-${i}`} className="px-2 text-sm text-gray-500">…</span>
              ) : (
                <button
                  key={pnum}
                  onClick={() => setPage(pnum)}
                  className={`rounded px-3 py-1 text-sm ${pnum === page ? "bg-sky-600 text-white" : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}`}
                >
                  {pnum}
                </button>
              )
            );
          })()}

          <button
            className={page >= pages
              ? "rounded border border-gray-700 bg-gray-700 px-3 py-1 text-sm text-white opacity-80 cursor-not-allowed"
              : "rounded border border-transparent bg-sky-600 px-3 py-1 text-sm text-white hover:bg-sky-700"
            }
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page >= pages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
