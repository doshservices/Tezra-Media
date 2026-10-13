import { lexicalEditor, UploadFeature } from "@payloadcms/richtext-lexical";

/**
 * The one rich-text editor every long-form field uses.
 *
 * Defined once rather than per collection so the writing experience — and the
 * shape of what gets stored — cannot drift between News, Our Work and Arts.
 *
 * The only change from Payload's defaults is a caption on inserted images. A
 * caption is a property of the placement, not of the photograph: the same
 * picture can illustrate two different points and need two different lines
 * under it. The credit stays on the image itself, in Media, because that one
 * does belong to the photograph wherever it appears.
 */
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
