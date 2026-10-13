export interface ExternalLink {
  label: string;
  href: string;
  kind?: 'github' | 'live' | 'contact';
}

export interface PortfolioProject {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  href: string;
  visual: 'event' | 'writing' | 'campaign' | 'dashboard' | 'mobile';
  note?: string;
  linkLabel?: string;
  live?: ExternalLink;
  cover: { label: string; title: string; subtitle: string };
}

export interface PlaceholderProject {
  id: string;
  category: string;
  title: string;
  prompt: string;
  visual: 'poster' | 'photo' | 'social' | 'campaign' | 'research';
}

export interface PortfolioContent {
  seo: {
    title: string;
    description: string;
    keywords: string[];
    siteName: string;
    personJobTitle: string;
    siteUrl: string;
    ogImage: string;
  };
  brand: { name: string; mark: string; descriptor: string; credit: string };
  navigation: {
    ariaLabel: string;
    skipLabel: string;
    menuLabel: string;
    closeLabel: string;
    progressLabel: string;
    links: { label: string; href: string }[];
  };
  hero: {
    title: string;
    subtitle: string;
    descriptor: string;
    image: string;
    imageAlt: string;
    portraitLabel: string;
    portraitPrompt: string;
    issue: string;
    scrollCue: string;
    availability: string;
    workLink: string;
    signature: string;
  };
  intro: {
    heading: string;
    greeting: string;
    index: string;
    firstName: string;
    lastName: string;
    aka: string;
    label: string;
    paragraphs: string[];
    links: ExternalLink[];
    note: string;
  };
  skills: {
    heading: string;
    index: string;
    label: string;
    circleCaption: string;
    note: string;
    items: { name: string; detail: string; symbol: string }[];
  };
  toolsAndAwards: {
    heading: string;
    index: string;
    cue: string;
    toolsLabel: string;
    toolsNote: string;
    practiceLabel: string;
    practiceAreas: string[];
    technicalLabel: string;
    technicalAreas: string[];
    tools: string[];
    awardsLabel: string;
    awardsNote: string;
    awardsPlaceholder: string;
  };
  campaigns: {
    heading: string;
    index: string;
    statusLabel: string;
    intro: string;
    cards: PlaceholderProject[];
    eventGroups: { title: string; eyebrow: string; items: { name: string; date: string; description: string }[] }[];
    research: { title: string; description: string }[];
  };
  work: {
    heading: string;
    index: string;
    statusLabel: string;
    intro: string;
    projects: PortfolioProject[];
    videoPlaceholder: PlaceholderProject;
    linkLabel: string;
    sectionNote: string;
  };
  social: {
    heading: string;
    index: string;
    statusLabel: string;
    intro: string;
    profiles: PlaceholderProject[];
    note: string;
    categories: string[];
    openLabel: string;
    closeLabel: string;
    items: { id: string; category: string; title: string; subtitle: string; body: string; visual: 'photo' | 'research' | 'writing'; image?: string; href?: string; linkLabel?: string; status: string }[];
    skillCards: { name: string; detail: string; symbol: string }[];
  };
  landing: {
    heading: string;
    index: string;
    statusLabel: string;
    linkLabel: string;
    intro: string;
    projects: PortfolioProject[];
    poster: PlaceholderProject;
  };
  contact: {
    heading: string;
    index: string;
    message: string;
    placeholderTitle: string;
    placeholderCopy: string;
    github: ExternalLink;
    instagram: ExternalLink;
    pdf: { label: string; href: string };
    footerNote: string;
    topLabel: string;
    email: string;
    emailLabel: string;
    copyLabel: string;
    copiedLabel: string;
    copyError: string;
  };
  motion: { pause: string; play: string; cursor: string };
  accessibility: { externalLink: string; openGithub: string; scrollProgress: string };
}
