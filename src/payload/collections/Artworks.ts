import type { CollectionConfig } from "payload";
import { canEdit, isAdmin, isSignedIn, publishedOrSignedIn } from "../access";
import { restrictPublishToAdmin, seoFields, slugField } from "../fields";
import { bodyEditor } from "../editor";

/** Arts catalogue. Enquiry only; price shows only when ticked. Artist details sit on the work. */
export const Artworks: CollectionConfig = {
  slug: "artworks",
  labels: { singular: "Artwork", plural: "Artworks" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "artistName", "availability", "_status"],
    group: "Content",
    description:
      "Works for Tezra Arts. Enquiry only for now — nothing here takes a payment.",
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
      name: "images",
      type: "array",
      minRows: 1,
      labels: { singular: "Image", plural: "Images" },
      admin: { description: "First image is the one used in the catalogue grid." },
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
    {
      type: "row",
      fields: [
        { name: "artistName", label: "Artist", type: "text", required: true, admin: { width: "50%" } },
        {
          name: "year",
          type: "text",
          admin: { width: "50%", description: "Year of the work, or a range." },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "medium", type: "text", admin: { width: "50%", description: "e.g. Oil on canvas." } },
        { name: "dimensions", type: "text", admin: { width: "50%", description: "e.g. 120 x 90 cm." } },
      ],
    },
    {
      name: "artistBio",
      type: "textarea",
      label: "Artist biography",
      admin: { description: "Shown on the artwork page." },
    },
    { name: "description", type: "richText", editor: bodyEditor },
    {
      name: "availability",
      type: "select",
      required: true,
      defaultValue: "enquire",
      options: [
        { label: "Available — enquire", value: "enquire" },
        { label: "Sold", value: "sold" },
        { label: "Not for sale", value: "not-for-sale" },
        { label: "On loan or exhibition", value: "on-loan" },
      ],
    },
    {
      type: "collapsible",
      label: "Price",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "price",
          type: "number",
          min: 0,
          admin: { description: "Leave empty for price on request." },
        },
        {
          name: "currency",
          type: "select",
          defaultValue: "NGN",
          options: [
            { label: "Naira (NGN)", value: "NGN" },
            { label: "US dollar (USD)", value: "USD" },
            { label: "Pound sterling (GBP)", value: "GBP" },
          ],
        },
        {
          name: "showPrice",
          type: "checkbox",
          label: "Show price publicly",
          defaultValue: false,
          admin: { description: "Leave unticked to show \"Price on request\" instead." },
        },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "Show on the homepage Arts section." },
    },
    seoFields,
  ],
  hooks: {
    beforeChange: [restrictPublishToAdmin],
  },
};
