"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SocialIcon } from "@/components/SocialIcons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { CaseStudy, SocialLink } from "@/types/content";
import { ProjectCard } from "./ProjectCard";

interface FooterProps {
  socials: SocialLink[];
  footerMessage: string;
  otherProjects?: CaseStudy[];
  showOtherProjects?: boolean;
}

export function Footer({
  socials,
  footerMessage,
  otherProjects = [],
  showOtherProjects = false,
}: FooterProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const didDragRef = useRef(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    setCanScrollPrev(track.scrollLeft > 2);
    setCanScrollNext(track.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    updateScrollState();
    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(() => {
      updateScrollState();
    });
    observer.observe(track);
    window.addEventListener("resize", updateScrollState);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScrollState);
    };
  }, [otherProjects.length, updateScrollState]);

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    track.scrollBy({
      left: direction * 278,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current;
    if (!track || track.scrollWidth <= track.clientWidth) return;

    const startX = e.clientX;
    const startScrollLeft = track.scrollLeft;
    didDragRef.current = false;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      if (Math.abs(deltaX) > 6) {
        didDragRef.current = true;
        setIsDragging(true);
      }
      if (didDragRef.current) {
        track.scrollLeft = startScrollLeft - deltaX;
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
  };

  return (
    <footer
      className="footer-padding flex w-full flex-col items-center gap-[40px] overflow-x-hidden"
      style={{ backgroundColor: "var(--surface-overlay)" }}
    >
      {showOtherProjects && otherProjects.length > 0 && (
        <section
          aria-labelledby="other-projects-heading"
          className="flex w-full min-w-0 max-w-[1440px] flex-col items-center gap-[24px]"
        >
          <h2
            id="other-projects-heading"
            className="w-full text-left font-display text-[32px] font-normal leading-[1.4] text-[var(--text-primary)]"
          >
            Check some of my other projects
          </h2>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label={`Other case studies (${otherProjects.length} projects)`}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                scrollByCard(-1);
              } else if (e.key === "ArrowRight") {
                e.preventDefault();
                scrollByCard(1);
              }
            }}
            className="relative w-full min-w-0"
          >
            <nav aria-label="Other case studies" className="w-full min-w-0">
              <ul
                ref={trackRef}
                onScroll={updateScrollState}
                onPointerDown={handlePointerDown}
                onClickCapture={(e) => {
                  if (didDragRef.current) {
                    e.preventDefault();
                    e.stopPropagation();
                    didDragRef.current = false;
                  }
                }}
                className={`flex w-full min-w-0 flex-nowrap gap-[16px] overflow-x-auto pb-3 pr-4 touch-pan-x [-webkit-overflow-scrolling:touch] list-none p-0 m-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 lg:pr-0 ${
                  isDragging
                    ? "snap-none cursor-grabbing select-none"
                    : "snap-x snap-mandatory cursor-grab lg:cursor-default"
                }`}
              >
                {otherProjects.map((project) => (
                  <li
                    key={project.slug}
                    className="w-[262px] shrink-0 snap-start sm:w-[300px] lg:w-full"
                  >
                    <ProjectCard
                      study={project}
                      headingLevel="h3"
                      showOutcome={false}
                      forcePageLoad
                    />
                  </li>
                ))}
              </ul>
            </nav>

            {(canScrollPrev || canScrollNext) && (
              <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between px-2 lg:hidden">
                <button
                  type="button"
                  onClick={() => scrollByCard(-1)}
                  disabled={!canScrollPrev}
                  aria-label="Previous projects"
                  className="pointer-events-auto flex h-[36px] w-[36px] items-center justify-center rounded-[40px] text-white backdrop-blur-md transition-opacity hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-0"
                  style={{ backgroundColor: "rgba(33, 37, 41, 0.45)" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCard(1)}
                  disabled={!canScrollNext}
                  aria-label="Next projects"
                  className="pointer-events-auto flex h-[36px] w-[36px] items-center justify-center rounded-[40px] text-white backdrop-blur-md transition-opacity hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-0"
                  style={{ backgroundColor: "rgba(33, 37, 41, 0.45)" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Centered Social Icons + Footer Copy matching Framer node k0ADCJw8B */}
      <div className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-[16px] text-center">
        <nav aria-label="Social and contact links">
          <ul className="flex items-center justify-center gap-[24px] list-none p-0 m-0">
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
                  className="inline-flex rounded-[8px] p-1 text-[var(--text-primary)] transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  <SocialIcon platform={social.platform} size={32} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-center font-sans text-[16px] font-normal leading-[24px] text-[var(--text-primary)]">
          {footerMessage}
        </p>

        <ThemeToggle className="mt-[4px]" />
      </div>
    </footer>
  );
}
