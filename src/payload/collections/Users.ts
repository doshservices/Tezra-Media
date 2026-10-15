import type { CollectionConfig } from "payload";
import { isAdmin, onlyAdminField } from "../access";

/** Accounts. Only an administrator can create one or change a role. */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    group: "Settings",
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: async ({ req }) => {
      if ((req.user as { role?: string } | undefined)?.role === "administrator") return true;
      // The first account must be creatable by nobody, or the CMS could never be set up.
      const { totalDocs } = await req.payload.count({
        collection: "users",
        overrideAccess: true,
      });
      return totalDocs === 0;
    },
    update: ({ req }) => {
      if (!req.user) return false;
      if ((req.user as { role?: string }).role === "administrator") return true;
      // An editor may only edit their own account.
      return { id: { equals: req.user.id } };
    },
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: { description: "Full name, as it should appear on anything they publish." },
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      access: { create: onlyAdminField, update: onlyAdminField },
      options: [
        { label: "Administrator — full content management and publishing", value: "administrator" },
        { label: "Editor — create and edit; cannot publish", value: "editor" },
      ],
      admin: {
        description:
          "Only an administrator can change this. The first account created must be an administrator.",
      },
    },
  ],
};
