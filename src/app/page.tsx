import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { getAllCaseStudies, getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Omar Mangin — Product Designer",
  description:
    "Product design portfolio of Omar Mangin — systems thinking, conversational AI UX, and WCAG 2.2 AA accessible product design.",
  openGraph: {
    title: "Omar Mangin — Product Designer",
    description:
      "Product design portfolio of Omar Mangin — systems thinking, conversational AI UX, and WCAG 2.2 AA accessible product design.",
    type: "website",
    images: [
      {
        url: "/assets/Brand/social-og.png",
        alt: "Omar Mangin Product Design Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Mangin — Product Designer",
    description:
      "Product design portfolio of Omar Mangin — systems thinking, conversational AI UX, and WCAG 2.2 AA accessible product design.",
    images: ["/assets/Brand/social-og.png"],
  },
};

export default function HomePage() {
  const site = getSiteConfig();
  const allStudies = getAllCaseStudies();
  const featuredStudies = allStudies.filter((s) => s.featuredOnHome);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#F5F5F5]">
      <Header author={site.author} nav={site.nav} />

      <main
        id="main-content"
        className="flex w-full flex-1 flex-col items-center"
      >
        {/* Intro / Bio Section */}
        <section
          aria-labelledby="home-intro-heading"
          className="section-padding flex w-full flex-col items-center gap-[24px]"
        >
          <div className="flex w-full max-w-[1440px] flex-col gap-[24px]">
            <h1
              id="home-intro-heading"
              className="font-display text-[40px] font-normal leading-[1.4] tracking-[-0.04em] text-[#212529]"
            >
              {site.home.greeting}
            </h1>
            <div className="flex flex-col gap-[20px]">
              {site.home.bio.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-sans text-[16px] font-normal leading-[24px] text-[#212529]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Projects Grid Section */}
        <section
          aria-labelledby="featured-projects-heading"
          className="grid-wrapper-padding flex w-full justify-center"
        >
          <h2 id="featured-projects-heading" className="sr-only">
            Featured Product Design Projects
          </h2>
          <BentoGrid
            columns={2}
            asList
            ariaLabel="Featured product design case studies"
          >
            {featuredStudies.map((study, idx) => (
              <li key={study.slug} className="w-full">
                <ProjectCard
                  study={study}
                  priority={idx < 4}
                  headingLevel="h3"
                />
              </li>
            ))}
          </BentoGrid>
        </section>
      </main>

      <Footer
        socials={site.socials}
        footerMessage={site.footerMessage}
        showOtherProjects={false}
      />
    </div>
  );
}
