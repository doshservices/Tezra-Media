import type { CollectionConfig } from "payload";
import { mediaContentTypes } from "@/content/tezra";
import { bodyEditor } from "../editor";
import { canEdit, isAdmin, isSignedIn, publishedOrSignedIn } from "../access";
import { restrictPublishToAdmin, seoFields, slugField } from "../fields";

/** Tezra Media productions. Each one sits under a format card on /media and plays on its own page. */
export const Productions: CollectionConfig = {
  slug: "productions",
  labels: { singular: "Production", plural: "Productions" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "format", "source", "publishedAt", "_status"],
    group: "Content",
    description:
      "Video for Tezra Media. Pick the format card it belongs under, then either paste a YouTube link or upload the file.",
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
      maxLength: 300,
      admin: { description: "One or two sentences, shown under the title and in the playlist." },
    },
    {
      type: "row",
      fields: [
        {
          name: "format",
          type: "select",
          required: true,
          options: mediaContentTypes.map((t) => ({ label: t, value: t })),
          admin: { width: "50%", description: "Which card on the Tezra Media page this appears under." },
        },
        {
          name: "source",
          type: "radio",
          required: true,
          defaultValue: "youtube",
          options: [
            { label: "YouTube link", value: "youtube" },
            { label: "Uploaded video", value: "upload" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "youtubeUrl",
      label: "YouTube link",
      type: "text",
      admin: {
        condition: (data) => data?.source === "youtube",
        description: "Any YouTube address — watch, youtu.be, shorts or embed. Required for a YouTube production.",
      },
      validate: (value: unknown, { data }: { data?: Record<string, unknown> }) => {
        if (data?.source !== "youtube") return true;
        if (typeof value !== "string" || !value.trim()) return "Paste the YouTube link.";
        return /(?:youtube\.com|youtu\.be)/i.test(value) ? true : "That is not a YouTube address.";
      },
    },
    {
      name: "videoSources",
      label: "Video files",
      type: "array",
      labels: { singular: "Quality", plural: "Qualities" },
      admin: {
        condition: (data) => data?.source === "upload",
        description:
          "One row per quality, best first. Add a single row for one file — the quality menu only appears when there is more than one.",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
              defaultValue: "Source",
              admin: { width: "30%", description: "e.g. 1080p" },
            },
            {
              name: "file",
              type: "upload",
              relationTo: "media",
              required: true,
              admin: { width: "70%" },
            },
          ],
        },
      ],
      validate: (value: unknown, { data }: { data?: Record<string, unknown> }) => {
        if (data?.source !== "upload") return true;
        return Array.isArray(value) && value.length > 0 ? true : "Add at least one video file.";
      },
    },
    {
      name: "poster",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Still shown before playback starts. Optional for YouTube, which supplies its own.",
      },
    },
    {
      name: "duration",
      type: "text",
      admin: { description: "Shown on the card, e.g. 12:40. Optional." },
    },
    { name: "description", type: "richText", editor: bodyEditor },
    {
      type: "row",
      fields: [
        {
          name: "publishedAt",
          type: "date",
          admin: { width: "50%", date: { pickerAppearance: "dayAndTime" } },
        },
        {
          name: "order",
          type: "number",
          admin: { width: "50%", description: "Lower numbers play first. Ties fall back to the date." },
        },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "Lead item for its format card." },
    },
    seoFields,
  ],
  hooks: {
    beforeChange: [
      restrictPublishToAdmin,
      ({ data }) => {
        if (data._status === "published" && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
};
