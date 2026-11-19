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
      <div className="flex flex-col gap-[24px] rounded-[24px] bg-white p-[24px] shadow-[0px_2px_6px_rgba(0,0,0,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-[8px] border-b border-black/10 pb-[16px]">
          <span className="font-heading text-[16px] font-bold leading-[24px] text-[#212529]">
            {companyLabel}
          </span>
          <span className="font-sans text-[14px] font-medium leading-[20px] text-[#495057]">
            {summary.timeline || timeline}
          </span>
        </div>

        <dl className="grid grid-cols-1 items-start gap-[24px] md:grid-cols-3 m-0">
          <div className="flex flex-col justify-start gap-[8px]">
            <dt className="font-heading text-[20px] font-bold leading-[28px] text-[#212529]">
              Role &amp; Scope
            </dt>
            <dd className="m-0 font-sans text-[16px] leading-[24px] text-[#212529]">
              {summary.roleAndScope}
            </dd>
          </div>

          <div className="flex flex-col justify-start gap-[8px]">
            <dt className="font-heading text-[20px] font-bold leading-[28px] text-[#212529]">
              Core Decision
            </dt>
            <dd className="m-0 font-sans text-[16px] leading-[24px] text-[#212529]">
              {summary.coreDecision}
            </dd>
          </div>

          <div className="flex flex-col justify-start gap-[8px]">
            <dt className="font-heading text-[20px] font-bold leading-[28px] text-[#212529]">
              Verified Outcome
            </dt>
            <dd className="m-0 font-sans text-[16px] leading-[24px] text-[#212529]">
              {summary.verifiedOutcome}
            </dd>
          </div>
        </dl>

        {summary.keywords && summary.keywords.length > 0 && (
          <div className="flex flex-wrap items-center gap-[8px] border-t border-black/10 pt-[16px]">
            <span className="mr-[4px] font-heading text-[13px] font-bold leading-[18px] text-[#212529]">
              Keywords
            </span>
            <ul
              aria-label="Case study keywords"
              className="flex flex-wrap gap-[8px] list-none p-0 m-0"
            >
              {summary.keywords.map((kw) => (
                <li
                  key={kw}
                  className="rounded-[60px] bg-[#E9ECEF] px-[14px] py-[6px] font-sans text-[13px] font-medium leading-[18px] text-[#495057]"
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
