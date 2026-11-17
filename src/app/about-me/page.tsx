import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BentoCard, BentoGrid, BentoSection } from "@/components/ui/BentoGrid";
import { getAboutContent, getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "About me",
  description:
    "About Omar Mangin — Product Designer specializing in systems thinking, conversational AI UX, and WCAG 2.2 AA digital accessibility.",
  openGraph: {
    title: "About me | Omar Mangin",
    description:
      "About Omar Mangin — Product Designer specializing in systems thinking, conversational AI UX, and WCAG 2.2 AA digital accessibility.",
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
      "About Omar Mangin — Product Designer specializing in systems thinking, conversational AI UX, and WCAG 2.2 AA digital accessibility.",
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
      <Header author={site.author} nav={site.nav} />

      <main
        id="main-content"
        className="flex w-full flex-1 flex-col items-center"
      >
        {/* Bio & Portrait Section */}
        <section
          aria-labelledby="about-greeting-heading"
          className="section-padding flex w-full flex-col items-center gap-[24px]"
        >
          <div className="flex w-full max-w-[1440px] flex-col gap-[24px]">
            {about.portrait && (
              <div className="relative h-[220px] w-[220px] overflow-hidden rounded-[200px] bg-white shadow-sm sm:h-[300px] sm:w-[300px]">
                <Image
                  src={about.portrait}
                  alt="Portrait of Omar Mangin"
                  fill
                  priority
                  sizes="300px"
                  quality={85}
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-[24px]">
              <h1
                id="about-greeting-heading"
                className="font-display text-[32px] font-normal leading-[1.4] text-[#212529]"
              >
                {about.greeting}
              </h1>
              <nav aria-label="Direct contact links">
                <ul className="flex items-center gap-[32px] list-none p-0 m-0">
                  {site.socials.map((social) => (
                    <li key={social.platform}>
                      <a
                        href={social.href}
                        target={
                          social.platform !== "email" ? "_blank" : undefined
                        }
                        rel={
                          social.platform !== "email"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        aria-label={
                          social.platform !== "email"
                            ? `${social.label} (opens in a new tab)`
                            : `Send an email (${social.label})`
                        }
                        className="inline-flex rounded-[8px] p-1 text-[#212529] transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B52E6]"
                      >
                        {social.platform === "linkedin" ? (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                          </svg>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                          </svg>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex flex-col gap-[20px]">
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
        </section>

        {/* My Focus Section */}
        <BentoSection heading={about.focus.heading} headingId="about-focus">
          <BentoCard description={about.focus.body} />
        </BentoSection>

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
