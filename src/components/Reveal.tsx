"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll-reveal primitives.
 *
 * Deliberately CSS-driven rather than a motion library: the site is static
 * editorial content, so an IntersectionObserver toggling one class is enough and
 * costs no dependency, no bundle weight and no hydration complexity.
 *
 * The actual transitions live in styles/globals.css under .reveal / .reveal-group
 * so grid children animate without being wrapped in extra elements, which would
 * break the grid.
 *
 * Accessibility and robustness:
 *   - prefers-reduced-motion skips the animation entirely and shows content.
 *   - A <noscript> rule in the layout forces everything visible without JS, so
 *     the page is never blank for a crawler or a reader with JS disabled.
 */

function useInView<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setInView(true);
      return;
    }

    // Already on screen at mount (above the fold) — reveal without waiting.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/** Fades and lifts a single block into view. */
export function Reveal({
  children,
  delay = 0,
  style,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </div>
  );
}

/**
 * Reveals direct children in sequence. Put this class on a grid or flex
 * container and its items stagger in without extra wrapper elements.
 */
export function RevealGroup({
  children,
  style,
  className = "",
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.08);
  return (
    <div
      ref={ref}
      className={`reveal-group ${inView ? "is-visible" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
