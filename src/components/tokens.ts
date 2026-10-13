/**
 * The design tokens, in a module with no "use client" on it.
 *
 * They used to live in shared.tsx, which is a client component. That works for
 * an inline style — React passes the value across the boundary and resolves it
 * in the browser — but it fails silently anywhere a server component builds a
 * string from one. On the server an import from a client module is a reference
 * object, not the text, so `${NAVY}` inside a template literal interpolates the
 * reference's source code instead of "#010066". A stylesheet written that way
 * loses every declaration that mentions a token, with no error anywhere.
 *
 * Keeping the values here means they are real strings in both graphs. shared.tsx
 * re-exports them, so every existing import still works.
 *
 * Palette: navy, white and light grey — the identity TEZRA approved in Draft 1
 * and asked us to retain (review point 25). There is deliberately no gold accent.
 *
 * Typography: Inter for headings, Outfit for body, both loaded in styles/fonts.css.
 * The font choice is still open with TEZRA — switching means editing these three.
 */

export const FONT_HEADING = "'Inter', sans-serif";
export const FONT_BODY = "'Outfit', sans-serif";
export const FONT_ACCENT = "'Cormorant Garamond', serif";

export const NAVY = "#010066";
export const NAVY_HOVER = "#0a0a8a";
export const INK = "#0D0D0D";
export const GREY_BG = "#F4F4F6";
export const BORDER = "#E0E0E8";
export const BODY_TEXT = "#555566";
export const MUTED_TEXT = "#888899";

export const MAX_WIDTH = "1440px";

/**
 * The reading column for a long-form page — an article, a project write-up.
 *
 * Narrower than MAX_WIDTH on purpose. The rest of the site is laid out in grids
 * that want the full width; a piece of writing is one column and reads badly
 * when it is stretched across a desk-width screen. This is close to the measure
 * the Moniepoint article template uses (a 1280px frame with 200px either side),
 * adjusted down a little because Outfit sets wider than the face used there.
 */
export const ARTICLE_WIDTH = "840px";
