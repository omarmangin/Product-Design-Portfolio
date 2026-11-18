"use client";

import { useMemo, useRef, useState } from "react";
import { FramerImage } from "@/components/ui/FramerImage";
import { getImageDimensions } from "@/lib/asset-dimensions";
import type { SlideItem } from "@/types/content";

interface SlideshowProps {
  slides: SlideItem[];
  label?: string;
  cardMaxWidth?: number;
  headingLevel?: "h3" | "h4";
}

function computeUniformMediaRatio(slides: SlideItem[]): number {
  const ratios: number[] = [];
  for (const slide of slides) {
    if (slide.image) {
      const { width, height } = getImageDimensions(slide.image);
      if (height > 0) {
        ratios.push(width / height);
      }
    } else if (slide.images && slide.images.length > 0) {
      let totalWidth = 0;
      let maxHeight = 0;
      for (const imgSrc of slide.images) {
        const { width, height } = getImageDimensions(imgSrc);
        totalWidth += width;
        if (height > maxHeight) maxHeight = height;
      }
      if (maxHeight > 0) {
        ratios.push(totalWidth / maxHeight);
      }
    }
  }
  if (ratios.length === 0) return 1.59;
  const minRatio = Math.min(...ratios);
  return Math.min(2.1, Math.max(1.35, Number(minRatio.toFixed(3))));
}

/**
 * Peeking Carousel / Slideshow matching Framer's Slideshow component (node bRPdZx28w):
 * - Reserves 2 lines of copy (`min-h-[48px]`) and locks a uniform media aspect ratio
 *   so every slide card maintains the exact same height without jumping
 * - Centers the active slide (`w-full` on Mobile/Tablet < 1024px, `cardMaxWidth` on Desktop >= 1024px)
 *   while positioning previous/next peeking slides (`scale(0.8)`, `opacity: 0.5`) beside it
 *   so adjacent slides overflow past the page margins to the viewport edges
 */
