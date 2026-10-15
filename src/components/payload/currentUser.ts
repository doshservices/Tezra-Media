import { headers as nextHeaders } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";

/** Who is signed in. Shared so the sidebar and header avatar cannot disagree. */
export type CurrentUser = {
  /** Display name, falling back to the email when none is set. */
  name: string;
  /** "Administrator" or "Editor", ready to display. */
  roleLabel: string;
  /** One or two letters, since Users carry no photograph. */
  initials: string;
};

const ROLE_LABELS: Record<string, string> = {
  administrator: "Administrator",
  editor: "Editor",
};

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
  const payload = await getPayload({ config });
  const headers = await nextHeaders();
  const { user } = await payload.auth({ headers });

  if (!user) return null;

  const name = typeof user.name === "string" && user.name ? user.name : user.email;
  const role = typeof user.role === "string" ? user.role : "";

  // Splitting on @ and . means an email standing in for a missing name still gives initials.
  const initials = name
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return { name, roleLabel: ROLE_LABELS[role] ?? "", initials };
};
