import type { CollectionConfig } from "payload";
import { newsCategories, newsFormats } from "@/content/tezra";
import { bodyEditor } from "../editor";
import { canEdit, isAdmin, isSignedIn, publishedOrSignedIn } from "../access";
import { restrictPublishToAdmin, seoFields, slugField } from "../fields";

/** News articles. Categories and formats read from content/tezra.ts so they cannot drift. */
export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "News article", plural: "News articles" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "format", "publishedAt", "_status"],
    group: "Content",
    description:
      "Articles for Tezra News. Only an administrator can publish; editors can write and save drafts.",
  },
  access: {
    read: publishedOrSignedIn,
    create: isSignedIn,
    update: canEdit,
    delete: isAdmin,
  },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    {
      name: "summary",
      type: "textarea",
      required: true,
      maxLength: 300,
      admin: { description: "One or two sentences. Used on the News listing and in search results." },
    },
    {
      type: "row",
      fields: [
        {
          name: "category",
          type: "select",
          required: true,
          options: newsCategories.map((c) => ({ label: c, value: c })),
          admin: { width: "50%" },
        },
        {
          name: "format",
          type: "select",
          required: true,
          options: newsFormats.map((f) => ({ label: f, value: f })),
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Lead image. Optional — the listing handles articles without one." },
    },
    {
      name: "body",
      type: "richText",
      required: true,
      editor: bodyEditor,
    },
    {
      type: "row",
      fields: [
        {
          name: "publishedAt",
          type: "date",
          admin: {
            width: "50%",
            date: { pickerAppearance: "dayAndTime" },
            description: "Shown as the article date. Defaults to when it is first published.",
          },
        },
        {
          name: "author",
          type: "relationship",
          relationTo: "users",
          defaultValue: ({ user }) => user?.id,
          admin: {
            width: "50%",
            description: "Who wrote it. Defaults to you. Their name becomes the byline.",
          },
        },
      ],
    },
    {
      name: "byline",
      type: "text",
      admin: {
        description:
          "Only needed when the writer has no account here — a guest contributor, a wire service, or a shared credit such as \u201cTezra News staff\u201d. Leave empty to use the author above.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Show on the homepage News section.",
      },
    },
    seoFields,
  ],
  hooks: {
    beforeChange: [
      restrictPublishToAdmin,
      ({ data }) => {
        // Stamp the publication date the first time it goes live.
        if (data._status === "published" && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
};
