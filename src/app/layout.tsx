import type { Metadata } from "next";
import { Archivo, Archivo_Black, Montserrat } from "next/font/google";
import { getSiteConfig } from "@/lib/content";
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

export function generateMetadata(): Metadata {
  const site = getSiteConfig();
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://omarmangin.com"
    ),
    title: {
      default: `${site.title} — Product Designer`,
      template: `%s | ${site.title}`,
    },
    description: site.description,
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/assets/Brand/favicon.png",
      apple: "/assets/Brand/favicon.png",
    },
    openGraph: {
      title: site.title,
      description: site.description,
      type: "website",
      images: [
        {
          url: "/assets/Brand/social-og.png",
          alt: `${site.title} Product Design Portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
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
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${archivo.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F5F5] text-[#212529]">
        {children}
      </body>
    </html>
  );
}
