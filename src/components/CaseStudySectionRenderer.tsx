import { BentoCard, BentoGrid, BentoSection } from "@/components/ui/BentoGrid";
import { CompetitorCarousel } from "@/components/ui/CompetitorCarousel";
import { FramerImage } from "@/components/ui/FramerImage";
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
          <div className="grid grid-cols-1 items-start gap-[24px] rounded-[24px] bg-white p-[24px] shadow-[0px_2px_6px_rgba(0,0,0,0.04)] md:grid-cols-3">
            <div className="flex flex-col justify-start gap-[8px]">
              <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[#212529]">
                Company
              </h3>
              <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
                {section.company}
              </p>
            </div>
            <div className="flex flex-col justify-start gap-[8px]">
              <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[#212529]">
                Timeline
              </h3>
              <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
                {section.timeline}
              </p>
            </div>
            <div className="flex flex-col justify-start gap-[8px]">
              <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[#212529]">
                My role
              </h3>
              <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
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
              titleColor="#212529"
              description={section.overviewBody}
            />
            <div className="grid grid-cols-1 items-start gap-[24px] rounded-[24px] bg-white p-[24px] shadow-[0px_2px_6px_rgba(0,0,0,0.04)] md:grid-cols-3">
              {section.items.map((item) => (
                <article
                  key={item.title}
                  className="flex flex-col justify-start gap-[8px]"
                >
                  <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[#212529]">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
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
                  className={`grid grid-cols-1 items-center gap-[24px] overflow-hidden rounded-[24px] bg-white p-[24px] shadow-[0px_2px_6px_rgba(0,0,0,0.04)] ${
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
                                  ? "#212529"
                                  : card.accentTitle
                                  ? theme.accentColor
                                  : "#212529",
                            }}
                          >
                            {b.title}
                          </h3>
                          <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
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
                              : "#212529",
                          }}
                        >
                          {card.title}
                        </h3>
                        <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
                          {card.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {card.image && (
                    hasBullets ? (
                      <div className="mx-auto -mb-[24px] aspect-[1/0.98] w-full self-end overflow-hidden rounded-t-[12px] md:w-[80%] lg:col-span-6 lg:w-full xl:col-span-5">
                        <FramerImage
                          src={card.image}
                          alt={card.title || section.heading}
                          sizes="(max-width: 1023px) 85vw, 560px"
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div className="w-full overflow-hidden rounded-[16px]">
                        <FramerImage
                          src={card.image}
                          alt={card.title || section.heading}
                          sizes="(max-width: 1023px) 100vw, 680px"
                          className="w-full h-auto rounded-[16px] object-cover object-top"
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
            <article className="flex min-w-0 flex-col justify-start gap-[24px] overflow-hidden rounded-[24px] bg-white p-[24px] shadow-[0px_2px_6px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col justify-start gap-[8px]">
                <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[#212529]">
                  {section.leftCard.title}
                </h3>
                <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
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
                  titleColor="#212529"
                  description={rc.description}
                  className="flex-1"
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
                    className="flex flex-col justify-start gap-[16px] rounded-[24px] bg-white p-[24px] shadow-[0px_4px_8px_rgba(0,0,0,0.12)]"
                  >
                    <h4 className="line-clamp-2 min-h-[48px] font-display text-[16px] font-normal leading-[24px] text-[#212529]">
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
                      <article className="flex flex-col justify-start gap-[12px] rounded-[24px] bg-white p-[24px] text-[#212529] shadow-[0px_4px_8px_rgba(0,0,0,0.12)]">
                        <SubHeading className="font-display text-[16px] font-normal leading-[24px] text-[#212529]">
                          What I did
                        </SubHeading>
                        <ul className="list-disc space-y-2 pl-5 font-sans text-[16px] leading-[24px] text-[#212529]">
                          {flow.whatIDid.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </article>
                    )}
                    {flow.impact && (
                      <article className="flex flex-col justify-start gap-[12px] rounded-[24px] bg-white p-[24px] text-[#212529] shadow-[0px_4px_8px_rgba(0,0,0,0.12)]">
                        <SubHeading className="font-display text-[16px] font-normal leading-[24px] text-[#212529]">
                          Impact
                        </SubHeading>
                        <ul className="list-disc space-y-2 pl-5 font-sans text-[16px] leading-[24px] text-[#212529]">
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
            <div className="mx-auto flex w-full max-w-[896px] flex-col justify-start gap-[16px] rounded-[24px] bg-white p-[24px]">
              <div className="flex flex-col justify-start gap-[4px]">
                <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[#212529]">
                  Interactive prototype
                </h3>
                {section.prototypeCaption && (
                  <span className="font-sans text-[12px] leading-[16px] text-[#495057]">
                    {section.prototypeCaption}
                  </span>
                )}
              </div>
              <div className="aspect-video w-full overflow-hidden rounded-[16px] border border-[#5A5AFF]">
                <iframe
                  src={section.prototypeEmbedUrl}
                  title="Interactive Figma Prototype"
                  className="h-full w-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}
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
                    className={`grid grid-cols-1 items-center gap-[24px] overflow-hidden rounded-[24px] bg-white p-[24px] shadow-[0px_2px_6px_rgba(0,0,0,0.04)] lg:grid-cols-12 ${
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
                            : "#212529",
                        }}
                      >
                        {card.title}
                      </h3>
                      {card.description && (
                        <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
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
                    className={`flex flex-col justify-start gap-[24px] overflow-hidden rounded-[24px] bg-white p-[24px] text-[#212529] shadow-[0px_2px_6px_rgba(0,0,0,0.04)] md:h-[294px] lg:h-[338px] xl:h-[384px] ${
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
                                : "#212529",
                            }}
                          >
                            {card.title}
                          </h3>
                        )}
                        {card.description && (
                          <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
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
                    className={`flex h-[550px] flex-col justify-between gap-[24px] overflow-hidden rounded-[24px] bg-white p-[24px] text-[#212529] shadow-[0px_2px_6px_rgba(0,0,0,0.04)] md:h-[479px] ${
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
                            : "#212529",
                        }}
                      >
                        {card.title}
                      </h3>
                      {card.description && (
                        <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
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
                    section.accentTitles ? theme.accentColor : "#212529"
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
                    titleColor="#212529"
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
            <article className="flex flex-col items-center justify-between gap-[24px] rounded-[24px] bg-white p-[24px] shadow-[0px_2px_6px_rgba(0,0,0,0.04)] md:flex-row">
              <div className="flex w-full flex-col justify-center self-center gap-[8px] md:w-auto">
                <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[#212529]">
                  {section.beforeAfter.title}
                </h3>
                {section.beforeAfter.description && (
                  <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
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
                    style={{ color: ver.titleColor || "#212529" }}
                  >
                    {ver.title}
                  </h3>
                  {ver.description && (
                    <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
                      {ver.description}
                    </p>
                  )}
                </div>
              )}

              {/* Row 1: Typography + Colors side-by-side */}
              <BentoGrid columns={2}>
                {/* Typography Card */}
                <article className="flex flex-col justify-start gap-[20px] rounded-[24px] bg-white p-[24px] text-[#212529] shadow-[0px_2px_6px_rgba(0,0,0,0.04)]">
                  <div className="flex flex-col justify-start gap-[8px]">
                    <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[#212529]">
                      Typography
                    </h3>
                    <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
                      {ver.typography.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-[12px] rounded-[16px] bg-[#F8F9FB] p-[16px]">
                    {ver.typography.specimens.map((spec, sIdx) => (
                      <div
                        key={`${spec.fontName}-${spec.size}-${spec.weightLabel}-${sIdx}`}
                        className="flex items-center justify-between border-b border-black/5 pb-[8px] last:border-b-0 last:pb-0"
                        style={{
                          fontSize: spec.size,
                          fontWeight: spec.weight,
                        }}
                      >
                        <span className="text-[#212529]">{spec.fontName}</span>
                        <span className="text-[#495057]">{spec.size}</span>
                        <span className="text-[#212529]">{spec.weightLabel}</span>
                      </div>
                    ))}
                  </div>
                </article>

                {/* Colors Card */}
                <article className="flex flex-col justify-start gap-[20px] rounded-[24px] bg-white p-[24px] text-[#212529] shadow-[0px_2px_6px_rgba(0,0,0,0.04)]">
                  <div className="flex flex-col justify-start gap-[8px]">
                    <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[#212529]">
                      Colors
                    </h3>
                    <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
                      {ver.colors.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
                    {ver.colors.groups.map((grp) => (
                      <div key={grp.title} className="flex flex-col gap-[8px]">
                        <span className="font-sans text-[13px] font-semibold text-[#495057]">
                          {grp.title}
                        </span>
                        <div className="grid grid-cols-2 gap-[8px]">
                          {grp.swatches.map((hex) => (
                            <div
                              key={`${grp.title}-${hex}`}
                              className="flex h-[52px] flex-col items-start justify-end rounded-[8px] border border-black/10 p-[6px] shadow-2xs"
                              style={{ backgroundColor: hex }}
                            >
                              <span className="rounded bg-white/85 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#212529]">
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
                      <div className="w-full overflow-hidden rounded-[12px]">
                        <FramerImage
                          src={ver.iconographyCard.image}
                          alt={ver.iconographyCard.title}
                          sizes="(max-width: 768px) 100vw, 680px"
                          className="w-full h-auto rounded-[12px] object-contain"
                        />
                      </div>
                    </BentoCard>
                  )}
                </BentoGrid>
              )}

              {/* Row 3: Full-width Components Card */}
              {ver.componentsCard && (
                <BentoCard title={ver.componentsCard.title}>
                  <div className="w-full overflow-hidden rounded-[12px]">
                    <FramerImage
                      src={ver.componentsCard.image}
                      alt={ver.componentsCard.title}
                      sizes="(max-width: 1440px) 100vw, 1160px"
                      className="mx-auto w-full max-w-[1160px] h-auto rounded-[12px] object-contain"
                    />
                  </div>
                </BentoCard>
              )}
            </div>
          ))}

          {/* Optional Atomic Construction Section */}
          {section.atomicNote && (
            <div className="flex flex-col gap-[24px]">
              {section.atomicNote.description && (
                <p className="w-full max-w-[1440px] font-sans text-[16px] leading-[24px] text-[#212529]">
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
        <BentoSection heading={section.heading} headingId={headingId}>
          <BentoGrid columns={2}>
            {section.items.map((item) => {
              if (item.horizontalSplit) {
                return (
                  <article
                    key={item.title}
                    className="grid grid-cols-1 items-center gap-[24px] overflow-hidden rounded-[24px] bg-white p-[24px] shadow-[0px_2px_6px_rgba(0,0,0,0.04)] md:col-span-2 lg:grid-cols-12"
                  >
                    <div className="flex flex-col justify-center self-center lg:col-span-4">
                      <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[#212529]">
                        {item.title}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 lg:col-span-8">
                      {item.videos?.map((vSrc, i) => (
                        <video
                          key={vSrc}
                          src={encodeURI(vSrc)}
                          aria-label={`${item.title} demonstration ${i + 1}`}
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls
                          className="mx-auto max-h-[360px] w-full rounded-[16px] object-contain"
                          style={{
                            border: `2px solid ${
                              section.borderColor ||
                              theme.borderColor ||
                              "#5A5AFF"
                            }`,
                          }}
                        />
                      ))}
                      {item.images?.map((imgSrc, i) => (
                        <div
                          key={imgSrc}
                          className="overflow-hidden rounded-[16px]"
                          style={{
                            border: `2px solid ${
                              section.borderColor ||
                              theme.borderColor ||
                              "#455CFF"
                            }`,
                          }}
                        >
                          <FramerImage
                            src={imgSrc}
                            alt={`${item.title} preview ${i + 1}`}
                            sizes="480px"
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </article>
                );
              }

              const isSingleHalfVideo =
                !item.fullWidth && item.videos && item.videos.length === 1;
              const borderColor =
                section.borderColor || theme.borderColor || "#5A5AFF";

              return (
                <BentoCard
                  key={item.title}
                  title={item.title}
                  titleAlign="center"
                  colSpan={item.fullWidth ? 2 : 1}
                >
                  {item.videos && item.videos.length > 0 && (
                    <div
                      className={`grid grid-cols-1 gap-[24px] ${
                        item.videos.length > 1 ? "md:grid-cols-2" : ""
                      }`}
                    >
                      {item.videos.map((vSrc, i) =>
                        isSingleHalfVideo ? (
                          <div
                            key={vSrc}
                            className="aspect-[1.83/1] w-full overflow-hidden rounded-[16px]"
                            style={{ border: `2px solid ${borderColor}` }}
                          >
                            <video
                              src={encodeURI(vSrc)}
                              aria-label={`${item.title} interaction demonstration`}
                              autoPlay
                              loop
                              muted
                              playsInline
                              controls
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <video
                            key={vSrc}
                            src={encodeURI(vSrc)}
                            aria-label={`${item.title} interaction demonstration ${
                              item.videos && item.videos.length > 1 ? i + 1 : ""
                            }`}
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            className="w-full rounded-[16px] object-contain"
                            style={{ border: `2px solid ${borderColor}` }}
                          />
                        )
                      )}
                    </div>
                  )}
                </BentoCard>
              );
            })}
          </BentoGrid>
        </BentoSection>
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
                      <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
                        {item.description}
                      </p>
                    )}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="list-disc space-y-1 pl-5 font-sans text-[16px] leading-[24px] text-[#212529]">
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
                      <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
                        {item.description}
                      </p>
                    )}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="list-disc space-y-1 pl-5 font-sans text-[16px] leading-[24px] text-[#212529]">
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
                    <p className="font-sans text-[16px] leading-[24px] text-[#212529]">
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
