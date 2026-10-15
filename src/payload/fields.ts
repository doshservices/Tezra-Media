import { APIError } from "payload";
import type { CollectionBeforeChangeHook, Field } from "payload";

/** Field groups reused across collections. */

/** Turns any text into a URL-safe slug. "Lagos New Beach " becomes "lagos-new-beach". */
export const slugify = (input: string): string =>
  input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");

/** URL slug, generated from a title but editable. */
export const slugField = (from = "title"): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description:
      "The web address for this page. Typed in any form, it is tidied into lower case with hyphens. Leave it alone once published — changing it breaks existing links.",
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        // Normalise whatever is typed, or a slug with a space in it matches nothing.
        if (typeof value === "string" && value.trim()) return slugify(value);
        const source = (data as Record<string, unknown> | undefined)?.[from];
        if (typeof source !== "string") return value;
        return slugify(source);
      },
    ],
  },
});

/** Publishing is administrator-only, refused server-side so REST and GraphQL are covered too. */
export const restrictPublishToAdmin: CollectionBeforeChangeHook = ({
  data,
  req,
  originalDoc,
}) => {
  const role = (req.user as { role?: string } | undefined)?.role;
  if (role === "administrator") return data;

  const wasPublished = originalDoc?._status === "published";
  const nowPublished = data?._status === "published";

  if (nowPublished && !wasPublished) {
    // APIError, not Error — a plain Error surfaces as "Something went wrong".
    throw new APIError(
      "Only an administrator can publish. Save this as a draft and ask an administrator to publish it.",
      403,
    );
  }

  return data;
};

/** Search-engine overrides. Falls back to the page's own title and summary. */
export const seoFields: Field = {
  type: "collapsible",
  label: "Search engine listing",
  admin: { initCollapsed: true },
  fields: [
    {
      name: "metaTitle",
      type: "text",
      admin: { description: "Leave empty to use the title above. Around 60 characters shows in full." },
    },
    {
      name: "metaDescription",
      type: "textarea",
      admin: { description: "Leave empty to use the summary. Around 155 characters shows in full." },
    },
  ],
};
