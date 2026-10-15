import type { Access, FieldAccess } from "payload";

/** Role-based access. An editor cannot publish, nor edit something already published. */

type User = { role?: "administrator" | "editor" } | null | undefined;

const roleOf = (user: User) => user?.role;

export const isAdmin: Access = ({ req }) => roleOf(req.user as User) === "administrator";

export const isSignedIn: Access = ({ req }) => Boolean(req.user);

/** Administrators edit anything; editors edit anything not yet published. */
export const canEdit: Access = ({ req }) => {
  const role = roleOf(req.user as User);
  if (role === "administrator") return true;
  if (role === "editor") return { _status: { not_equals: "published" } };
  return false;
};

/** Only administrators may change the publish state. */
export const onlyAdminField: FieldAccess = ({ req }) =>
  roleOf(req.user as User) === "administrator";

/** Published content is public; signed-in staff also see drafts. */
export const publishedOrSignedIn: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};
