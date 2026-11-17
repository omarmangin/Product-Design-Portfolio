"use client";

import { useState } from "react";
import { FramerImage } from "@/components/ui/FramerImage";
import type { SlideItem } from "@/types/content";

interface SlideshowProps {
  slides: SlideItem[];
  label?: string;
  cardMaxWidth?: number;
  headingLevel?: "h3" | "h4";
}

/**
 * Peeking Carousel / Slideshow matching Framer's Slideshow component (node bRPdZx28w):
 * - Container max-width 896px with overflow-visible so adjacent slides peek on left & right
 * - Active slide: opacity 1, scale 1
 * - Adjacent slides: opacity 0.5, scale 0.85, clickable to navigate
 */
export function Slideshow({
  slides,
  label = "Design showcase",
  cardMaxWidth = 728,
  headingLevel: HeadingTag = "h4",
}: SlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!slides || slides.length === 0) return null;

  const total = slides.length;
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  const prev = () => setActiveIndex(prevIndex);
  const next = () => setActiveIndex(nextIndex);

  const currentSlide = slides[activeIndex];

  const renderSlideCard = (slide: SlideItem, isPriority = false) => (
    <div className="flex w-full flex-col gap-[16px] rounded-[24px] bg-white p-[20px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.16)] sm:p-[24px]">
      {/* Subtitles 2 preset: Archivo Black 16px, line-height 24px */}
      <HeadingTag className="font-display text-[16px] font-normal leading-[24px] text-[#212529]">
        {slide.title}
      </HeadingTag>

      {slide.images && slide.images.length > 0 ? (
        <div className="flex flex-col items-center justify-center gap-[16px] sm:flex-row">
          {slide.images.map((imgSrc, i) => (
            <div key={imgSrc} className="overflow-hidden rounded-[8px]">
              <FramerImage
                src={imgSrc}
                alt={`${slide.title} view ${i + 1}`}
                priority={isPriority}
                sizes={`(max-width: 768px) 90vw, ${Math.round(cardMaxWidth / 2)}px`}
                className="max-h-[420px] w-auto rounded-[8px] object-contain"
              />
            </div>
          ))}
        </div>
      ) : slide.image ? (
        <div className="w-full overflow-hidden rounded-[8px]">
          <FramerImage
            src={slide.image}
            alt={slide.alt || slide.title}
            priority={isPriority}
            sizes={`(max-width: 768px) 90vw, ${cardMaxWidth}px`}
            className="w-full h-auto rounded-[8px] object-contain"
          />
        </div>
      ) : null}
    </div>
  );

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label} (${total} slides)`}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          prev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          next();
        }
      }}
      className="relative mx-auto flex w-full flex-col items-center gap-[20px] overflow-x-clip py-[8px]"
    >
      {/* Screen-reader live region announcing active slide */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {activeIndex + 1} of {total}: {currentSlide.title}
      </div>

      {/* Peeking stage container matching Framer's maxWidth=896px with overflow=true */}
      <div className="relative flex w-full max-w-[1440px] items-center justify-center">
        {/* Previous Peeking Slide (visible on desktop/tablet when > 1 slide) */}
        {total > 1 && (
          <div
            aria-hidden="true"
            onClick={prev}
            className="pointer-events-auto absolute right-1/2 hidden w-[82%] -translate-x-[46%] scale-[0.82] cursor-pointer opacity-45 transition-all duration-500 ease-out hover:opacity-65 md:block"
            style={{ maxWidth: `${cardMaxWidth}px` }}
          >
            {renderSlideCard(slides[prevIndex], false)}
          </div>
        )}

        {/* Active Center Slide */}
        <article
          className="relative z-10 w-[92%] transition-all duration-500 ease-out sm:w-[86%] md:w-full"
          style={{ maxWidth: `${cardMaxWidth}px` }}
        >
          {renderSlideCard(currentSlide, true)}
        </article>

        {/* Next Peeking Slide (visible on desktop/tablet when > 1 slide) */}
        {total > 1 && (
          <div
            aria-hidden="true"
            onClick={next}
            className="pointer-events-auto absolute left-1/2 hidden w-[82%] translate-x-[46%] scale-[0.82] cursor-pointer opacity-45 transition-all duration-500 ease-out hover:opacity-65 md:block"
            style={{ maxWidth: `${cardMaxWidth}px` }}
          >
            {renderSlideCard(slides[nextIndex], false)}
          </div>
        )}

        {/* Left / Right Controls matching Framer Slideshow arrowOptions */}
        {total > 1 && (
          <div className="pointer-events-none absolute inset-y-0 z-20 flex w-full max-w-[896px] items-center justify-between px-2 sm:px-4">
            <button
              type="button"
              onClick={prev}
              aria-label={`Previous slide (currently ${activeIndex + 1} of ${total})`}
              className="pointer-events-auto flex h-[36px] w-[36px] items-center justify-center rounded-[40px] text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
              onClick={next}
              aria-label={`Next slide (currently ${activeIndex + 1} of ${total})`}
              className="pointer-events-auto flex h-[36px] w-[36px] items-center justify-center rounded-[40px] text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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

      {/* Pagination Dots */}
      {total > 1 && (
        <div
          role="tablist"
          aria-label="Slide selector"
          className="z-20 flex items-center gap-[16px] rounded-[50px] px-[14px] py-[8px] backdrop-blur-[4px]"
          style={{ backgroundColor: "rgba(33, 37, 41, 0.32)" }}
        >
          {slides.map((slide, idx) => (
            <button
              key={`${slide.title}-${idx}`}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`Slide ${idx + 1}: ${slide.title}`}
              onClick={() => setActiveIndex(idx)}
              className={`h-[8px] w-[8px] rounded-full bg-white transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                idx === activeIndex ? "scale-125 opacity-100" : "opacity-50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
