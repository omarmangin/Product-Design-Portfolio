"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BentoCard, BentoGrid } from "@/components/ui/BentoGrid";
import { FramerImage } from "@/components/ui/FramerImage";
import type { CaseStudy, CaseStudySection } from "@/types/content";

type VideoShowcaseData = Extract<CaseStudySection, { type: "video-showcase" }>;

interface VideoShowcaseSectionProps {
  section: VideoShowcaseData;
  theme: CaseStudy["theme"];
  headingId: string;
}

const subscribeReducedMotion = (callback: () => void) => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getServerReducedMotionSnapshot = () => false;

export function VideoShowcaseSection({
  section,
  theme,
  headingId,
}: VideoShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot
  );
  const isPaused = userPaused ?? prefersReducedMotion;

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;
    const videos = container.querySelectorAll("video");
    videos.forEach((video) => {
      if (isPaused) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    });
  }, [isPaused]);

  const borderColor = section.borderColor || theme.borderColor || "#5A5AFF";

  return (
    <section
      ref={sectionRef}
      aria-labelledby={headingId}
      className="section-padding flex w-full min-w-0 flex-col items-center overflow-x-hidden gap-[24px]"
    >
      <div className="flex w-full min-w-0 max-w-[1440px] flex-col gap-[24px]">
        <div className="flex flex-wrap items-center justify-between gap-[12px]">
          <h2
            id={headingId}
            className="font-display text-[32px] font-normal leading-[1.3] text-[#212529]"
          >
            {section.heading}
          </h2>

          <button
            type="button"
            onClick={() => setUserPaused(!isPaused)}
            aria-pressed={isPaused}
            className="inline-flex items-center gap-[8px] rounded-[60px] border border-black/15 bg-white px-[14px] py-[6px] font-sans text-[13px] font-medium leading-[18px] text-[#495057] transition-colors hover:bg-[#E9ECEF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B52E6]"
          >
            {isPaused ? (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
                Play animations
              </>
            ) : (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                Pause animations
              </>
            )}
          </button>
        </div>

        <BentoGrid columns={2}>
          {section.items.map((item) => {
            if (item.horizontalSplit) {
              return (
                <article
                  key={item.title}
                  className="grid grid-cols-1 items-center gap-[24px] overflow-hidden rounded-[24px] bg-white p-[24px] shadow-[0px_2px_6px_rgba(0,0,0,0.04)] md:col-span-2 lg:grid-cols-12"
                >
                  <div className="flex flex-col justify-center self-center lg:col-span-4">
                    <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[#212529]">
                      {item.title}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 lg:col-span-8">
                    {item.videos?.map((vSrc, i) => (
                      <video
                        key={vSrc}
                        src={encodeURI(vSrc)}
                        aria-label={`${item.title} demonstration ${i + 1}`}
                        autoPlay={!isPaused}
                        loop
                        muted
                        playsInline
                        className="mx-auto max-h-[360px] w-full rounded-[16px] object-contain"
                        style={{ border: `2px solid ${borderColor}` }}
                      />
                    ))}
                    {item.images?.map((imgSrc, i) => (
                      <div
                        key={imgSrc}
                        className="overflow-hidden rounded-[16px]"
                        style={{ border: `2px solid ${borderColor}` }}
                      >
                        <FramerImage
                          src={imgSrc}
                          alt={`${item.title} preview ${i + 1}`}
                          sizes="480px"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </article>
              );
            }

            return (
              <BentoCard
                key={item.title}
                title={item.title}
                titleAlign="left"
                colSpan={item.fullWidth ? 2 : 1}
              >
                {item.videos && item.videos.length > 0 && (
                  <div
                    className={`grid grid-cols-1 gap-[16px] ${
                      item.videos.length > 1 ? "sm:grid-cols-2" : ""
                    }`}
                  >
                    {item.videos.map((vSrc, i) => (
                      <div
                        key={vSrc}
                        className="flex h-[220px] w-full items-center justify-center overflow-hidden rounded-[16px] bg-[#F8F9FB] lg:h-[250px]"
                        style={{ border: `2px solid ${borderColor}` }}
                      >
                        <video
                          src={encodeURI(vSrc)}
                          aria-label={`${item.title} interaction demonstration ${
                            item.videos && item.videos.length > 1 ? i + 1 : ""
                          }`}
                          autoPlay={!isPaused}
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </BentoCard>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
