"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SocialIcon } from "@/components/SocialIcons";
import type { NavItem, SocialLink } from "@/types/content";

interface HeaderProps {
  author: string;
  nav: NavItem[];
  socials?: SocialLink[];
}

export function Header({ author, nav, socials = [] }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header
      className="sticky top-0 z-50 w-full header-padding backdrop-blur-md transition-colors"
      style={{ backgroundColor: "var(--surface-overlay)" }}
    >
      {/* Skip to main content link for keyboard and screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[60px] focus:bg-[var(--cta-bg)] focus:px-4 focus:py-2 focus:font-heading focus:text-[14px] focus:font-bold focus:text-[var(--cta-fg)] focus:shadow-lg"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-[16px]">
        <Link
          href="/"
          aria-label={`${author}, Home`}
          className="shrink-0 rounded-[8px] font-heading text-[24px] font-bold leading-[32px] text-[var(--text-heading)] transition-colors hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
        >
          {author}
        </Link>

        {/* Desktop Navigation (>= 1024px) */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-[16px] lg:flex xl:gap-[24px]"
        >
          <ul className="flex items-center gap-[12px] list-none p-0 m-0 xl:gap-[20px]">
            {nav.map((item) => {
              const isCurrent =
                !item.external &&
                (item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href));

              const isResumeCta = item.external;

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
                    className={
                      isResumeCta
                        ? "inline-flex items-center whitespace-nowrap rounded-[60px] bg-[var(--cta-bg)] px-[18px] py-[8px] font-heading text-[14px] font-bold leading-[20px] text-[var(--cta-fg)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                        : `inline-flex items-center whitespace-nowrap rounded-[60px] px-[16px] py-[8px] font-heading text-[16px] font-bold leading-[24px] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${
                            isCurrent ? "bg-[var(--bg-surface-hover)]" : ""
                          }`
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {socials.length > 0 && (
            <ul
              aria-label="Contact links"
              className="flex items-center gap-[8px] list-none p-0 m-0"
            >
              {socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target={social.platform !== "email" ? "_blank" : undefined}
                    rel={
                      social.platform !== "email"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={
                      social.platform !== "email"
                        ? `${social.label} (opens in a new tab)`
                        : `Send an email (${social.label})`
                    }
                    className="inline-flex rounded-[8px] p-[6px] text-[var(--text-primary)] transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                  >
                    <SocialIcon platform={social.platform} size={24} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* Tablet & Mobile Navigation (< 1024px) */}
        <div className="relative lg:hidden">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            className="flex items-center justify-center rounded-[12px] p-[6px] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
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
              className="absolute right-0 mt-2 min-w-[260px] rounded-[16px] bg-[var(--bg-surface)] p-3 shadow-lg ring-1 ring-[var(--border-subtle)]"
            >
              <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
                {nav.map((item) => {
                  const isCurrent =
                    !item.external &&
                    (item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href));
                  const isResumeCta = item.external;

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
                        className={
                          isResumeCta
                            ? "mt-1 block rounded-[60px] bg-[var(--cta-bg)] px-[16px] py-[8px] text-center font-heading text-[14px] font-bold leading-[20px] text-[var(--cta-fg)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                            : `block rounded-[60px] px-[16px] py-[8px] font-heading text-[16px] font-bold leading-[24px] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${
                                isCurrent ? "bg-[var(--bg-surface-hover)]" : ""
                              }`
                        }
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {socials.length > 0 && (
                <ul
                  aria-label="Mobile contact links"
                  className="mt-2 flex w-full items-center gap-[8px] border-t border-[var(--border-subtle)] pt-2 list-none p-0 m-0"
                >
                  {socials.map((social) => (
                    <li key={social.platform} className="flex-1">
                      <a
                        href={social.href}
                        target={
                          social.platform !== "email" ? "_blank" : undefined
                        }
                        rel={
                          social.platform !== "email"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        aria-label={
                          social.platform !== "email"
                            ? `${social.label} (opens in a new tab)`
                            : `Send an email (${social.label})`
                        }
                        onClick={() => setMenuOpen(false)}
                        className="flex w-full items-center justify-center rounded-[12px] px-[12px] py-[8px] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                      >
                        <SocialIcon platform={social.platform} size={24} />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
