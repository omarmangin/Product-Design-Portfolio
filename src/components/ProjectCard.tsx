import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/types/content";

interface ProjectCardProps {
  study: CaseStudy;
  showOutcome?: boolean;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
  forcePageLoad?: boolean;
}

export function ProjectCard({
  study,
  showOutcome = true,
  priority = false,
  headingLevel: HeadingTag = "h3",
  forcePageLoad = false,
}: ProjectCardProps) {
  const metaLine = study.company
    ? `${study.company}${study.roleType ? ` · ${study.roleType}` : ""} · ${study.timelineBadge}`
    : study.timelineBadge;

  const domainLine = (study.domainTags || []).slice(0, 3).join(" · ");
  const cardAriaLabel = `${study.cardTitle || study.title} (${metaLine}), View case study`;

  const cardClassName = showOutcome
    ? "group relative flex aspect-[1.28/1] w-full flex-col justify-end overflow-hidden rounded-[16px] bg-[#212529] shadow-[var(--shadow-card)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
    : "group relative flex aspect-[1.28/1] w-full flex-col justify-end overflow-hidden rounded-[16px] bg-[#212529] shadow-[var(--shadow-card)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]";

  const cardInner = (
    <>
      {/* Primary Optimized Image via next/image */}
      <Image
        src={study.thumbnail}
        alt={study.title}
        fill
        priority={priority}
        draggable={false}
        sizes={
          showOutcome
            ? "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
            : "(max-width: 743px) 100vw, (max-width: 1440px) 33vw, 460px"
        }
        quality={85}
        className={`object-cover object-top transition-opacity duration-500 ${
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
          sizes={
            showOutcome
              ? "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
              : "(max-width: 743px) 100vw, (max-width: 1440px) 33vw, 460px"
          }
          quality={80}
          className="object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}

      {/* Translucent Frosted-Glass Bottom Scrim: WCAG 2.2 AA compliant contrast */}
      <div
        className="relative z-10 flex w-full flex-col gap-[4px] px-[18px] py-[14px] backdrop-blur-md"
        style={{ backgroundColor: "rgba(22, 27, 34, 0.72)" }}
      >
        <span className="font-sans text-[11px] font-medium leading-[16px] text-[#E9ECEF]">
          {metaLine}
        </span>

        <HeadingTag className="font-heading text-[18px] font-bold leading-[24px] text-white">
          {study.cardTitle || study.title}
        </HeadingTag>

        {showOutcome && domainLine && (
          <span className="pt-[2px] font-sans text-[11px] font-medium leading-[16px] text-[#DEE2E6]">
            {domainLine}
          </span>
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
