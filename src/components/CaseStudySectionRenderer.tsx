import { BentoCard, BentoGrid, BentoSection } from "@/components/ui/BentoGrid";
import { CompetitorCarousel } from "@/components/ui/CompetitorCarousel";
import { FramerImage } from "@/components/ui/FramerImage";
import { PrototypeEmbed } from "@/components/ui/PrototypeEmbed";
import { VideoShowcaseSection } from "@/components/VideoShowcaseSection";
import { getImageDimensions } from "@/lib/asset-dimensions";
import type { CaseStudy, CaseStudySection } from "@/types/content";
import { Slideshow } from "./Slideshow";

interface SectionRendererProps {
  section: CaseStudySection;
  theme: CaseStudy["theme"];
  sectionIndex?: number;
}

export function CaseStudySectionRenderer({
  section,
  theme,
  sectionIndex = 0,
}: SectionRendererProps) {
  const headingId = `section-${section.type}-${sectionIndex}`;

  switch (section.type) {
    case "about":
      return (
        <BentoSection
          heading={section.heading || "About the project"}
          headingId={headingId}
        >
          <div className="grid grid-cols-1 items-start gap-[24px] rounded-[24px] bg-[var(--bg-surface)] p-[24px] shadow-[var(--shadow-card-sm)] md:grid-cols-3">
            <div className="flex flex-col justify-start gap-[8px]">
              <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[var(--text-primary)]">
                Company
              </h3>
              <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                {section.company}
              </p>
            </div>
            <div className="flex flex-col justify-start gap-[8px]">
              <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[var(--text-primary)]">
                Timeline
              </h3>
              <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                {section.timeline}
              </p>
            </div>
            <div className="flex flex-col justify-start gap-[8px]">
              <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[var(--text-primary)]">
                My role
              </h3>
              <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                {section.role}
              </p>
            </div>
          </div>
        </BentoSection>
      );

    case "challenges":
      return (
        <BentoSection heading={section.heading} headingId={headingId}>
          <div className="flex flex-col gap-[24px]">
            {/* In Framer, Problem/Context & Challenge 1..3 headings are dark #212529 */}
            <BentoCard
              title={section.overviewTitle}
              titleColor="var(--text-primary)"
              description={section.overviewBody}
            />
            <div className="grid grid-cols-1 items-start gap-[24px] rounded-[24px] bg-[var(--bg-surface)] p-[24px] shadow-[var(--shadow-card-sm)] md:grid-cols-3">
              {section.items.map((item) => (
                <article
                  key={item.title}
                  className="flex flex-col justify-start gap-[8px]"
                >
                  <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </BentoSection>
      );

    case "split-cards":
      return (
        <BentoSection
          heading={section.heading}
          headingId={headingId}
          headingColor={section.headingColor}
          description={section.description}
        >
          <div className="flex flex-col gap-[24px]">
            {section.cards.map((card, cardIdx) => {
              const hasBullets = card.bullets && card.bullets.length > 0;
              return (
                <article
                  key={`${card.title}-${cardIdx}`}
                  className={`grid grid-cols-1 items-center gap-[24px] overflow-hidden rounded-[24px] bg-[var(--bg-surface)] p-[24px] shadow-[var(--shadow-card-sm)] ${
                    hasBullets ? "lg:grid-cols-12" : "lg:grid-cols-2"
                  }`}
                >
                  <div
                    className={`flex flex-col justify-center self-center gap-[20px] ${
                      hasBullets ? "lg:col-span-6 xl:col-span-7" : ""
                    }`}
                  >
                    {hasBullets ? (
                      card.bullets?.map((b) => (
                        <div
                          key={b.title}
                          className="flex flex-col justify-start gap-[8px]"
                        >
                          <h3
                            className="font-heading text-[24px] font-bold leading-[32px]"
                            style={{
                              color:
                                b.accentTitle === true
                                  ? theme.accentColor
                                  : b.accentTitle === false
                                  ? "var(--text-primary)"
                                  : card.accentTitle
                                  ? theme.accentColor
                                  : "var(--text-primary)",
                            }}
                          >
                            {b.title}
                          </h3>
                          <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                            {b.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col justify-start gap-[8px]">
                        <h3
                          className="font-heading text-[24px] font-bold leading-[32px]"
                          style={{
                            color: card.accentTitle
                              ? theme.accentColor
                              : "var(--text-primary)",
                          }}
                        >
                          {card.title}
                        </h3>
                        <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                          {card.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {card.image && (
                    hasBullets ? (
                      <div
                        className={`mx-auto -mb-[24px] aspect-[1/0.98] w-full self-end overflow-hidden rounded-t-[12px] md:w-[80%] lg:col-span-6 lg:w-full xl:col-span-5 ${
                          card.transparentDiagram
                            ? "transparent-diagram-frame p-[12px]"
                            : "dark:border dark:border-[var(--border-subtle)]"
                        }`}
                      >
                        <FramerImage
                          src={card.image}
                          alt={card.title || section.heading}
                          sizes="(max-width: 1023px) 85vw, 560px"
                          className={`h-full w-full object-cover object-top ${
                            card.transparentDiagram ? "" : "case-study-media"
                          }`}
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-full overflow-hidden rounded-[16px] ${
                          card.transparentDiagram
                            ? "transparent-diagram-frame p-[12px]"
                            : "dark:border dark:border-[var(--border-subtle)]"
                        }`}
                      >
                        <FramerImage
                          src={card.image}
                          alt={card.title || section.heading}
                          sizes="(max-width: 1023px) 100vw, 680px"
                          className={`w-full h-auto rounded-[16px] object-cover object-top ${
                            card.transparentDiagram ? "" : "case-study-media"
                          }`}
                        />
                      </div>
                    )
                  )}

                  {card.images && card.images.length > 0 && (
                    <div
                      className={`flex flex-wrap items-start justify-center gap-[16px] sm:flex-nowrap ${
                        hasBullets ? "lg:col-span-5" : ""
                      }`}
                    >
                      {card.images.map((imgSrc, i) => (
                        <div
                          key={imgSrc}
                          className="w-full overflow-hidden rounded-[12px]"
                        >
                          <FramerImage
                            src={imgSrc}
                            alt={`${card.title || section.heading} preview ${i + 1}`}
                            sizes="(max-width: 639px) 100vw, 340px"
                            className="mx-auto max-h-[400px] w-auto rounded-[12px] object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </BentoSection>
      );

    case "research-showcase":
      return (
        <BentoSection heading={section.heading} headingId={headingId}>
          <div className="grid grid-cols-1 items-stretch gap-[24px] lg:grid-cols-2">
            {/* Left Column: Competition + Logo Row */}
            <article className="flex min-w-0 flex-col justify-start gap-[24px] overflow-hidden rounded-[24px] bg-[var(--bg-surface)] p-[24px] shadow-[var(--shadow-card-sm)]">
              <div className="flex flex-col justify-start gap-[8px]">
                <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[var(--text-primary)]">
                  {section.leftCard.title}
                </h3>
                <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                  {section.leftCard.description}
                </p>
              </div>
              <CompetitorCarousel competitors={section.leftCard.competitors} />
            </article>

            {/* Right Column: Stacked Research Cards */}
            <div className="flex flex-col gap-[24px]">
              {section.rightCards.map((rc) => (
                <BentoCard
                  key={rc.title}
                  title={rc.title}
                  titleColor="var(--text-primary)"
                  description={rc.description}
                  className="lg:flex-1"
                />
              ))}
            </div>
          </div>
        </BentoSection>
      );

    case "design-showcase":
      return (
        <BentoSection
          heading={section.heading}
          headingId={headingId}
          description={section.description}
          variant="brand"
          gradient={
            section.gradient || theme.sectionGradient || theme.gradient
          }
        >
          {/* Optional 2x2 Feature Cards Grid (e.g. Unified AI platform architecture on Unified AI) */}
          {section.featureGrid && section.featureGrid.length > 0 && (
            <div className="flex flex-col gap-[24px]">
              {section.featureGridIntro && (
                <div className="flex flex-col justify-start gap-[8px]">
                  <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[#F8F9FB]">
                    {section.featureGridIntro.title}
                  </h3>
                  <p className="w-full max-w-[1440px] font-sans text-[16px] leading-[24px] text-[#F8F9FB]">
                    {section.featureGridIntro.description}
                  </p>
                </div>
              )}
              <BentoGrid columns={2}>
                {section.featureGrid.map((feat) => (
                  <article
                    key={feat.title}
                    className="flex flex-col justify-start gap-[16px] rounded-[24px] bg-[var(--bg-surface)] p-[24px] shadow-[var(--shadow-card)]"
                  >
                    <h4 className="line-clamp-2 min-h-[48px] font-display text-[16px] font-normal leading-[24px] text-[var(--text-primary)]">
                      {feat.title}
                    </h4>
                    <div className="w-full overflow-hidden rounded-[8px]">
                      <FramerImage
                        src={feat.image}
                        alt={feat.title}
                        sizes="(max-width: 768px) 100vw, 680px"
                        className="w-full h-auto rounded-[8px] object-contain"
                      />
                    </div>
                  </article>
                ))}
              </BentoGrid>
            </div>
          )}

          {/* Flows with Peeking Slideshows + What I did / Impact */}
          {section.flows.map((flow, flowIdx) => (
            <div
              key={flow.title || `flow-${flowIdx}`}
              className="flex w-full min-w-0 flex-col gap-[24px]"
            >
              {(flow.title || flow.description) && (
                <div className="flex flex-col justify-start gap-[8px]">
                  {flow.title && (
                    <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[#F8F9FB]">
                      {flow.title}
                    </h3>
                  )}
                  {flow.description && (
                    <p className="w-full max-w-[1440px] font-sans text-[16px] leading-[24px] text-[#F8F9FB]">
                      {flow.description}
                    </p>
                  )}
                </div>
              )}

              {flow.slides && flow.slides.length > 0 && (
                <Slideshow
                  slides={flow.slides}
                  label={flow.title || section.heading}
                  cardMaxWidth={section.cardMaxWidth || 896}
                  headingLevel={flow.title ? "h4" : "h3"}
                />
              )}

              {/* In Framer, What I did & Impact cards inside Design sections are solid white (#FFFFFF), top-aligned, with Subtitles 2 (Archivo Black 16px) headings */}
              {(flow.whatIDid || flow.impact) && (() => {
                const SubHeading = flow.title ? "h4" : "h3";
                return (
                  <BentoGrid columns={2}>
                    {flow.whatIDid && (
                      <article className="flex flex-col justify-start gap-[12px] rounded-[24px] bg-[var(--bg-surface)] p-[24px] text-[var(--text-primary)] shadow-[var(--shadow-card)]">
                        <SubHeading className="font-display text-[16px] font-normal leading-[24px] text-[var(--text-primary)]">
                          What I did
                        </SubHeading>
                        <ul className="list-disc space-y-2 pl-5 font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                          {flow.whatIDid.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </article>
                    )}
                    {flow.impact && (
                      <article className="flex flex-col justify-start gap-[12px] rounded-[24px] bg-[var(--bg-surface)] p-[24px] text-[var(--text-primary)] shadow-[var(--shadow-card)]">
                        <SubHeading className="font-display text-[16px] font-normal leading-[24px] text-[var(--text-primary)]">
                          Impact
                        </SubHeading>
                        <ul className="list-disc space-y-2 pl-5 font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                          {flow.impact.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </article>
                    )}
                  </BentoGrid>
                );
              })()}
            </div>
          ))}

          {/* Optional Interactive Prototype Embed */}
          {section.prototypeEmbedUrl && (
            <PrototypeEmbed
              embedUrl={section.prototypeEmbedUrl}
              title={section.prototypeTitle}
              caption={section.prototypeCaption}
            />
          )}
        </BentoSection>
      );

    case "prototype-embed":
      if (!section.embedUrl) return null;
      return (
        <BentoSection
          heading={section.heading}
          headingId={headingId}
          description={section.description}
        >
          <PrototypeEmbed
            embedUrl={section.embedUrl}
            title={section.title}
            caption={section.caption}
          />
        </BentoSection>
      );

    case "cards-grid":
      return (
        <BentoSection
          heading={section.heading}
          headingId={headingId}
          headingColor={section.headingColor}
          description={section.description}
        >
          <BentoGrid columns={section.columns || 2}>
            {section.cards.map((card, idx) => {
              const isLastOdd =
                !card.colSpan &&
                section.columns !== 1 &&
                section.columns !== 3 &&
                section.cards.length % 2 === 1 &&
                idx === section.cards.length - 1;
              const resolvedSpan = card.colSpan || (isLastOdd ? 2 : 1);

              if (card.horizontalSplit) {
                return (
                  <article
                    key={card.title}
                    className={`grid grid-cols-1 items-center gap-[24px] overflow-hidden rounded-[24px] bg-[var(--bg-surface)] p-[24px] shadow-[var(--shadow-card-sm)] lg:grid-cols-12 ${
                      resolvedSpan === 2
                        ? "md:col-span-2"
                        : resolvedSpan === 3
                        ? "md:col-span-3"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col justify-center self-center gap-[8px] lg:col-span-7">
                      <h3
                        className="font-heading text-[24px] font-bold leading-[32px]"
                        style={{
                          color: section.accentTitles
                            ? theme.accentColor
                            : "var(--text-primary)",
                        }}
                      >
                        {card.title}
                      </h3>
                      {card.description && (
                        <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                          {card.description}
                        </p>
                      )}
                    </div>

                    {card.image && (
                      <div className="w-full overflow-hidden rounded-[12px] lg:col-span-5">
                        <FramerImage
                          src={card.image}
                          alt={card.title}
                          sizes="(max-width: 1023px) 100vw, 520px"
                          className="w-full h-auto rounded-[12px] object-contain"
                        />
                      </div>
                    )}

                    {card.images && card.images.length > 0 && (
                      <div className="mx-auto grid w-full max-w-[406px] grid-cols-2 items-center gap-[16px] md:gap-[24px] lg:col-span-5">
                        {card.images.map((imgSrc, i) => (
                          <div
                            key={imgSrc}
                            className="w-full overflow-hidden rounded-[12px]"
                          >
                            <FramerImage
                              src={imgSrc}
                              alt={`${card.title} preview ${i + 1}`}
                              sizes="(max-width: 743px) 45vw, 191px"
                              className="mx-auto max-h-[366px] w-full rounded-[12px] object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                );
              }

              // Pawnshop OS "Next steps": 1-column card with 2 wide images overflowing bottom padding on Tablet/Desktop
              const isNextStepsOverflow =
                section.columns === 1 &&
                card.images &&
                card.images.length >= 2 &&
                getImageDimensions(card.images[0]).width >
                  getImageDimensions(card.images[0]).height;

              if (isNextStepsOverflow && card.images) {
                return (
                  <article
                    key={card.title || `card-${idx}`}
                    className={`flex flex-col justify-start gap-[24px] overflow-hidden rounded-[24px] bg-[var(--bg-surface)] p-[24px] text-[var(--text-primary)] shadow-[var(--shadow-card-sm)] md:h-[294px] lg:h-[338px] xl:h-[384px] ${
                      resolvedSpan === 2
                        ? "md:col-span-2"
                        : resolvedSpan === 3
                        ? "md:col-span-3"
                        : ""
                    }`}
                  >
                    {(card.title || card.description) && (
                      <div className="flex flex-col gap-[8px]">
                        {card.title && (
                          <h3
                            className="font-heading text-[24px] font-bold leading-[32px]"
                            style={{
                              color: section.accentTitles
                                ? theme.accentColor
                                : "var(--text-primary)",
                            }}
                          >
                            {card.title}
                          </h3>
                        )}
                        {card.description && (
                          <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                            {card.description}
                          </p>
                        )}
                      </div>
                    )}
                    <div className="grid grid-cols-1 gap-[24px] md:-mb-[24px] md:grid-cols-2">
                      {card.images.map((imgSrc, i) => (
                        <div
                          key={imgSrc}
                          className="w-full overflow-hidden rounded-[8px] shadow-[0px_4px_8px_rgba(0,0,0,0.16)]"
                        >
                          <FramerImage
                            src={imgSrc}
                            alt={`${card.title || section.heading} preview ${i + 1}`}
                            sizes="(max-width: 743px) 100vw, 560px"
                            className="w-full h-auto object-cover object-top"
                          />
                        </div>
                      ))}
                    </div>
                  </article>
                );
              }

              // Check MOOV Web "The solution" asymmetric 2-image overflow card vs portrait pair
              const hasTwoImages = card.images && card.images.length === 2;
              const d0 = hasTwoImages && card.images ? getImageDimensions(card.images[0]) : null;
              const d1 = hasTwoImages && card.images ? getImageDimensions(card.images[1]) : null;
              const isAsymmetricOverflow =
                d0 &&
                d1 &&
                Math.abs(d0.width / d0.height - d1.width / d1.height) > 0.1;

              if (isAsymmetricOverflow && card.images) {
                return (
                  <article
                    key={card.title}
                    className={`flex h-[550px] flex-col justify-between gap-[24px] overflow-hidden rounded-[24px] bg-[var(--bg-surface)] p-[24px] text-[var(--text-primary)] shadow-[var(--shadow-card-sm)] md:h-[479px] ${
                      resolvedSpan === 2
                        ? "md:col-span-2"
                        : resolvedSpan === 3
                        ? "md:col-span-3"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col gap-[8px]">
                      <h3
                        className="font-heading text-[24px] font-bold leading-[32px]"
                        style={{
                          color: section.accentTitles
                            ? theme.accentColor
                            : "var(--text-primary)",
                        }}
                      >
                        {card.title}
                      </h3>
                      {card.description && (
                        <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                          {card.description}
                        </p>
                      )}
                    </div>
                    <div className="-mb-[24px] -mr-[24px] flex w-[500px] flex-row items-start gap-[24px] self-center md:self-start">
                      <div className="w-[165px] shrink-0 overflow-hidden rounded-[12px]">
                        <FramerImage
                          src={card.images[0]}
                          alt={`${card.title} preview 1`}
                          sizes="165px"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <div className="w-[311px] shrink-0 overflow-hidden rounded-[12px]">
                        <FramerImage
                          src={card.images[1]}
                          alt={`${card.title} preview 2`}
                          sizes="311px"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>
                  </article>
                );
              }

              return (
                <BentoCard
                  key={card.title}
                  title={card.title}
                  titleColor={
                    section.accentTitles ? theme.accentColor : "var(--text-primary)"
                  }
                  description={card.description}
                  colSpan={resolvedSpan}
                  className={
                    hasTwoImages ? "justify-between md:h-[479px]" : ""
                  }
                >
                  {card.image && (
                    <div className="w-full overflow-hidden rounded-[12px]">
                      <FramerImage
                        src={card.image}
                        alt={card.title}
                        sizes="(max-width: 743px) 100vw, 680px"
                        className="w-full h-auto rounded-[12px] object-contain"
                      />
                    </div>
                  )}
                  {card.images && card.images.length > 0 && (
                    <div className="mx-auto grid w-full max-w-[354px] grid-cols-2 items-center gap-[16px] md:gap-[24px]">
                      {card.images.map((imgSrc, i) => (
                        <div
                          key={imgSrc}
                          className="aspect-[0.54/1] w-full overflow-hidden rounded-[12px]"
                        >
                          <FramerImage
                            src={imgSrc}
                            alt={`${card.title} preview ${i + 1}`}
                            sizes="(max-width: 743px) 45vw, 165px"
                            className="h-full w-full rounded-[12px] object-cover object-center"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </BentoCard>
              );
            })}
          </BentoGrid>
        </BentoSection>
      );

    case "iterations-showcase":
      return (
        <BentoSection
          heading={section.heading}
          headingId={headingId}
          description={section.description}
        >
          {section.cards.length > 0 && (
            <BentoGrid columns={2}>
              {section.cards.map((card) => {
                const imgs = card.images || [];
                const isWidePair =
                  imgs.length >= 2 &&
                  getImageDimensions(imgs[0]).width >
                    getImageDimensions(imgs[0]).height;

                return (
                  <BentoCard
                    key={card.title}
                    title={card.title}
                    titleColor="var(--text-primary)"
                    description={card.description}
                    className={isWidePair ? "md:h-[351px]" : ""}
                  >
                    {imgs.length > 0 &&
                      (isWidePair ? (
                        <div className="flex w-full flex-col items-center gap-[24px] md:-mb-[24px] md:w-[984px] md:flex-row md:items-start md:justify-center md:self-center">
                          {imgs.map((imgSrc, i) => (
                            <div
                              key={imgSrc}
                              className="w-full overflow-hidden rounded-[8px] shadow-[0px_4px_8px_rgba(0,0,0,0.16)] md:h-[304px] md:w-[480px] md:shrink-0"
                            >
                              <FramerImage
                                src={imgSrc}
                                alt={`${card.title} screenshot ${i + 1}`}
                                sizes="(max-width: 743px) 100vw, 480px"
                                className="h-auto w-full object-cover md:h-full"
                              />
                            </div>
                          ))}
                        </div>
                      ) : imgs.length > 1 ? (
                        <div className="grid grid-cols-2 items-start gap-[16px] md:gap-[24px]">
                          {imgs.map((imgSrc, i) => (
                            <div
                              key={imgSrc}
                              className="aspect-[0.54/1] w-full overflow-hidden rounded-[12px]"
                            >
                              <FramerImage
                                src={imgSrc}
                                alt={`${card.title} screenshot ${i + 1}`}
                                sizes="(max-width: 743px) 45vw, 280px"
                                className="h-full w-full rounded-[12px] object-cover object-center"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="w-full overflow-hidden rounded-[12px]">
                          <FramerImage
                            src={imgs[0]}
                            alt={`${card.title} screenshot 1`}
                            sizes="(max-width: 743px) 100vw, 540px"
                            className="w-full h-auto rounded-[12px] object-contain"
                          />
                        </div>
                      ))}
                  </BentoCard>
                );
              })}
            </BentoGrid>
          )}

          {section.beforeAfter && (
            <article className="flex flex-col items-center justify-between gap-[24px] rounded-[24px] bg-[var(--bg-surface)] p-[24px] shadow-[var(--shadow-card-sm)] md:flex-row">
              <div className="flex w-full flex-col justify-center self-center gap-[8px] md:w-auto">
                <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[var(--text-primary)]">
                  {section.beforeAfter.title}
                </h3>
                {section.beforeAfter.description && (
                  <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                    {section.beforeAfter.description}
                  </p>
                )}
              </div>

              <div className="flex w-full max-w-[374px] shrink-0 flex-row items-center justify-center gap-[8px]">
                <div className="flex flex-1 justify-center overflow-hidden rounded-[12px]">
                  <FramerImage
                    src={section.beforeAfter.beforeImage}
                    alt="Before redesign"
                    sizes="170px"
                    className="max-h-[303px] w-full h-auto rounded-[12px] object-contain"
                  />
                </div>

                {/* Framer Arrow SVG between Before & After */}
                <div
                  aria-hidden="true"
                  className="flex shrink-0 items-center justify-center"
                  style={{ color: theme.accentColor }}
                >
                  <svg
                    width="24"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <polyline points="13 5 20 12 13 19" />
                  </svg>
                </div>

                <div className="flex flex-1 justify-center overflow-hidden rounded-[12px]">
                  <FramerImage
                    src={section.beforeAfter.afterImage}
                    alt="After redesign"
                    sizes="170px"
                    className="max-h-[303px] w-full h-auto rounded-[12px] object-contain"
                  />
                </div>
              </div>
            </article>
          )}
        </BentoSection>
      );

    case "design-system-showcase":
      return (
        <BentoSection
          heading={section.heading}
          headingId={headingId}
          headingColor={section.headingColor}
          description={section.description}
          variant={section.variant || "default"}
          gradient={section.gradient}
        >
          {section.versions.map((ver, verIdx) => (
            <div key={ver.title || `v-${verIdx}`} className="flex flex-col gap-[24px]">
              {ver.title && (
                <div className="flex flex-col justify-start gap-[8px]">
                  <h3
                    className="font-display text-[32px] font-normal leading-[1.3]"
                    style={{ color: ver.titleColor || "var(--text-primary)" }}
                  >
                    {ver.title}
                  </h3>
                  {ver.description && (
                    <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                      {ver.description}
                    </p>
                  )}
                </div>
              )}

              {/* Row 1: Typography + Colors side-by-side */}
              <BentoGrid columns={2}>
                {/* Typography Card */}
                <article className="flex flex-col justify-start gap-[20px] rounded-[24px] bg-[var(--bg-surface)] p-[24px] text-[var(--text-primary)] shadow-[var(--shadow-card-sm)]">
                  <div className="flex flex-col justify-start gap-[8px]">
                    <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[var(--text-primary)]">
                      Typography
                    </h3>
                    <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                      {ver.typography.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-[12px] rounded-[16px] bg-[var(--bg-surface-subtle)] p-[16px]">
                    {ver.typography.specimens.map((spec, sIdx) => (
                      <div
                        key={`${spec.fontName}-${spec.size}-${spec.weightLabel}-${sIdx}`}
                        className="grid grid-cols-[1.4fr_0.75fr_1fr] items-center gap-[8px] border-b border-[var(--border-subtle)] pb-[8px] text-left leading-[1.2] last:border-b-0 last:pb-0 sm:gap-[12px]"
                        style={{
                          fontSize: `min(${spec.size}, 5.2vw)`,
                          fontWeight: spec.weight,
                        }}
                      >
                        <span className="min-w-0 text-[var(--text-primary)]">{spec.fontName}</span>
                        <span className="text-[var(--text-secondary)]">{spec.size}</span>
                        <span className="text-[var(--text-primary)]">{spec.weightLabel}</span>
                      </div>
                    ))}
                  </div>
                </article>

                {/* Colors Card */}
                <article className="flex flex-col justify-start gap-[20px] rounded-[24px] bg-[var(--bg-surface)] p-[24px] text-[var(--text-primary)] shadow-[var(--shadow-card-sm)]">
                  <div className="flex flex-col justify-start gap-[8px]">
                    <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[var(--text-primary)]">
                      Colors
                    </h3>
                    <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                      {ver.colors.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
                    {ver.colors.groups.map((grp) => (
                      <div key={grp.title} className="flex flex-col gap-[8px]">
                        <span className="font-sans text-[13px] font-semibold text-[var(--text-secondary)]">
                          {grp.title}
                        </span>
                        <div className="grid grid-cols-2 gap-[8px]">
                          {grp.swatches.map((hex) => (
                            <div
                              key={`${grp.title}-${hex}`}
                              className="flex h-[52px] flex-col items-start justify-end rounded-[8px] border border-[var(--border-subtle)] p-[6px] shadow-2xs"
                              style={{ backgroundColor: hex }}
                            >
                              <span className="rounded bg-white/90 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#212529]">
                                {hex}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </BentoGrid>

              {/* Row 2: Grids and layouts + Iconography */}
              {(ver.gridsCard || ver.iconographyCard) && (
                <BentoGrid columns={2}>
                  {ver.gridsCard && (
                    <BentoCard
                      title={ver.gridsCard.title}
                      description={ver.gridsCard.description}
                    >
                      <div className="w-full overflow-hidden rounded-[12px]">
                        <FramerImage
                          src={ver.gridsCard.image}
                          alt={ver.gridsCard.title}
                          sizes="(max-width: 768px) 100vw, 680px"
                          className="w-full h-auto rounded-[12px] object-contain"
                        />
                      </div>
                    </BentoCard>
                  )}
                  {ver.iconographyCard && (
                    <BentoCard
                      title={ver.iconographyCard.title}
                      description={ver.iconographyCard.description}
                    >
                      <div
                        role="img"
                        aria-label="Sample of purple Material Design icons on light surface"
                        className="grid grid-cols-4 gap-[16px] rounded-[12px] bg-[var(--bg-surface-subtle)] p-[24px] text-[#4B4BE6]"
                      >
                        {[
                          <path key="menu" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />,
                          <path key="check" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />,
                          <path key="search" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />,
                          <path key="heart" d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />,
                          <path key="image" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />,
                          <path key="sync" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />,
                          <path key="store" d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />,
                          <path key="mail" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />,
                        ].map((iconPath, idx) => (
                          <div
                            key={idx}
                            className="flex h-[56px] items-center justify-center rounded-[12px] bg-[var(--bg-surface)] shadow-[0px_1px_3px_rgba(0,0,0,0.06)]"
                          >
                            <svg
                              width="28"
                              height="28"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              {iconPath}
                            </svg>
                          </div>
                        ))}
                      </div>
                    </BentoCard>
                  )}
                </BentoGrid>
              )}

              {/* Row 3: Full-width Organized Tokenized Component Architecture */}
              {ver.componentsCard && (
                <BentoCard title={ver.componentsCard.title}>
                  <div
                    role="region"
                    aria-label="GoldenWeb DS V2 tokenized component architecture"
                    className="grid grid-cols-1 gap-[16px] lg:grid-cols-2"
                  >
                    {/* 1. Atoms: Buttons & Status */}
                    <div className="flex flex-col gap-[12px] rounded-[16px] bg-[var(--bg-surface-subtle)] p-[20px]">
                      <span className="font-heading text-[14px] font-bold text-[var(--text-primary)]">
                        Atoms: interactive buttons &amp; status indicators
                      </span>
                      <div className="flex flex-wrap items-center gap-[10px]">
                        <span className="inline-flex items-center rounded-[60px] bg-[#4B4BE6] px-[16px] py-[8px] font-sans text-[13px] font-semibold text-white">
                          Primary action
                        </span>
                        <span className="inline-flex items-center rounded-[60px] border border-[#4B4BE6] bg-[var(--bg-surface)] px-[16px] py-[8px] font-sans text-[13px] font-semibold text-[#4B4BE6]">
                          Secondary
                        </span>
                        <span className="inline-flex items-center rounded-[60px] bg-[#E5E5FF] px-[16px] py-[8px] font-sans text-[13px] font-semibold text-[#2A2C2F]">
                          Subtle
                        </span>
                        <span className="inline-flex items-center rounded-[60px] bg-[#C92A2A] px-[16px] py-[8px] font-sans text-[13px] font-semibold text-white">
                          Destructive
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-[10px] pt-[4px]">
                        <span className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#4B4BE6] font-sans text-[12px] font-bold text-white">
                          1
                        </span>
                        <span className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#2B8A3E] font-sans text-[12px] font-bold text-white">
                          ✓
                        </span>
                        <span className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#C92A2A] font-sans text-[12px] font-bold text-white">
                          ✕
                        </span>
                        <span className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-full border border-[var(--border-interactive)] bg-[var(--bg-surface)] font-sans text-[12px] font-bold text-[var(--text-secondary)]">
                          2
                        </span>
                      </div>
                    </div>

                    {/* 2. Molecules: Search & Form Field States */}
                    <div className="flex flex-col gap-[12px] rounded-[16px] bg-[var(--bg-surface-subtle)] p-[20px]">
                      <span className="font-heading text-[14px] font-bold text-[var(--text-primary)]">
                        Molecules: search bar &amp; validated input states
                      </span>
                      <div className="flex items-stretch overflow-hidden rounded-[60px] border border-[var(--border-interactive)] bg-[var(--bg-surface)]">
                        <span className="min-w-0 flex-1 truncate px-[16px] py-[10px] font-sans text-[13px] leading-[20px] text-[var(--text-secondary)]">
                          Search inventory, SKUs, or clients...
                        </span>
                        <span className="flex shrink-0 items-center bg-[#4B4BE6] px-[16px] py-[10px] font-sans text-[13px] font-semibold leading-[20px] text-white">
                          Search
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-2">
                        <div className="rounded-[12px] border-2 border-[#4B4BE6] bg-[var(--bg-surface)] px-[12px] py-[8px]">
                          <span className="block font-sans text-[11px] font-semibold text-[#4B4BE6]">
                            Focused state
                          </span>
                          <span className="font-sans text-[13px] text-[var(--text-primary)]">
                            Branch #04 · Active
                          </span>
                        </div>
                        <div className="rounded-[12px] border-2 border-[#C92A2A] bg-[var(--bg-surface)] px-[12px] py-[8px]">
                          <span className="block font-sans text-[11px] font-semibold text-[#C92A2A]">
                            Validation error
                          </span>
                          <span className="font-sans text-[13px] text-[var(--text-primary)]">
                            Amount required
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 3. Organisms: Semantic Feedback Banners */}
                    <div className="flex flex-col gap-[10px] rounded-[16px] bg-[var(--bg-surface-subtle)] p-[20px]">
                      <span className="font-heading text-[14px] font-bold text-[var(--text-primary)]">
                        Organisms: persistent transaction banners
                      </span>
                      <div className="flex items-center justify-between gap-[12px] rounded-[12px] border border-[#2B8A3E]/25 bg-[#EBFBEE] px-[14px] py-[10px]">
                        <span className="min-w-0 font-sans text-[13px] font-medium text-[#1B4332]">
                          ✓ Loan contract #4821 registered
                        </span>
                        <span className="shrink-0 whitespace-nowrap font-sans text-[12px] font-semibold text-[#1B4332]">
                          View receipt
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-[12px] rounded-[12px] border border-[#C92A2A]/25 bg-[#FFF5F5] px-[14px] py-[10px]">
                        <span className="min-w-0 font-sans text-[13px] font-medium text-[#7F1D1D]">
                          ✕ Cash drawer mismatch detected
                        </span>
                        <span className="shrink-0 whitespace-nowrap font-sans text-[12px] font-semibold text-[#7F1D1D]">
                          Audit now
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-[12px] rounded-[12px] border border-[#4B4BE6]/25 bg-[#EEF2FF] px-[14px] py-[10px]">
                        <span className="min-w-0 font-sans text-[13px] font-medium text-[#1E1B4B]">
                          ⓘ Daily branch sync ready
                        </span>
                        <span className="shrink-0 whitespace-nowrap font-sans text-[12px] font-semibold text-[#1E1B4B]">
                          Dismiss
                        </span>
                      </div>
                    </div>

                    {/* 4. Templates: Multi-Role Navigation Shells */}
                    <div className="flex flex-col gap-[10px] rounded-[16px] bg-[var(--bg-surface-subtle)] p-[20px]">
                      <span className="font-heading text-[14px] font-bold text-[var(--text-primary)]">
                        Templates: role-scoped navigation headers
                      </span>
                      <div className="flex items-center justify-between rounded-[12px] bg-[#EEF2FF] px-[14px] py-[10px]">
                        <span className="font-heading text-[13px] font-bold text-[#1E1B4B]">
                          Admin · Tenant Control
                        </span>
                        <span className="rounded-[60px] bg-[var(--bg-surface)] px-[10px] py-[3px] font-sans text-[11px] font-semibold text-[var(--text-primary)]">
                          Branches · Roles
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-[12px] bg-[var(--bg-surface)] px-[14px] py-[10px] border border-[var(--border-subtle)]">
                        <span className="font-heading text-[13px] font-bold text-[var(--text-primary)]">
                          Ops · Counter POS
                        </span>
                        <span className="rounded-[60px] bg-[var(--bg-surface-subtle)] px-[10px] py-[3px] font-sans text-[11px] font-semibold text-[var(--text-primary)]">
                          Cash $3,000 · Cart (0)
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-[12px] bg-[#0D166B] px-[14px] py-[10px] text-white">
                        <span className="font-heading text-[13px] font-bold">
                          Customer · B2C Portal
                        </span>
                        <span className="rounded-[60px] bg-white/15 px-[10px] py-[3px] font-sans text-[11px] font-semibold text-white">
                          Catalog · Payments
                        </span>
                      </div>
                    </div>
                  </div>
                </BentoCard>
              )}
            </div>
          ))}

          {/* Optional Atomic Construction Section */}
          {section.atomicNote && (
            <div className="flex flex-col gap-[24px]">
              {section.atomicNote.description && (
                <p className="w-full max-w-[1440px] font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                  {section.atomicNote.description}
                </p>
              )}
              <BentoGrid columns={2}>
                {section.atomicNote.categories.map((cat) => (
                  <BentoCard
                    key={cat.title}
                    title={cat.title}
                    description={cat.description}
                  />
                ))}
              </BentoGrid>
            </div>
          )}
        </BentoSection>
      );

    case "video-showcase":
      return (
        <VideoShowcaseSection
          section={section}
          theme={theme}
          headingId={headingId}
        />
      );

    case "results":
      return (
        <BentoSection heading={section.heading} headingId={headingId}>
          <BentoGrid columns={2}>
            {/* Left Column Card */}
            <BentoCard title={section.leftColumn.title}>
              <div className="flex flex-col justify-start gap-[16px]">
                {section.leftColumn.items.map((item, idx) => (
                  <div
                    key={item.title || item.number || idx}
                    className={
                      item.number
                        ? "flex items-start gap-[16px]"
                        : "flex flex-col justify-start gap-[8px]"
                    }
                  >
                    {item.number && (
                      <span
                        aria-hidden="true"
                        className="font-heading text-[24px] font-bold leading-[32px]"
                        style={{ color: theme.accentColor }}
                      >
                        {item.number}
                      </span>
                    )}
                    {item.title && (
                      <h4
                        className="font-heading text-[16px] font-bold leading-[24px]"
                        style={{ color: theme.accentColor }}
                      >
                        {item.title}
                      </h4>
                    )}
                    {item.description && (
                      <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                        {item.description}
                      </p>
                    )}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="list-disc space-y-1 pl-5 font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                        {item.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* Right Column Card */}
            <BentoCard title={section.rightColumn.title}>
              <div className="flex flex-col justify-start gap-[16px]">
                {section.rightColumn.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col justify-start gap-[8px]"
                  >
                    <h4
                      className="font-heading text-[16px] font-bold leading-[24px]"
                      style={{ color: theme.accentColor }}
                    >
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                        {item.description}
                      </p>
                    )}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="list-disc space-y-1 pl-5 font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                        {item.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </BentoCard>
          </BentoGrid>

          {section.bottomCard && (
            <BentoCard title={section.bottomCard.title}>
              <div className="flex flex-col justify-start gap-[16px]">
                {section.bottomCard.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col justify-start gap-[8px]"
                  >
                    <h4
                      className="font-heading text-[16px] font-bold leading-[24px]"
                      style={{ color: theme.accentColor }}
                    >
                      {item.title}
                    </h4>
                    <p className="font-sans text-[16px] leading-[24px] text-[var(--text-primary)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </BentoCard>
          )}
        </BentoSection>
      );

    default:
      return null;
  }
}
