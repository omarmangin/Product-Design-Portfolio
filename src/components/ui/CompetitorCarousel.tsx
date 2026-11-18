"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FramerImage } from "@/components/ui/FramerImage";

export interface CompetitorItem {
  name: string;
  logo: string;
}

interface CompetitorCarouselProps {
  competitors: CompetitorItem[];
}

/**
 * Accessible horizontal competitor logo carousel matching Framer node TfE_H0sw1
 * (120×120px rounded tiles, 8px padding, 104px logo, Archivo 12px Bold labels),
 * equipped with clickable chevrons, keyboard ArrowLeft/ArrowRight navigation,
 * pointer drag-to-scroll, and a visible scrollbar when overflowing.
 */
export function CompetitorCarousel({ competitors }: CompetitorCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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
  }, [competitors.length, updateScrollState]);

  const scrollByStep = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * 288,
      behavior: "smooth",
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current;
    if (!track || track.scrollWidth <= track.clientWidth) return;

    const startX = e.clientX;
    const startScrollLeft = track.scrollLeft;
    let dragged = false;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      if (Math.abs(deltaX) > 6) {
        dragged = true;
        setIsDragging(true);
      }
      if (dragged) {
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

  const isScrollable = canScrollPrev || canScrollNext;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`Competitors analyzed (${competitors.length} items)`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          scrollByStep(-1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          scrollByStep(1);
        }
      }}
      className="relative w-full min-w-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B52E6]"
    >
      <ul
        ref={trackRef}
        onScroll={updateScrollState}
        onPointerDown={handlePointerDown}
        onDragStart={(e) => e.preventDefault()}
        className={`flex w-full min-w-0 flex-nowrap items-start gap-[24px] overflow-x-auto py-[4px] pb-[8px] touch-pan-x [-webkit-overflow-scrolling:touch] list-none p-0 m-0 ${
          isDragging
            ? "snap-none cursor-grabbing select-none"
            : "snap-x snap-mandatory cursor-grab"
        }`}
      >
        {competitors.map((comp) => (
          <li
            key={comp.name}
            className="flex shrink-0 snap-start flex-col items-center gap-[8px]"
          >
            <div className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-[16px] bg-[#F5F5F5] p-[8px]">
              <FramerImage
                src={comp.logo}
                alt={comp.name}
                sizes="104px"
                className="h-auto max-h-[104px] w-[104px] object-contain select-none"
              />
            </div>
            <span className="text-center font-heading text-[12px] font-bold leading-[16px] text-[#212529]">
              {comp.name}
            </span>
          </li>
        ))}
      </ul>

      {isScrollable && (
        <div className="pointer-events-none absolute inset-x-0 top-[44px] z-10 flex items-center justify-between px-1">
          <button
            type="button"
            onClick={() => scrollByStep(-1)}
            disabled={!canScrollPrev}
            aria-label="Previous competitors"
            className="pointer-events-auto flex h-[32px] w-[32px] items-center justify-center rounded-[40px] text-white backdrop-blur-md transition-opacity hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B52E6] disabled:pointer-events-none disabled:opacity-0"
            style={{ backgroundColor: "rgba(33, 37, 41, 0.45)" }}
          >
            <svg
              width="16"
              height="16"
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
            onClick={() => scrollByStep(1)}
            disabled={!canScrollNext}
            aria-label="Next competitors"
            className="pointer-events-auto flex h-[32px] w-[32px] items-center justify-center rounded-[40px] text-white backdrop-blur-md transition-opacity hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B52E6] disabled:pointer-events-none disabled:opacity-0"
            style={{ backgroundColor: "rgba(33, 37, 41, 0.45)" }}
          >
            <svg
              width="16"
              height="16"
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
  );
}
