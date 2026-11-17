"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavItem } from "@/types/content";

interface HeaderProps {
  author: string;
  nav: NavItem[];
}

export function Header({ author, nav }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header
      className="sticky top-0 z-50 w-full header-padding backdrop-blur-md transition-colors"
      style={{ backgroundColor: "rgba(245, 245, 245, 0.88)" }}
    >
      {/* Skip to main content link for keyboard and screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[60px] focus:bg-[#212529] focus:px-4 focus:py-2 focus:font-heading focus:text-[14px] focus:font-bold focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between">
        <Link
          href="/"
          aria-label={`${author} — Home`}
          className="rounded-[8px] font-heading text-[24px] font-bold leading-[32px] text-[#111111] transition-colors hover:text-[#444444] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B52E6]"
        >
          {author}
        </Link>

        {/* Desktop Navigation (>= 1024px) */}
        <nav aria-label="Primary navigation" className="hidden lg:block">
          <ul className="flex items-center gap-[32px] list-none p-0 m-0">
            {nav.map((item) => {
              const isCurrent =
                !item.external &&
                (item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href));

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    aria-current={isCurrent ? "page" : undefined}
                    aria-label={
                      item.external
                        ? `${item.label} (opens in a new tab)`
                        : undefined
                    }
                    className={` inline-flex items-center rounded-[60px] px-[16px] py-[8px] font-heading text-[16px] font-bold leading-[24px] text-[#212529] transition-colors hover:bg-[#e9ecef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B52E6] ${
                      isCurrent ? "bg-[#e9ecef]" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Tablet & Mobile Navigation (< 1024px) */}
        <div className="relative lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            className="flex items-center justify-center rounded-[12px] p-[6px] text-[#212529] transition-colors hover:bg-[#e9ecef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B52E6]"
          >
            {menuOpen ? (
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          {menuOpen && (
            <nav
              id="mobile-nav-menu"
              aria-label="Mobile navigation"
              className="absolute right-0 mt-2 min-w-[200px] rounded-[16px] bg-white p-3 shadow-lg ring-1 ring-black/10"
            >
              <ul className="flex flex-col gap-1 list-none p-0 m-0">
                {nav.map((item) => {
                  const isCurrent =
                    !item.external &&
                    (item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href));
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        aria-current={isCurrent ? "page" : undefined}
                        aria-label={
                          item.external
                            ? `${item.label} (opens in a new tab)`
                            : undefined
                        }
                        onClick={() => setMenuOpen(false)}
                        className={`block rounded-[60px] px-[16px] py-[8px] font-heading text-[16px] font-bold leading-[24px] text-[#212529] transition-colors hover:bg-[#e9ecef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B52E6] ${
                          isCurrent ? "bg-[#e9ecef]" : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
