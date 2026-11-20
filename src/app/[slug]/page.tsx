import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudySectionRenderer } from "@/components/CaseStudySectionRenderer";
import { ExecutiveSummaryCard } from "@/components/ExecutiveSummaryCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { FramerImage } from "@/components/ui/FramerImage";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getSiteConfig,
} from "@/lib/content";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://omarmangin.com";

export function generateStaticParams() {
  const studies = getAllCaseStudies();
  return studies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) {
    return {};
  }
  return {
    title: study.title,
    description: study.cardOutcomeSummary || study.subtitle,
    keywords: study.keywords || study.domainTags,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: study.title,
      description: study.cardOutcomeSummary || study.subtitle,
      type: "article",
      images: [
        {
          url: study.thumbnail,
          alt: study.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.cardOutcomeSummary || study.subtitle,
      images: [study.thumbnail],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const site = getSiteConfig();
  const allStudies = getAllCaseStudies();
  const otherProjects = allStudies.filter(
    (s) => s.featuredOnHome && s.slug !== study.slug
  );

  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    headline: study.subtitle,
    description: study.cardOutcomeSummary || study.subtitle,
    url: `${SITE_URL}/${study.slug}`,
    keywords: (study.keywords || study.domainTags || []).join(", "),
    temporalCoverage: study.timelineBadge,
    author: {
      "@type": "Person",
      name: site.author,
      jobTitle: "Senior Product Designer · AI Systems & Agentic UX",
      url: SITE_URL,
    },
  };

  return (
    <div
      id="hero"
      className="flex min-h-screen w-full flex-col items-center overflow-x-clip bg-[var(--bg-primary)]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(caseStudyJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Header author={site.author} nav={site.nav} socials={site.socials} />

      <main
        id="main-content"
        className="flex w-full min-w-0 flex-1 flex-col items-center"
      >
        <article className="flex w-full min-w-0 flex-col items-center">
          {/* Hero Section */}
          <section
            aria-labelledby="case-study-title"
            className="hero-padding flex w-full flex-col items-center gap-[24px] overflow-hidden lg:gap-[32px]"
            style={{ background: study.theme.gradient }}
          >
            <div className="flex w-full max-w-[1440px] flex-col gap-[16px]">
              <h1
                id="case-study-title"
                className="font-display text-[40px] font-normal leading-[1.25] tracking-[-0.04em] text-[#F8F9FB]"
              >
                {study.title}
              </h1>
              <p className="w-full max-w-[1440px] font-heading text-[24px] font-normal leading-[32px] text-[#F8F9FB]">
                {study.subtitle}
              </p>
            </div>

            {study.heroImages && study.heroImages.length > 0 && (
              <>
                {study.heroImages.length === 1 ||
                study.heroLayout === "single" ? (
                  <div className="mx-auto w-full max-w-[1120px] overflow-hidden rounded-[8px]">
                    <FramerImage
                      src={study.heroImages[0]}
                      alt={`${study.title} hero interface preview`}
                      priority
                      sizes="(max-width: 1440px) 100vw, 1120px"
                      className="w-full h-auto rounded-[8px] object-contain drop-shadow-[0px_8px_16px_rgba(0,0,0,0.18)]"
                    />
                  </div>
                ) : (
                  /* Framer 3-image horizontal full-bleed row overflowing section padding to viewport edges */
                  <div className="flex w-max shrink-0 flex-row items-center justify-center gap-[16px] py-1">
                    {study.heroImages.map((imgSrc, idx) => {
                      const isCenter = idx === 1;
                      return (
                        <div
                          key={imgSrc}
                          className={`shrink-0 overflow-hidden rounded-[8px] ${
                            isCenter
                              ? "w-[360px] md:w-[565px] lg:w-[646px]"
                              : "w-[230px] md:w-[383px] lg:w-[533px]"
                          }`}
                        >
                          <FramerImage
                            src={imgSrc}
                            alt={`${study.title} hero interface preview ${idx + 1}`}
                            priority
                            sizes="(max-width: 743px) 360px, (max-width: 1023px) 565px, 646px"
                            className="w-full h-auto rounded-[8px] object-contain drop-shadow-[0px_4px_8px_rgba(0,0,0,0.16)]"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </section>

          {/* Above-the-Fold Executive Summary Card */}
          {study.executiveSummary && (
            <ExecutiveSummaryCard
              summary={study.executiveSummary}
              company={study.company}
              timeline={study.timelineBadge}
              roleType={study.roleType}
            />
          )}

          {/* Dynamic Case Study Bento Sections */}
          {study.sections.map((section, idx) => (
            <CaseStudySectionRenderer
              key={`${section.type}-${idx}`}
              section={section}
              theme={study.theme}
              sectionIndex={idx}
            />
          ))}
        </article>
      </main>

      <Footer
        socials={site.socials}
        footerMessage={site.footerMessage}
        otherProjects={otherProjects}
        showOtherProjects={true}
      />

      {/* Floating Back-to-Top Arrow */}
      <a
        href="#hero"
        aria-label="Back to top of case study"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-[50px] p-[8px] text-[var(--text-primary)] shadow-md backdrop-blur-md transition-colors hover:bg-[var(--bg-surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] md:p-[16px]"
        style={{ backgroundColor: "var(--surface-overlay)" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </a>
    </div>
  );
}
