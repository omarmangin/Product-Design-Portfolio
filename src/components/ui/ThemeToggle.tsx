"use client";

import { useTheme, type ThemeMode } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  showLabels?: boolean;
  className?: string;
}

const OPTIONS: { value: ThemeMode; label: string; ariaLabel: string }[] = [
  { value: "system", label: "System", ariaLabel: "Use system color theme" },
  { value: "light", label: "Light", ariaLabel: "Use light color theme" },
  { value: "dark", label: "Dark", ariaLabel: "Use dark color theme" },
];

function ThemeIcon({ mode }: { mode: ThemeMode }) {
  if (mode === "system") {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  }
  if (mode === "light") {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    );
  }
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/**
 * Accessible 3-way color theme switcher (`System`, `Light`, `Dark`) styled with
 * portfolio pill tokens (`--radius-pill`, `--bg-surface`, `--focus-ring`).
 */
export function ThemeToggle({
  showLabels = false,
  className = "",
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={`inline-flex items-center gap-[4px] rounded-[60px] border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] p-[4px] ${className}`}
    >
      {OPTIONS.map((opt) => {
        const isActive = theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setTheme(opt.value)}
            aria-pressed={isActive}
            aria-label={opt.ariaLabel}
            title={opt.label}
            className={`inline-flex items-center justify-center gap-[6px] rounded-[60px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${
              showLabels ? "px-[12px] py-[6px]" : "p-[8px]"
            } ${
              isActive
                ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-[var(--shadow-card-sm)] ring-1 ring-[var(--border-subtle)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]"
            }`}
          >
            <ThemeIcon mode={opt.value} />
            {showLabels && (
              <span className="font-heading text-[13px] font-bold leading-[18px]">
                {opt.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
