import { BentoSection } from "@/components/ui/BentoGrid";
import type { ExecutiveSummary } from "@/types/content";

interface ExecutiveSummaryCardProps {
  summary: ExecutiveSummary;
  company: string;
  timeline: string;
  roleType?: string;
}

export function ExecutiveSummaryCard({
  summary,
  company,
  timeline,
  roleType,
}: ExecutiveSummaryCardProps) {
  const companyLabel = roleType ? `${company} (${roleType})` : company;

  return (
    <BentoSection
      heading="Executive summary"
      headingId="executive-summary-heading"
    >
      <div className="flex flex-col gap-[24px] rounded-[24px] bg-[var(--bg-surface)] p-[24px] shadow-[var(--shadow-card-sm)]">
        <div className="flex flex-wrap items-center justify-between gap-[8px] border-b border-[var(--border-subtle)] pb-[16px]">
          <span className="font-heading text-[16px] font-bold leading-[24px] text-[var(--text-primary)]">
            {companyLabel}
          </span>
          <span className="font-sans text-[14px] font-medium leading-[20px] text-[var(--text-secondary)]">
            {summary.timeline || timeline}
          </span>
        </div>

        <dl className="grid grid-cols-1 items-start gap-[24px] md:grid-cols-3 m-0">
          <div className="flex flex-col justify-start gap-[8px]">
            <dt className="font-heading text-[20px] font-bold leading-[28px] text-[var(--text-primary)]">
              Role &amp; Scope
            </dt>
            <dd className="m-0 font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
              {summary.roleAndScope}
            </dd>
          </div>

          <div className="flex flex-col justify-start gap-[8px]">
            <dt className="font-heading text-[20px] font-bold leading-[28px] text-[var(--text-primary)]">
              Core Decision
            </dt>
            <dd className="m-0 font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
              {summary.coreDecision}
            </dd>
          </div>

          <div className="flex flex-col justify-start gap-[8px]">
            <dt className="font-heading text-[20px] font-bold leading-[28px] text-[var(--text-primary)]">
              Verified Outcome
            </dt>
            <dd className="m-0 font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
              {summary.verifiedOutcome}
            </dd>
          </div>
        </dl>

        {summary.keywords && summary.keywords.length > 0 && (
          <div className="flex flex-wrap items-center gap-[8px] border-t border-[var(--border-subtle)] pt-[16px]">
            <span className="mr-[4px] font-heading text-[13px] font-bold leading-[18px] text-[var(--text-primary)]">
              Keywords
            </span>
            <ul
              aria-label="Case study keywords"
              className="flex flex-wrap gap-[8px] list-none p-0 m-0"
            >
              {summary.keywords.map((kw) => (
                <li
                  key={kw}
                  className="rounded-[60px] bg-[var(--pill-bg)] px-[14px] py-[6px] font-sans text-[13px] font-medium leading-[18px] text-[var(--text-secondary)]"
                >
                  {kw}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </BentoSection>
  );
}
