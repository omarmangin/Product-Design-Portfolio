import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/types/content";

interface ProjectCardProps {
  study: CaseStudy;
  showDescription?: boolean;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
  forcePageLoad?: boolean;
}

export function ProjectCard({
  study,
  showDescription = false,
  priority = false,
  headingLevel: HeadingTag = "h3",
  forcePageLoad = false,
}: ProjectCardProps) {
  const cardClassName =
    "group relative flex aspect-[1.28/1] w-full flex-col justify-end overflow-hidden rounded-[16px] bg-[#212529] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#3B52E6]";
  const cardAriaLabel = `${study.title} (${study.timelineBadge}) — View case study`;

  const cardInner = (
    <>
      {/* Primary Optimized Image via next/image */}
      <Image
        src={study.thumbnail}
        alt={study.title}
        fill
        priority={priority}
        draggable={false}
        sizes="(max-width: 743px) 100vw, (max-width: 1440px) 50vw, 708px"
        quality={85}
        className={`object-cover transition-opacity duration-500 ${
          study.thumbnailHover ? "group-hover:opacity-0" : ""
        }`}
      />

      {/* Secondary Hover Variant Image */}
      {study.thumbnailHover && (
        <Image
          src={study.thumbnailHover}
          alt=""
          aria-hidden="true"
          fill
          draggable={false}
          sizes="(max-width: 743px) 100vw, (max-width: 1440px) 50vw, 708px"
          quality={80}
          className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}

      {/* Bottom Scrim Overlay: WCAG 2.2 AA compliant contrast (>= 7:1 for white text) */}
      <div
        className="relative z-10 flex w-full flex-col px-[24px] py-[16px] backdrop-blur-md"
        style={{ backgroundColor: "rgba(22, 27, 34, 0.72)" }}
      >
        <span className="font-heading text-[12px] font-bold leading-[16px] text-white">
          {study.timelineBadge}
        </span>
        <HeadingTag className="font-heading text-[20px] font-bold leading-[32px] text-white">
          {study.cardTitle || study.title}
        </HeadingTag>
        {showDescription && study.thumbnailDescription && (
          <p className="mt-1 font-sans text-[16px] font-normal leading-[24px] text-white">
            {study.thumbnailDescription}
          </p>
        )}
      </div>
    </>
  );

  return (
    <article className="h-full w-full">
      {forcePageLoad ? (
        <a
          href={`/${study.slug}`}
          draggable={false}
          aria-label={cardAriaLabel}
          className={cardClassName}
        >
          {cardInner}
        </a>
      ) : (
        <Link
          href={`/${study.slug}`}
          draggable={false}
          aria-label={cardAriaLabel}
          className={cardClassName}
        >
          {cardInner}
        </Link>
      )}
    </article>
  );
}
