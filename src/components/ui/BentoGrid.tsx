import type { ReactNode } from "react";

interface BentoSectionProps {
  id?: string;
  heading?: string;
  headingId?: string;
  headingColor?: string;
  description?: string;
  variant?: "default" | "brand" | "hero";
  gradient?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Semantic <section> wrapper enforcing the Framer baseline max-width (1440px),
 * responsive padding tokens, and WCAG 2.2 AA heading hierarchy.
 */
export function BentoSection({
  id,
  heading,
  headingId,
  headingColor,
  description,
  variant = "default",
  gradient,
  children,
  className = "",
}: BentoSectionProps) {
  const isInverse = variant === "brand" || variant === "hero";
  const paddingClass =
    variant === "hero" ? "hero-padding" : "section-padding";
  const resolvedHeadingId =
    headingId ||
    (heading
      ? `section-${heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
      : undefined);

  return (
    <section
      id={id}
      aria-labelledby={resolvedHeadingId}
      className={`${paddingClass} flex w-full min-w-0 flex-col items-center overflow-x-hidden ${
        variant === "brand" ? "gap-[40px] lg:gap-[64px]" : "gap-[24px]"
      } ${className}`}
      style={gradient ? { background: gradient } : undefined}
    >
      <div
        className={`flex w-full min-w-0 max-w-[1440px] flex-col ${
          variant === "brand" ? "gap-[40px] lg:gap-[64px]" : "gap-[24px]"
        }`}
      >
        {(heading || description) && (
          <div className="flex flex-col gap-[8px]">
            {heading && (
              <h2
                id={resolvedHeadingId}
                className={`font-display text-[32px] font-normal leading-[1.3] ${
                  isInverse ? "text-[#F8F9FB]" : "text-[#212529]"
                }`}
                style={headingColor ? { color: headingColor } : undefined}
              >
                {heading}
              </h2>
            )}
            {description && (
              <p
                className={`w-full max-w-[1440px] font-sans text-[16px] font-normal leading-[24px] ${
                  isInverse ? "text-[#F8F9FB]" : "text-[#212529]"
                }`}
              >
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

interface BentoGridProps {
  columns?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
  asList?: boolean;
  ariaLabel?: string;
}

/**
 * Responsive Bento Grid container matching Framer's 24px gap and 1440px maxWidth tokens.
 */
export function BentoGrid({
  columns = 2,
  children,
  className = "",
  asList = false,
  ariaLabel,
}: BentoGridProps) {
  const colClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : columns === 3
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  if (asList) {
    return (
      <ul
        aria-label={ariaLabel}
        className={`grid w-full max-w-[1440px] ${colClass} gap-[24px] list-none p-0 m-0 ${className}`}
      >
        {children}
      </ul>
    );
  }

  return (
    <div
      className={`grid w-full max-w-[1440px] ${colClass} gap-[24px] ${className}`}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  title?: string;
  titleColor?: string;
  titleTag?: "h2" | "h3" | "h4";
  titleAlign?: "left" | "center";
  description?: string;
  colSpan?: 1 | 2 | 3;
  variant?: "surface" | "glass" | "subtle";
  children?: ReactNode;
  className?: string;
  as?: "article" | "div" | "li";
}

/**
 * Reusable Bento Card primitive with 24px radius, 24px padding, and top-aligned content.
 */
export function BentoCard({
  title,
  titleColor,
  titleTag = "h3",
  titleAlign = "left",
  description,
  colSpan = 1,
  variant = "surface",
  children,
  className = "",
  as: Component = "article",
}: BentoCardProps) {
  const spanClass =
    colSpan === 2
      ? "md:col-span-2"
      : colSpan === 3
      ? "md:col-span-3"
      : "";

  const surfaceClass =
    variant === "surface"
      ? "bg-white text-[#212529] shadow-[0px_2px_6px_rgba(0,0,0,0.04)]"
      : variant === "glass"
      ? "bg-white/12 text-[#F8F9FB] backdrop-blur-md ring-1 ring-white/20"
      : "bg-[#F5F5F5] text-[#212529]";

  const HeadingTag = titleTag;

  return (
    <Component
      className={`flex flex-col justify-start gap-[16px] overflow-hidden rounded-[24px] p-[24px] ${surfaceClass} ${spanClass} ${className}`}
    >
      {(title || description) && (
        <div className="flex flex-col gap-[8px]">
          {title && (
            <HeadingTag
              className={`font-heading text-[24px] font-bold leading-[32px] ${
                titleAlign === "center" ? "text-center" : ""
              }`}
              style={titleColor ? { color: titleColor } : undefined}
            >
              {title}
            </HeadingTag>
          )}
          {description && (
            <p className="font-sans text-[16px] font-normal leading-[24px] whitespace-pre-line">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </Component>
  );
}
