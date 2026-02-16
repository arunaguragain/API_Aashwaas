import type { CSSProperties, ReactNode } from "react";

export default function Card({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`rounded-[var(--radius-xl)] border border-[#ead8c5] bg-white/85 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
