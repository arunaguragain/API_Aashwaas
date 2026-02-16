"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HeartHandshake, Search, Sparkles } from "lucide-react";

const navItems = [
  { label: "Donations", href: "/donations" },
  { label: "NGOs", href: "/ngos" },
  { label: "Tasks", href: "/tasks" },
];

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = query.trim();
    // determine target page based on query keywords or nav labels
    const lower = next.toLowerCase();
    let target = "/donations";
    let q = next;
    for (const item of navItems) {
      const label = item.label.toLowerCase();
      if (lower === label) {
        target = item.href;
        q = "";
        break;
      }
      if (lower.startsWith(label + ":") || lower.startsWith(label + " ")) {
        target = item.href;
        q = next.slice(label.length).replace(/^[:\s]+/, "").trim();
        break;
      }
      if (lower.includes(label) && next.length < 30) {
        // short queries mentioning a section likely mean navigate there
        target = item.href;
        break;
      }
    }

    if (!q) {
      router.push(target);
      return;
    }

    const params = new URLSearchParams();
    params.set("q", q);
    router.push(`${target}?${params.toString()}`);
  };

  return (
    <div className="sticky top-0 z-40 border-b border-[#e6d7c5] bg-white/70 backdrop-blur-lg">
      <div className="mx-auto w-full max-w-6xl px-6 py-5">
        <div className="flex items-center justify-between gap-6">
          <Link href="/donations" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--cocoa-900)] text-white">
              <HeartHandshake className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg text-[color:var(--cocoa-900)]">Aashwaas</p>
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--cocoa-700)]">Donate + Volunteer</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-semibold transition ${
                    active
                      ? "text-[color:var(--cocoa-900)]"
                      : "text-[color:var(--cocoa-700)] hover:text-[color:var(--cocoa-900)]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <form onSubmit={handleSubmit} className="hidden w-full max-w-sm items-center gap-3 rounded-full border border-[#e3d2bf] bg-white px-4 py-2 md:flex">
            <Search className="h-4 w-4 text-[color:var(--cocoa-700)]" aria-hidden="true" />
            <label className="sr-only" htmlFor="global-search">
              Search donations, NGOs, and tasks
            </label>
            <input
              id="global-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, city, or NGO"
              className="w-full bg-transparent text-sm text-[color:var(--cocoa-900)] outline-none placeholder:text-[color:var(--cocoa-700)]"
            />
          </form>

          <div className="flex items-center gap-3">
            <Link
              href="/donations/new"
              className="hidden items-center gap-2 rounded-full bg-[color:var(--cocoa-900)] px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 md:flex"
            >
              <Sparkles className="h-4 w-4" />
              New Donation
            </Link>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 md:hidden">
          <nav className="flex flex-wrap gap-4">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-semibold transition ${
                    active
                      ? "text-[color:var(--cocoa-900)]"
                      : "text-[color:var(--cocoa-700)] hover:text-[color:var(--cocoa-900)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <form onSubmit={handleSubmit} className="flex w-full items-center gap-3 rounded-full border border-[#e3d2bf] bg-white px-4 py-2">
            <Search className="h-4 w-4 text-[color:var(--cocoa-700)]" aria-hidden="true" />
            <label className="sr-only" htmlFor="global-search-mobile">
              Search donations, NGOs, and tasks
            </label>
            <input
              id="global-search-mobile"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, city, or NGO"
              className="w-full bg-transparent text-sm text-[color:var(--cocoa-900)] outline-none placeholder:text-[color:var(--cocoa-700)]"
            />
          </form>
          <Link
            href="/donations/new"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--cocoa-900)] px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" />
            New Donation
          </Link>
        </div>
      </div>
    </div>
  );
}
