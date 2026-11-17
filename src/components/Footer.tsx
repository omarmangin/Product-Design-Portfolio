import type { CaseStudy, SocialLink } from "@/types/content";
import { ProjectCard } from "./ProjectCard";

interface FooterProps {
  socials: SocialLink[];
  footerMessage: string;
  otherProjects?: CaseStudy[];
  showOtherProjects?: boolean;
}

export function Footer({
  socials,
  footerMessage,
  otherProjects = [],
  showOtherProjects = false,
}: FooterProps) {
  return (
    <footer
      className="footer-padding flex w-full flex-col items-center gap-[40px]"
      style={{ backgroundColor: "rgba(245, 245, 245, 0.88)" }}
    >
      {showOtherProjects && otherProjects.length > 0 && (
        <section
          aria-labelledby="other-projects-heading"
          className="flex w-full max-w-[1440px] flex-col items-center gap-[24px]"
        >
          <h2
            id="other-projects-heading"
            className="w-full text-left font-display text-[32px] font-normal leading-[1.4] text-[#212529]"
          >
            Check some of my other projects
          </h2>
          <nav aria-label="Other case studies" className="w-full">
            <ul className="flex w-full gap-[16px] overflow-x-auto pb-2 snap-x snap-mandatory list-none p-0 m-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
              {otherProjects.map((project) => (
                <li
                  key={project.slug}
                  className="w-[272px] shrink-0 snap-start sm:w-[320px] lg:w-full"
                >
                  <ProjectCard study={project} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </nav>
        </section>
      )}

      {/* Centered Social Icons + Footer Copy matching Framer node k0ADCJw8B */}
      <div className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-[16px] text-center">
        <nav aria-label="Social and contact links">
          <ul className="flex items-center justify-center gap-[24px] list-none p-0 m-0">
            {socials.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  target={social.platform !== "email" ? "_blank" : undefined}
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
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  ) : (
                    <svg
                      width="32"
                      height="32"
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

        <p className="text-center font-sans text-[16px] font-normal leading-[24px] text-[#212529]">
          {footerMessage}
        </p>
      </div>
    </footer>
  );
}
