import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HowIBuildWithAI } from "@/components/HowIBuildWithAI";
import { ProjectCard } from "@/components/ProjectCard";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { getAllCaseStudies, getSiteConfig } from "@/lib/content";

const HOME_TITLE =
  "Omar Mangin | Senior Product Designer · AI Systems & Agentic UX";
const HOME_DESCRIPTION =
  "Senior Product Designer specializing in end-to-end SaaS, design systems, AI & multi-agent UX, and WCAG 2.2 AA accessibility. Previously at Microsoft and Level Access.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    type: "website",
    images: [
      {
        url: "/assets/Brand/social-og.png",
        alt: HOME_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/assets/Brand/social-og.png"],
  },
};

export default function HomePage() {
  const site = getSiteConfig();
  const allStudies = getAllCaseStudies();
  const featuredStudies = allStudies.filter((s) => s.featuredOnHome);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[var(--bg-primary)]">
      <Header author={site.author} nav={site.nav} socials={site.socials} />

      <main
        id="main-content"
        className="flex w-full flex-1 flex-col items-center"
      >
        {/* Intro / Positioning Hero Section */}
        <section
          aria-labelledby="home-intro-heading"
          className="section-padding flex w-full flex-col items-center gap-[20px]"
        >
          <div className="flex w-full max-w-[1440px] flex-col gap-[16px]">
            <h1
              id="home-intro-heading"
              className="w-full font-display text-[32px] font-normal leading-[1.25] tracking-[-0.04em] text-[var(--text-primary)] md:text-[40px]"
            >
              {site.home.headline}
            </h1>

            <p className="w-full font-sans text-[16px] font-normal leading-[26px] text-[var(--text-primary)] md:text-[18px] md:leading-[28px]">
              {site.home.subheadline}
            </p>

            {/* Discrete Proof Strip */}
            {site.home.proofPills && site.home.proofPills.length > 0 && (
              <ul
                aria-label="Key career highlights"
                className="flex flex-wrap gap-[8px] pt-[4px] list-none p-0 m-0"
              >
                {site.home.proofPills.map((pill) => (
                  <li
                    key={pill}
                    className="rounded-[60px] bg-[var(--pill-bg)] px-[14px] py-[6px] font-sans text-[13px] font-medium leading-[18px] text-[var(--text-secondary)]"
                  >
                    {pill}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Bento Projects Grid Section (4 Flagship Case Studies in 4x1 row on Desktop) */}
        <section
          aria-labelledby="featured-projects-heading"
          className="grid-wrapper-padding flex w-full justify-center"
        >
          <h2 id="featured-projects-heading" className="sr-only">
            Featured product design case studies
          </h2>
          <BentoGrid
            columns={4}
            asList
            ariaLabel="Featured product design case studies"
          >
            {featuredStudies.map((study, idx) => (
              <li key={study.slug} className="w-full">
                <ProjectCard
                  study={study}
                  priority={idx < 4}
                  headingLevel="h3"
                  showOutcome
                />
              </li>
            ))}
          </BentoGrid>
        </section>

        {/* AI Workflow & Prototyping Proof Section */}
        <div className="mt-[24px] flex w-full flex-col items-center md:mt-[32px]">
          <HowIBuildWithAI aiWorkflow={site.aiWorkflow} />
        </div>
      </main>

      <Footer
        socials={site.socials}
        footerMessage={site.footerMessage}
        showOtherProjects={false}
      />
    </div>
  );
}
