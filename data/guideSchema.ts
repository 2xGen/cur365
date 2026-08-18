export interface GuidePick {
  slug: string;
  whyWePickIt: string;
  bestFor: string[];
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
}

export interface GuideChecklist {
  title: string;
  items: string[];
}

export interface GuidePage {
  categorySlug: string;
  slug: string;
  title: string;
  description: string;
  picks: GuidePick[];
  picksHeading?: string;
  intro: string;
  sections?: GuideSection[];
  checklist?: GuideChecklist;
  whatToExpect: string[];
  whyMorning?: string;
  whyBlock?: { title: string; content: string };
  faqs?: { question: string; answer: string }[];
}

export const faq = (question: string, answer: string) => ({ question, answer });
