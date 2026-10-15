import type { GlobalConfig } from "payload";
import { isAdmin } from "../access";

/** Site settings, so the outstanding TEZRA details stop being code edits. Administrators only. */
export const SiteSettings: GlobalConfig = {
  slug: "settings",
  label: "Site settings",
  admin: {
    group: "Settings",
    description: "Contact details, social accounts and legal pages.",
  },
  access: { read: () => true, update: isAdmin },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Contact",
          description: "Email and phone are confirmed. The physical address is still to be provided.",
          fields: [
            {
              name: "email",
              type: "email",
              admin: { description: "Confirmed: business.development@tezragroup.com" },
            },
            {
              name: "phone",
              type: "text",
              admin: { description: "Confirmed: +234 704 700 2665" },
            },
            {
              name: "address",
              type: "textarea",
              admin: { description: "Physical address. Still outstanding — leave empty and it is not shown." },
            },
            {
              name: "formRecipient",
              type: "email",
              label: "Contact form goes to",
              admin: {
                description:
                  "Where enquiries are delivered. Leave empty to use the confirmed business development inbox.",
              },
            },
          ],
        },
        {
          label: "Social",
          description:
            "TEZRA confirmed four handles but not the platforms. Add one row per account, with the platform and the full address, and the footer icons appear. An entry with no address is not shown, so nothing ever links nowhere.",
          fields: [
            {
              name: "socialAccounts",
              type: "array",
              labels: { singular: "Account", plural: "Accounts" },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "owner",
                      type: "text",
                      required: true,
                      admin: { width: "50%", description: "e.g. TEZRA, Tezra Media" },
                    },
                    {
                      name: "platform",
                      type: "select",
                      required: true,
                      admin: { width: "50%" },
                      options: [
                        { label: "Instagram", value: "instagram" },
                        { label: "X", value: "x" },
                        { label: "LinkedIn", value: "linkedin" },
                        { label: "Facebook", value: "facebook" },
                        { label: "YouTube", value: "youtube" },
                        { label: "TikTok", value: "tiktok" },
                      ],
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "handle",
                      type: "text",
                      required: true,
                      admin: { width: "50%", description: "e.g. @tezragroup" },
                    },
                    {
                      name: "url",
                      type: "text",
                      required: true,
                      admin: { width: "50%", description: "Full address including https://" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Legal",
          description:
            "Privacy Policy and Terms of Use wording is still to be provided. A page appears in the footer only once its wording is filled in here — an empty policy page is worse than none.",
          fields: [
            { name: "privacyPolicy", type: "richText" },
            { name: "termsOfUse", type: "richText" },
          ],
        },
      ],
    },
  ],
};
