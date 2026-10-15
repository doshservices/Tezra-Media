import { APIError } from "payload";
import type { CollectionConfig } from "payload";
import { verticals, workCategories } from "@/content/tezra";
import { canEdit, isAdmin, isSignedIn, publishedOrSignedIn } from "../access";
import { restrictPublishToAdmin, seoFields, slugField } from "../fields";
import { bodyEditor } from "../editor";

/** Our Work. Publishing is blocked until verified is ticked, so the rule is enforced not remembered. */
export const Projects: CollectionConfig = {
  slug: "projects",
  labels: { singular: "Project", plural: "Projects" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "client", "verified", "_status"],
    group: "Content",
    description: "Projects and case studies for Our Work.",
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
      admin: { description: "One or two sentences for the Our Work grid." },
    },
    {
      type: "row",
      fields: [
        {
          name: "category",
          type: "select",
          required: true,
          options: workCategories.map((c) => ({ label: c, value: c })),
          admin: { width: "50%" },
        },
        {
          name: "vertical",
          type: "select",
          options: verticals.map((v) => ({ label: v.name, value: v.slug })),
          admin: { width: "50%", description: "Which part of TEZRA delivered it." },
        },
      ],
    },
    {
      name: "client",
      type: "relationship",
      relationTo: "clients",
      admin: {
        description:
          "Only name a client TEZRA has written permission to name. Leave empty otherwise.",
      },
    },
    { name: "image", type: "upload", relationTo: "media" },
    {
      name: "gallery",
      type: "array",
      labels: { singular: "Image", plural: "Images" },
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
    { name: "body", type: "richText", editor: bodyEditor },
    {
      name: "verified",
      type: "checkbox",
      label: "Verified by TEZRA",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description:
          "Tick only once TEZRA has confirmed this project, its results and any client named are accurate. Cannot be published without it.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "Show in Selected Work on the homepage." },
    },
    seoFields,
  ],
  hooks: {
    beforeChange: [restrictPublishToAdmin],
    beforeValidate: [
      ({ data }) => {
        if (data?._status === "published" && !data?.verified) {
          throw new APIError(
            "This project cannot be published until it is marked verified by TEZRA. Unverified projects and case studies must not go live.",
            400,
          );
        }
        return data;
      },
    ],
  },
};
