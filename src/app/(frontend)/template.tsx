"use client";

/** A template re-mounts per navigation, so the transition replays. Off under reduced-motion. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
