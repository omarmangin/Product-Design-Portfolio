import type { Metadata } from "next";
import { Archivo, Archivo_Black, Montserrat } from "next/font/google";
import { getAllCaseStudies, getSiteConfig } from "@/lib/content";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  variable: "--font-archivo-black",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://omarmangin.com";

export function generateMetadata(): Metadata {
  const site = getSiteConfig();
  const fullTitle = `${site.title} | Senior Product Designer · AI Systems & Agentic UX`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: fullTitle,
      template: `%s | ${site.title}`,
    },
    description: site.description,
    keywords: [
      "Product Design",
      "AI UX",
      "Multi-Agent Systems",
      "Design Systems",
      "User Research",
      "Conversational UX",
      "WCAG 2.2 AA",
      "React Prototyping",
    ],
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/assets/Brand/favicon.png",
      apple: "/assets/Brand/favicon.png",
    },
    openGraph: {
      title: fullTitle,
      description: site.description,
      type: "website",
      url: SITE_URL,
      images: [
        {
          url: "/assets/Brand/social-og.png",
          alt: `${site.title}, Senior Product Designer Portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: site.description,
      images: ["/assets/Brand/social-og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = getSiteConfig();
  const studies = getAllCaseStudies().filter((study) => study.featuredOnHome);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: site.author,
        jobTitle: "Senior Product Designer · AI Systems & Agentic UX",
        description: site.description,
        url: SITE_URL,
        knowsAbout: [
          "Product Design",
          "AI UX",
          "Multi-Agent Systems",
          "Design Systems",
          "User Research",
          "Conversational UX",
          "WCAG 2.2 AA",
          "React Prototyping",
        ],
        sameAs: [
          "https://www.linkedin.com/in/omar-mangin",
        ],
      },
      ...studies.map((study) => ({
        "@type": "CreativeWork",
        "@id": `${SITE_URL}/${study.slug}#work`,
        name: study.title,
        headline: study.subtitle,
        description: study.cardOutcomeSummary || study.subtitle,
        url: `${SITE_URL}/${study.slug}`,
        keywords: (study.keywords || study.domainTags || []).join(", "),
        author: {
          "@id": `${SITE_URL}/#person`,
        },
      })),
    ],
  };

  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${archivo.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F5F5] text-[#212529]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
