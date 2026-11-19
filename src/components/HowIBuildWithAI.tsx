import { BentoCard, BentoGrid, BentoSection } from "@/components/ui/BentoGrid";
import type { SiteConfig } from "@/types/content";

interface HowIBuildWithAIProps {
  aiWorkflow: SiteConfig["aiWorkflow"];
  headingId?: string;
}

export function HowIBuildWithAI({
  aiWorkflow,
  headingId = "how-i-build-with-ai",
}: HowIBuildWithAIProps) {
  if (!aiWorkflow || !aiWorkflow.items || aiWorkflow.items.length === 0) {
    return null;
  }

  return (
    <BentoSection
      heading={aiWorkflow.heading}
      headingId={headingId}
      description={aiWorkflow.description}
    >
      <BentoGrid columns={3} asList ariaLabel={aiWorkflow.heading}>
        {aiWorkflow.items.map((item) => (
          <li key={item.title} className="flex">
            <BentoCard
              as="article"
              title={item.title}
              description={item.description}
              className="w-full"
            />
          </li>
        ))}
      </BentoGrid>
    </BentoSection>
  );
}