export function Slideshow({
  slides,
  label = "Design showcase",
  cardMaxWidth = 896,
  headingLevel: HeadingTag = "h4",
}: SlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swipeStartXRef = useRef<number | null>(null);
  const didDragRef = useRef(false);

  const uniformMediaRatio = useMemo(
    () => computeUniformMediaRatio(slides || []),
    [slides]
  );

  if (!slides || slides.length === 0) return null;

  const total = slides.length;
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  const goToSlide = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  const prev = () => goToSlide(prevIndex);
  const next = () => goToSlide(nextIndex);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (total <= 1) return;
    swipeStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (total <= 1 || swipeStartXRef.current === null) return;
    const endX = e.changedTouches[0]?.clientX;
    if (typeof endX === "number") {
      const deltaX = endX - swipeStartXRef.current;
      if (deltaX <= -40) {
        next();
      } else if (deltaX >= 40) {
        prev();
      }
    }
    swipeStartXRef.current = null;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || total <= 1) return;
    const startX = e.clientX;
    didDragRef.current = false;

    const handlePointerUp = (upEvent: PointerEvent) => {
      const deltaX = upEvent.clientX - startX;
      if (Math.abs(deltaX) >= 40) {
        didDragRef.current = true;
        if (deltaX < 0) {
          next();
        } else {
          prev();
        }
      }
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };

    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
  };

  const currentSlide = slides[activeIndex];

  const renderSlideCard = (slide: SlideItem, isPriority = false) => (
    <div
      onDragStart={(e) => e.preventDefault()}
      className={`flex h-full w-full flex-col gap-[16px] rounded-[24px] bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.16)] ${
        total > 1
          ? "p-[20px] pb-[40px] sm:p-[24px] sm:pb-[44px]"
          : "p-[20px] sm:p-[24px]"
      }`}
    >
      {/* Subtitles 2 preset: Archivo Black 16px, line-height 24px — always reserve 2 lines so card height never jumps */}
      <HeadingTag className="line-clamp-2 min-h-[48px] font-display text-[16px] font-normal leading-[24px] text-[#212529]">
        {slide.title}
      </HeadingTag>

      {slide.images && slide.images.length > 0 ? (
        <div
          className="flex w-full flex-col items-center justify-center gap-[16px] overflow-hidden rounded-[8px] sm:flex-row sm:aspect-[var(--slide-ratio)]"
          style={
            {
              "--slide-ratio": String(uniformMediaRatio),
            } as React.CSSProperties
          }
        >
          {slide.images.map((imgSrc, i) => (
            <div
              key={imgSrc}
              className="flex h-auto max-h-[280px] items-center justify-center overflow-hidden rounded-[8px] sm:h-full sm:max-h-none"
            >
              <FramerImage
                src={imgSrc}
                alt={`${slide.title} view ${i + 1}`}
                priority={isPriority}
                sizes={`(max-width: 1023px) 48vw, ${Math.round(cardMaxWidth / 2)}px`}
                className="h-auto max-h-[280px] w-auto rounded-[8px] object-contain select-none sm:h-full sm:max-h-none"
              />
            </div>
          ))}
        </div>
      ) : slide.image ? (
        <div
          className="flex w-full items-center justify-center overflow-hidden rounded-[8px]"
          style={{ aspectRatio: uniformMediaRatio }}
        >
          <FramerImage
            src={slide.image}
            alt={slide.alt || slide.title}
            priority={isPriority}
            sizes={`(max-width: 1023px) 96vw, ${cardMaxWidth}px`}
            className="h-full w-full rounded-[8px] object-contain select-none"
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
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          prev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          next();
        }
      }}
      className="relative mx-auto flex w-full min-w-0 flex-col items-center overflow-visible py-[8px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      {/* Screen-reader live region announcing active slide */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {activeIndex + 1} of {total}: {currentSlide.title}
      </div>

      {/* Centered active stage; overflow-visible lets prev/next slides bleed over page margins */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onPointerDown={handlePointerDown}
        onClickCapture={(e) => {
          if (didDragRef.current) {
            e.preventDefault();
            e.stopPropagation();
            didDragRef.current = false;
          }
        }}
        className="relative mx-auto flex w-full items-center justify-center overflow-visible select-none lg:max-w-[var(--card-max-w)]"
        style={
          {
            "--card-max-w": `${cardMaxWidth}px`,
          } as React.CSSProperties
        }
      >
        {/* Previous Peeking Slide (overflows left page margin) */}
        {total > 1 && (
          <div
            aria-hidden="true"
            onClick={prev}
            className="pointer-events-auto absolute top-1/2 right-[calc(100%+8px)] w-full -translate-y-1/2 origin-right scale-[0.8] cursor-pointer opacity-50 transition-all duration-500 ease-out hover:opacity-70 md:right-[calc(100%+24px)]"
          >
            {renderSlideCard(slides[prevIndex], false)}
          </div>
        )}

        {/* Active Center Slide */}
        <article className="relative z-10 w-full transition-all duration-500 ease-out">
          {renderSlideCard(currentSlide, true)}
        </article>

        {/* Next Peeking Slide (overflows right page margin) */}
        {total > 1 && (
          <div
            aria-hidden="true"
            onClick={next}
            className="pointer-events-auto absolute top-1/2 left-[calc(100%+8px)] w-full -translate-y-1/2 origin-left scale-[0.8] cursor-pointer opacity-50 transition-all duration-500 ease-out hover:opacity-70 md:left-[calc(100%+24px)]"
          >
            {renderSlideCard(slides[nextIndex], false)}
          </div>
        )}

        {/* Left / Right Controls pinned to active card edges */}
        {total > 1 && (
          <div className="pointer-events-none absolute inset-x-0 inset-y-0 z-20 flex items-center justify-between px-[12px] sm:px-[16px]">
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

        {/* Inset Pagination Dots matching Framer Slideshow progressOptions */}
        {total > 1 && (
          <div
            role="tablist"
            aria-label="Slide selector"
            className="absolute bottom-[8px] left-1/2 z-20 flex -translate-x-1/2 items-center gap-[16px] rounded-[50px] px-[12px] py-[8px] backdrop-blur-[4px]"
            style={{ backgroundColor: "rgba(33, 37, 41, 0.24)" }}
          >
            {slides.map((slide, idx) => (
              <button
                key={`${slide.title}-${idx}`}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Slide ${idx + 1}: ${slide.title}`}
                onClick={() => goToSlide(idx)}
                className={`h-[8px] w-[8px] rounded-full bg-white transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  idx === activeIndex ? "scale-125 opacity-100" : "opacity-50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
