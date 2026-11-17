import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudySectionRenderer } from "@/components/CaseStudySectionRenderer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { FramerImage } from "@/components/ui/FramerImage";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getSiteConfig,
} from "@/lib/content";

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
    description: study.subtitle,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: study.title,
      description: study.subtitle,
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
      description: study.subtitle,
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
  // Show the same cases as on Home, minus the one currently open
  const otherProjects = allStudies.filter(
    (s) => s.featuredOnHome && s.slug !== study.slug
  );

  return (
    <div
      id="hero"
      className="flex min-h-screen w-full flex-col items-center bg-[#F5F5F5]"
    >
      <Header author={site.author} nav={site.nav} />

      <main
        id="main-content"
        className="flex w-full flex-1 flex-col items-center"
      >
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
            <p className="max-w-[960px] font-heading text-[24px] font-normal leading-[32px] text-[#F8F9FB]">
              {study.subtitle}
            </p>
          </div>

          {study.heroImages && study.heroImages.length > 0 && (
            <>
              {study.heroImages.length === 1 || study.heroLayout === "single" ? (
                <div className="mx-auto w-full max-w-[1120px] overflow-hidden rounded-[8px]">
                  <FramerImage
                    src={study.heroImages[0]}
                    alt={`${study.title} hero interface preview`}
                    priority
                    sizes="(max-width: 1440px) 100vw, 1120px"
                    className="w-full h-auto rounded-[8px] object-contain drop-shadow-[0px_8px_16px_rgba(0,0,0,0.18)]"
                  />
                </div>
              ) : study.heroLayout === "moov-devices" ? (
                /* Horizontal non-stacking device collage matching Framer node Ymg0V2Prd */
                <div className="mx-auto flex w-full max-w-[1440px] flex-row items-center justify-center gap-[12px] overflow-hidden sm:gap-[16px]">
                  {/* Tablet left (300x429 ratio) */}
                  {study.heroImages[0] && (
                    <div className="w-[21%] min-w-[110px] max-w-[300px] shrink-0">
                      <FramerImage
                        src={study.heroImages[0]}
                        alt={`${study.title} tablet view`}
                        priority
                        sizes="300px"
                        className="w-full h-auto object-contain drop-shadow-[0px_8px_16px_rgba(0,0,0,0.2)]"
                      />
                    </div>
                  )}
                  {/* Desktop center (900x523 ratio) */}
                  {study.heroImages[1] && (
                    <div className="w-[63%] min-w-[260px] max-w-[900px] shrink-0">
                      <FramerImage
                        src={study.heroImages[1]}
                        alt={`${study.title} desktop view`}
                        priority
                        sizes="900px"
                        className="w-full h-auto object-contain drop-shadow-[0px_8px_16px_rgba(0,0,0,0.2)]"
                      />
                    </div>
                  )}
                  {/* Phone right (189x364 ratio) */}
                  {study.heroImages[2] && (
                    <div className="w-[13.5%] min-w-[70px] max-w-[189px] shrink-0">
                      <FramerImage
                        src={study.heroImages[2]}
                        alt={`${study.title} mobile view`}
                        priority
                        sizes="190px"
                        className="w-full h-auto object-contain drop-shadow-[0px_8px_16px_rgba(0,0,0,0.2)]"
                      />
                    </div>
                  )}
                </div>
              ) : (
                /* Framer 3-image horizontal stack (never stacks vertically; side images bleed/clip off viewport on Tablet & Mobile like node aJs3OVAduIkEf8JA71) */
                <div className="mx-auto flex w-full items-center justify-center overflow-hidden">
                  <div className="flex w-[225%] min-w-[760px] max-w-[1744px] shrink-0 flex-row items-center justify-center gap-[16px] sm:w-[175%] lg:w-[115%] xl:w-full">
                    {study.heroImages.map((imgSrc, idx) => {
                      const isCenter = idx === 1;
                      return (
                        <div
                          key={imgSrc}
                          className={`overflow-hidden rounded-[8px] ${
                            isCenter ? "flex-[1.212]" : "flex-[1]"
                          }`}
                        >
                          <FramerImage
                            src={imgSrc}
                            alt={`${study.title} hero interface preview ${idx + 1}`}
                            priority
                            sizes="(max-width: 768px) 80vw, 646px"
                            className="w-full h-auto rounded-[8px] object-contain drop-shadow-[0px_4px_8px_rgba(0,0,0,0.16)]"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        {/* Dynamic Case Study Bento Sections */}
        {study.sections.map((section, idx) => (
          <CaseStudySectionRenderer
            key={`${section.type}-${idx}`}
            section={section}
            theme={study.theme}
            sectionIndex={idx}
          />
        ))}
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
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-[50px] p-[8px] text-[#212529] shadow-md backdrop-blur-md transition-colors hover:bg-[#e9ecef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B52E6] md:p-[16px]"
        style={{ backgroundColor: "rgba(245, 245, 245, 0.88)" }}
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
