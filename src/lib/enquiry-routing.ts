import { contact, contactCategories } from "@/content/tezra";

/** Where each enquiry category is delivered, per the client's 10 November brief. */
const RECIPIENTS: Record<string, string> = {
  "art-acquisition": "arts@tezragroup.com",
  "art-commission": "arts@tezragroup.com",
  "news-editorial": "news@tezragroup.com",
  "media-production": "media@tezragroup.com",
  "strategic-communications": "business.development@tezragroup.com",
  "advertising-partnership": "business.development@tezragroup.com",
  general: "business.development@tezragroup.com",
};

/** Falls back to business development: an unroutable enquiry is still an enquiry. */
export const recipientFor = (category: string): string =>
  RECIPIENTS[category] ?? contact.formRecipient;

export const labelFor = (category: string): string =>
  contactCategories.find((c) => c.value === category)?.label ?? "General Enquiry";
