export const inquiryLabels = {
  website: "Website project or updates",
  care: "Ongoing Site Care",
  technical: "Technical writing & documentation",
  grant: "Grant research & writing",
  business: "Business Solutions & process support",
  role: "Developer / job opportunity",
  general: "General inquiry",
} as const;

export type InquiryType = keyof typeof inquiryLabels;

export const inquiryDetails: Record<
  InquiryType,
  { intro: string; messageLabel: string; buttonLabel: string }
> = {
  website: {
    intro:
      "For a new website, a refresh, or changes to a website you already have.",
    messageLabel: "What would you like the website to do better?",
    buttonLabel: "Send website inquiry ↗",
  },
  care: {
    intro:
      "For ongoing website support, routine updates, and monthly Site Care.",
    messageLabel: "What kind of ongoing help do you expect to need?",
    buttonLabel: "Ask about Site Care ↗",
  },
  technical: {
    intro:
      "For user guides, SOPs, onboarding content, help-center articles, and other documentation.",
    messageLabel: "What information or process needs to be clearer?",
    buttonLabel: "Send documentation inquiry ↗",
  },
  grant: {
    intro:
      "For grant research, opportunity evaluation, funding roadmaps, and clearly defined grant-writing support.",
    messageLabel: "What organization, project, or funding need should I know about?",
    buttonLabel: "Send grant inquiry ↗",
  },
  business: {
    intro: "For help organizing everyday business processes, information, and workflows.",
    messageLabel: "What task or process would you like to make easier?",
    buttonLabel: "Send business support inquiry ↗",
  },
  role: {
    intro:
      "For frontend, web development, contract, or related technical opportunities.",
    messageLabel: "What should I know about the opportunity?",
    buttonLabel: "Send opportunity message ↗",
  },
  general: {
    intro:
      "For anything that does not fit the other options. A short note is completely fine.",
    messageLabel: "What would you like to discuss?",
    buttonLabel: "Send message ↗",
  },
};


export type IntakeField = { name: string; label: string; options?: string[]; placeholder?: string };
export const inquiryFields: Record<InquiryType, IntakeField[]> = {
  website: [
    { name: "projectType", label: "What kind of website help?", options: ["New website", "Redesign or refresh", "Updates to an existing website", "Not sure—help me choose"] },
    { name: "packageInterest", label: "Package interest", options: ["$1,500 — 1–3 pages", "$2,500 — 4–7 pages", "$4,500 — custom project", "Small updates / separate quote", "Not sure—help me choose"] },
    { name: "timeframe", label: "Ideal timeframe", placeholder: "A target date, or flexible" },
  ],
  care: [
    { name: "siteStatus", label: "Do you already have a website?", options: ["Yes, it is live", "It is being built", "No, I need a website first", "Not sure"] },
    { name: "updateFrequency", label: "How often do you expect to need updates?", options: ["Occasionally", "About monthly", "Several times a month", "Not sure yet"] },
  ],
  technical: [
    { name: "documentType", label: "Document type", options: ["User guide / help articles", "SOP / process documentation", "Onboarding / training materials", "Other / not sure"] },
    { name: "audience", label: "Who will use it?", placeholder: "Customers, staff, volunteers, or another audience" },
    { name: "timeframe", label: "Deadline, if any" },
  ],
  grant: [
    { name: "organizationType", label: "Organization type", options: ["Nonprofit", "School / education", "Small business", "Community group", "Other / not sure"] },
    { name: "grantHelp", label: "What kind of grant help?", options: ["Find and evaluate opportunities", "Help with an identified grant", "Not sure where to start"] },
    { name: "timeframe", label: "Application deadline, if known" },
  ],
  business: [
    { name: "supportArea", label: "Where would support help?", options: ["Organizing a process or workflow", "Forms, templates, or business information", "Documentation or training materials", "Other / not sure"] },
    { name: "timeframe", label: "Ideal timeframe" },
  ],
  role: [
    { name: "roleTitle", label: "Role or opportunity" },
    { name: "opportunityType", label: "Opportunity type", options: ["Employment", "Contract / freelance", "Other"] },
  ],
  general: [],
};
export const linkLabels: Record<InquiryType, string> = {
  website: "Current website, if you have one",
  care: "Current website, if you have one",
  technical: "Existing document or project link",
  grant: "Organization website or grant opportunity link",
  business: "Relevant website or project link",
  role: "Job posting or company link",
  general: "Relevant link",
};
export function isInquiryType(value: string): value is InquiryType {
  return Object.prototype.hasOwnProperty.call(inquiryLabels, value);
}
