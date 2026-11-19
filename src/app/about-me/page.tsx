import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HowIBuildWithAI } from "@/components/HowIBuildWithAI";
import { BentoCard, BentoGrid, BentoSection } from "@/components/ui/BentoGrid";
import { getAboutContent, getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "About me",
  description:
    "About Omar Mangin, Senior Product Designer specializing in systems thinking, conversational AI UX, and WCAG 2.2 AA digital accessibility.",
  openGraph: {
    title: "About me | Omar Mangin",
    description:
      "About Omar Mangin, Senior Product Designer specializing in systems thinking, conversational AI UX, and WCAG 2.2 AA digital accessibility.",
    type: "profile",
    images: [
      {
        url: "/assets/framer/xAqjhbyCb3R1ILsiQUHqIhJM.jpeg",
        alt: "Portrait of Omar Mangin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About me | Omar Mangin",
    description:
      "About Omar Mangin, Senior Product Designer specializing in systems thinking, conversational AI UX, and WCAG 2.2 AA digital accessibility.",
    images: ["/assets/framer/xAqjhbyCb3R1ILsiQUHqIhJM.jpeg"],
  },
};

export default function AboutMePage() {
  const site = getSiteConfig();
  const about = getAboutContent();

  return (
    <div
      id="hero"
      className="flex min-h-screen w-full flex-col items-center bg-[#F5F5F5]"
    >
      <Header author={site.author} nav={site.nav} socials={site.socials} />

      <main
        id="main-content"
        className="flex w-full flex-1 flex-col items-center"
      >
        {/* Bio & Portrait Section (Horizontal with portrait on left) */}
        <section
          aria-labelledby="about-greeting-heading"
          className="section-padding flex w-full flex-col items-center gap-[24px]"
        >
          <div className="flex w-full max-w-[1440px] flex-col items-start gap-[24px] md:flex-row md:items-center md:gap-[40px]">
            {about.portrait && (
              <div className="relative h-[200px] w-[200px] shrink-0 overflow-hidden rounded-[200px] bg-white shadow-sm sm:h-[240px] sm:w-[240px] lg:h-[260px] lg:w-[260px]">
                <Image
                  src={about.portrait}
                  alt="Portrait of Omar Mangin"
                  fill
                  priority
                  sizes="(max-width: 639px) 200px, (max-width: 1023px) 240px, 260px"
                  quality={85}
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex flex-1 flex-col gap-[16px]">
              <h1
                id="about-greeting-heading"
                className="font-display text-[32px] font-normal leading-[1.3] text-[#212529]"
              >
                {about.greeting}
              </h1>

              <div className="flex flex-col gap-[16px]">
                {about.bio.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="font-sans text-[16px] font-normal leading-[24px] text-[#212529]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* My Focus Section */}
        <BentoSection heading={about.focus.heading} headingId="about-focus">
          <BentoCard description={about.focus.body} />
        </BentoSection>

        {/* How I Build with AI Section */}
        <HowIBuildWithAI aiWorkflow={site.aiWorkflow} />

        {/* My Mentors Section */}
        <BentoSection heading={about.mentors.heading} headingId="about-mentors">
          <div className="rounded-[24px] bg-white p-[24px] shadow-[0px_2px_6px_rgba(0,0,0,0.04)]">
            <ul className="mx-auto grid w-full max-w-[1120px] grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0">
              {about.mentors.items.map((mentor) => (
                <li
                  key={mentor.name}
                  className="flex flex-col items-start gap-[12px] p-[8px]"
                >
                  {mentor.image && (
                    <div className="relative h-[80px] w-[80px] overflow-hidden rounded-full bg-[#F5F5F5]">
                      <Image
                        src={mentor.image}
                        alt={mentor.name}
                        fill
                        sizes="80px"
                        quality={85}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-[4px]">
                    <h3 className="font-heading text-[16px] font-bold leading-[24px] text-[#212529]">
                      {mentor.name}
                    </h3>
                    <p className="font-sans text-[12px] leading-[16px] text-[#212529]">
                      {mentor.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </BentoSection>

        {/* My Favorite Things Section */}
        <BentoSection
          heading={about.favoriteThings.heading}
          headingId="about-favorites"
        >
          <BentoGrid columns={2}>
            {about.favoriteThings.items.map((item) => (
              <BentoCard
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </BentoGrid>
        </BentoSection>

        {/* My Skills Section */}
        <BentoSection heading={about.skills.heading} headingId="about-skills">
          <BentoGrid columns={2}>
            <BentoCard title="Product skills">
              <ul className="list-disc space-y-1 pl-5 font-sans text-[16px] leading-[24px] text-[#212529]">
                {about.skills.productSkills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </BentoCard>
            <BentoCard title="Toolkit">
              <ul className="list-disc space-y-1 pl-5 font-sans text-[16px] leading-[24px] text-[#212529]">
                {about.skills.toolkit.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </BentoCard>
          </BentoGrid>
        </BentoSection>
      </main>

      <Footer
        socials={site.socials}
        footerMessage={site.footerMessage}
        showOtherProjects={false}
      />

      {/* Floating Back-to-Top Arrow */}
      <a
        href="#hero"
        aria-label="Back to top of page"
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
