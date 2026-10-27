import type { CollectionConfig } from "payload";
import { canEdit, isAdmin, isSignedIn } from "../access";

/** Uploaded images. Alt text is required; the sizes match how the site actually uses them. */
export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content" },
  access: {
    read: () => true,
    create: isSignedIn,
    update: canEdit,
    delete: isAdmin,
  },
  upload: {
    staticDir: "public/uploads",
    mimeTypes: ["image/*", "video/*"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 900 },
      { name: "feature", width: 1400 },
      { name: "masthead", width: 2000 },
    ],
    adminThumbnail: "thumbnail",
    focalPoint: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description:
          "Describe what is in the picture, or what happens in the clip, for screen readers " +
          "and search engines. Not a caption.",
      },
    },
    {
      name: "credit",
      type: "text",
      admin: { description: "Photographer or source, where one must be credited." },
    },
    {
      name: "isTezraOwn",
      type: "checkbox",
      label: "TEZRA's own photograph",
      defaultValue: false,
      admin: {
        description:
          "Tick only for TEZRA's own photography. Stock imagery is allowed for atmosphere, but must never be presented as TEZRA's own work, people, clients or artworks.",
      },
    },
  ],
};
