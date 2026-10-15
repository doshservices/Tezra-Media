import { lexicalEditor, UploadFeature } from "@payloadcms/richtext-lexical";

/** One editor for every long-form field, plus a caption on inserted images. */
export const bodyEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: "caption",
              type: "text",
              admin: {
                description:
                  "The line printed under the image. Optional — leave it empty and only the credit shows.",
              },
            },
          ],
        },
      },
    }),
  ],
});
