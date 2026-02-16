import Link from "next/link";

export default function EmptyState({
  title,
  message,
  actionLabel,
  actionHref,
}: {
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-dashed border-[#d8c4ae] bg-white/60 p-10 text-center">
      <h3 className="font-display text-2xl text-[color:var(--cocoa-900)]">{title}</h3>
      <p className="mt-2 text-sm text-[color:var(--cocoa-700)]">{message}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[color:var(--cocoa-900)] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
