import type { CollectionConfig } from "payload";
import { canEdit, isAdmin, isSignedIn, publishedOrSignedIn } from "../access";
import { restrictPublishToAdmin } from "../fields";

/**
 * Leadership team.
 *
 * Reached through About rather than from the main navigation (feedback 1.2).
 * Names, positions, biographies and photographs are all still to be provided,
 * so nothing is seeded — invented people are explicitly ruled out (feedback 4).
 */
export const Leadership: CollectionConfig = {
  slug: "leadership",
  labels: { singular: "Leader", plural: "Leadership" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "position", "order", "_status"],
    group: "Content",
    description: "People shown on the Leadership page.",
  },
  access: {
    read: publishedOrSignedIn,
    create: isSignedIn,
    update: canEdit,
    delete: isAdmin,
  },
  versions: { drafts: true },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "position",
      type: "text",
      required: true,
      admin: { description: "Job title, e.g. Founder & Group CEO." },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      admin: { description: "Professional photograph. The page handles a missing one." },
    },
    { name: "bio", type: "textarea", admin: { description: "Biography." } },
    {
      name: "linkedin",
      type: "text",
      label: "LinkedIn",
      admin: { description: "Optional. Full address including https://" },
    },
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
  ],
  hooks: {
    beforeChange: [restrictPublishToAdmin],
  },
};
