import fs from "node:fs";
import path from "node:path";
import type { AboutContent, CaseStudy, SiteConfig } from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "content");
const CASE_STUDIES_DIR = path.join(CONTENT_DIR, "case-studies");

function parseMdxOrJson(rawContent: string): CaseStudy {
  const trimmed = rawContent.trim();
  if (trimmed.startsWith("---")) {
    const endIdx = trimmed.indexOf("\n---", 3);
    if (endIdx !== -1) {
      const frontmatter = trimmed.slice(3, endIdx).trim();
      return JSON.parse(frontmatter) as CaseStudy;
    }
  }
  return JSON.parse(trimmed) as CaseStudy;
}

export function getSiteConfig(): SiteConfig {
  const filePath = path.join(CONTENT_DIR, "site.json");
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as SiteConfig;
}

export function getAboutContent(): AboutContent {
  const filePath = path.join(CONTENT_DIR, "about.json");
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as AboutContent;
}

export function getAllCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) {
    return [];
  }

  const allFiles = fs.readdirSync(CASE_STUDIES_DIR);
  const slugs = new Set<string>();
  for (const f of allFiles) {
    if (f.startsWith("_")) continue;
    if (f.endsWith(".mdx")) {
      slugs.add(f.slice(0, -4));
    } else if (f.endsWith(".json")) {
      slugs.add(f.slice(0, -5));
    }
  }

  const studies: CaseStudy[] = [];
  for (const slug of slugs) {
    const study = getCaseStudyBySlug(slug);
    if (study) {
      studies.push(study);
    }
  }

  return studies.sort((a, b) => a.order - b.order);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const mdxPath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
  if (fs.existsSync(mdxPath)) {
    const raw = fs.readFileSync(mdxPath, "utf8");
    return parseMdxOrJson(raw);
  }

  const jsonPath = path.join(CASE_STUDIES_DIR, `${slug}.json`);
  if (fs.existsSync(jsonPath)) {
    const raw = fs.readFileSync(jsonPath, "utf8");
    return parseMdxOrJson(raw);
  }

  return null;
}
