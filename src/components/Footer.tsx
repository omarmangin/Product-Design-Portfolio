"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
    track.scrollBy({
      left: direction * 278,
      behavior: "smooth",
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
      style={{ backgroundColor: "rgba(245, 245, 245, 0.88)" }}
    >
      {showOtherProjects && otherProjects.length > 0 && (
        <section
          aria-labelledby="other-projects-heading"
          className="flex w-full min-w-0 max-w-[1440px] flex-col items-center gap-[24px]"
        >
          <h2
            id="other-projects-heading"
            className="w-full text-left font-display text-[32px] font-normal leading-[1.4] text-[#212529]"
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
                  className="inline-flex rounded-[8px] p-1 text-[#212529] transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B52E6]"
                >
                  {social.platform === "linkedin" ? (
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  ) : (
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-center font-sans text-[16px] font-normal leading-[24px] text-[#212529]">
          {footerMessage}
        </p>
      </div>
    </footer>
  );
}
