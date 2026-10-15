import { APIError } from "payload";
import type { CollectionConfig } from "payload";
import { canEdit, isAdmin, isSignedIn, publishedOrSignedIn } from "../access";
import { restrictPublishToAdmin, slugField } from "../fields";

/** Clients and partners. Permission is required, and publishing is blocked without it. */
export const Clients: CollectionConfig = {
  slug: "clients",
  labels: { singular: "Client or partner", plural: "Clients and partners" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "relationship", "permissionToDisplay", "_status"],
    group: "Content",
    description: "Organisations shown in the Clients & Partners logo wall.",
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
    slugField("name"),
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: { description: "Approved logo file, ideally on a transparent background." },
    },
    {
      name: "relationship",
      type: "select",
      required: true,
      defaultValue: "client",
      options: [
        { label: "Client", value: "client" },
        { label: "Partner", value: "partner" },
        { label: "Sponsor", value: "sponsor" },
        { label: "Institutional collaborator", value: "institution" },
      ],
    },
    {
      name: "website",
      type: "text",
      admin: { description: "Optional. Full address including https://" },
    },
    {
      name: "permissionToDisplay",
      type: "checkbox",
      label: "Permission to display the logo",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description:
          "Tick only once TEZRA confirms written permission to show this logo. Cannot be published without it.",
      },
    },
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
  ],
  hooks: {
    beforeChange: [restrictPublishToAdmin],
    beforeValidate: [
      ({ data }) => {
        if (data?._status === "published" && !data?.permissionToDisplay) {
          throw new APIError(
            "This logo cannot be published until permission to display it is confirmed.",
            400,
          );
        }
        return data;
      },
    ],
  },
};
