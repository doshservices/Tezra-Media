"use client";

/**
 * Route transition.
 *
 * A template re-mounts on every navigation (a layout does not), so the CSS
 * animation on this wrapper replays each time the route changes. The animation
 * is disabled under prefers-reduced-motion in globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
