export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: "linkedin" | "email" | "instagram";
  label: string;
  href: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  nav: NavItem[];
  socials: SocialLink[];
  home: {
    headline: string;
    subheadline: string;
    proofPills: string[];
  };
  aiWorkflow: {
    heading: string;
    description?: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  footerMessage: string;
}

export type PrototypeDemoType =
  | "ai-governance"
  | "wcag-streaming-chat"
  | "m365-confidence-store";

export interface SlideItem {
  title: string;
  image?: string;
  images?: string[];
  alt?: string;
}

export type CaseStudySection =
  | {
      type: "about";
      heading?: string;
      company: string;
      timeline: string;
      role: string;
    }
  | {
      type: "challenges";
      heading: string;
      overviewTitle: string;
      overviewBody: string;
      items: {
        title: string;
        description: string;
      }[];
    }
  | {
      type: "split-cards";
      heading: string;
      headingColor?: string;
      description?: string;
      cards: {
        title: string;
        accentTitle?: boolean;
        description: string;
        bullets?: { title: string; description: string; accentTitle?: boolean }[];
        image?: string;
        images?: string[];
        transparentDiagram?: boolean;
      }[];
    }
  | {
      type: "design-showcase";
      heading: string;
      description?: string;
      gradient?: string;
      cardMaxWidth?: number;
      featureGridIntro?: {
        title: string;
        description: string;
      };
      featureGrid?: {
        title: string;
        image: string;
      }[];
      flows: {
        title?: string;
        description?: string;
        slides?: SlideItem[];
        whatIDid?: string[];
        impact?: string[];
      }[];
      prototypeEmbedUrl?: string;
      prototypeCaption?: string;
      prototypeDemo?: PrototypeDemoType;
      prototypeTitle?: string;
    }
  | {
      type: "prototype-embed";
      heading?: string;
      description?: string;
      demoType?: PrototypeDemoType;
      embedUrl?: string;
      title?: string;
      caption?: string;
    }
  | {
      type: "cards-grid";
      heading: string;
      headingColor?: string;
      description?: string;
      columns?: 1 | 2 | 3;
      accentTitles?: boolean;
      cards: {
        title: string;
        description?: string;
        colSpan?: 1 | 2 | 3;
        horizontalSplit?: boolean;
        image?: string;
        images?: string[];
        transparentDiagram?: boolean;
      }[];
    }
  | {
      type: "research-showcase";
      heading: string;
      leftCard: {
        title: string;
        description: string;
        competitors: {
          name: string;
          logo: string;
        }[];
      };
      rightCards: {
        title: string;
        description: string;
      }[];
    }
  | {
      type: "iterations-showcase";
      heading: string;
      description?: string;
      cards: {
        title: string;
        description?: string;
        images?: string[];
      }[];
      beforeAfter?: {
        title: string;
        description?: string;
        beforeImage: string;
        afterImage: string;
      };
    }
  | {
      type: "design-system-showcase";
      heading: string;
      headingColor?: string;
      description?: string;
      variant?: "default" | "brand";
      gradient?: string;
      versions: {
        title?: string;
        titleColor?: string;
        description?: string;
        typography: {
          description: string;
          specimens: {
            fontName: string;
            size: string;
            weightLabel: string;
            weight: number;
          }[];
        };
        colors: {
          description: string;
          groups: {
            title: string;
            swatches: string[];
          }[];
        };
        gridsCard?: {
          title: string;
          description: string;
          image: string;
        };
        iconographyCard?: {
          title: string;
          description: string;
          image: string;
        };
        componentsCard?: {
          title: string;
          image: string;
        };
      }[];
      atomicNote?: {
        title: string;
        description?: string;
        categories: {
          title: string;
          description: string;
        }[];
      };
    }
  | {
      type: "video-showcase";
      heading: string;
      borderColor?: string;
      items: {
        title: string;
        videos?: string[];
        images?: string[];
        fullWidth?: boolean;
        horizontalSplit?: boolean;
      }[];
    }
  | {
      type: "results";
      heading: string;
      leftColumn: {
        title: string;
        items: {
          number?: string;
          title?: string;
          description?: string;
          bullets?: string[];
        }[];
      };
      rightColumn: {
        title: string;
        items: {
          title: string;
          description?: string;
          bullets?: string[];
        }[];
      };
      bottomCard?: {
        title: string;
        items: {
          title: string;
          description: string;
        }[];
      };
    };

export interface ExecutiveSummary {
  role?: string;
  timeline?: string;
  roleAndScope: string;
  coreDecision: string;
  verifiedOutcome: string;
  keywords: string[];
}

export interface CaseStudy {
  slug: string;
  order: number;
  featuredOnHome: boolean;
  showInFooterCarousel: boolean;
  title: string;
  cardTitle?: string;
  shortTitle?: string;
  subtitle: string;
  timelineBadge: string;
  company: string;
  roleType?: string;
  cardOutcomeSummary: string;
  domainTags: string[];
  keywords: string[];
  executiveSummary?: ExecutiveSummary;
  thumbnail: string;
  thumbnailHover?: string;
  thumbnailDescription: string;
  theme: {
    gradient: string;
    sectionGradient?: string;
    accentColor: string;
    borderColor?: string;
  };
  heroLayout?: "three-equal" | "moov-devices" | "single";
  heroImages: string[];
  sections: CaseStudySection[];
}

export interface AboutContent {
  title: string;
  greeting: string;
  portrait?: string;
  bio: string[];
  focus: {
    heading: string;
    body: string;
  };
  mentors: {
    heading: string;
    items: {
      name: string;
      description: string;
      image?: string;
    }[];
  };
  favoriteThings: {
    heading: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  skills: {
    heading: string;
    productSkills: string[];
    toolkit: string[];
  };
}
