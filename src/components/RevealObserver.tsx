"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * RevealObserver
 *
 * Global scroll-triggered animation driver for every element marked with
 * `data-reveal`. Reveals with a blur / fade / slide-up transition:
 *
 * - Fires when 15% of the target is visible within a trigger zone raised
 *   40px from the bottom of the viewport (threshold: 0.15, rootMargin
 *   "0px 0px -40px 0px").
 * - Plays once: the element is unobserved immediately after triggering.
 * - Siblings sharing the same parent are staggered by 120ms per item
 *   (0ms, 120ms, 240ms, ...) via the `--reveal-delay` CSS variable.
 * - After the 0.8s transition completes, the `data-reveal` attribute is
 *   removed so native hover states and element transitions operate
 *   uninhibited.
 * - Re-scans the DOM on every client-side route/page change and whenever
 *   new `data-reveal` elements are mounted (e.g. filtered product grids).
 * - Honors `prefers-reduced-motion: reduce` by showing everything
 *   instantly with no transition.
 */

const REVEAL_SELECTOR = "[data-reveal]";
const STAGGER_DELAY_MS = 120;
const TRANSITION_DURATION_MS = 800;
const CLEANUP_BUFFER_MS = 120;

export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Graceful degradation: if IntersectionObserver is unavailable,
    // strip the attribute so nothing is stuck invisible.
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        el.removeAttribute("data-reveal");
      });
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observed = new WeakSet<HTMLElement>();

    // Sibling stagger: 120ms per preceding [data-reveal] sibling
    // that shares the same parent container.
    const getStaggerDelay = (el: HTMLElement): number => {
      const parent = el.parentElement;
      if (!parent) return 0;
      let index = 0;
      for (const child of parent.children) {
        if (child === el) break;
        if (child instanceof HTMLElement && child.hasAttribute("data-reveal")) {
          index++;
        }
      }
      return index * STAGGER_DELAY_MS;
    };

    const reveal = (el: HTMLElement) => {
      // Play once — never re-animate an element.
      if (observed.has(el) === false) return;
      observed.delete(el);

      let finalized = false;
      const finalize = () => {
        if (finalized) return;
        finalized = true;
        window.clearTimeout(fallbackTimer);
        el.removeEventListener("transitionend", handleTransitionEnd);
        el.style.removeProperty("--reveal-transition-delay");
        el.classList.remove("is-revealed");
        // Remove the attribute once the reveal is complete so native
        // hover states / element transitions operate uninhibited.
        el.removeAttribute("data-reveal");
      };

      const handleTransitionEnd = (event: TransitionEvent) => {
        // Ignore bubbled transitions from child elements.
        if (event.target !== el) return;
        if (event.propertyName !== "transform") return;
        finalize();
      };

      const delay = reducedMotion ? 0 : getStaggerDelay(el);
      el.style.setProperty(
        "--reveal-transition-delay",
        reducedMotion ? "0ms" : `${delay}ms`
      );
      el.classList.add("is-revealed");

      // Fallback cleanup in case transitionend never fires
      // (e.g. hidden tab, interrupted rendering). Under reduced motion
      // there is no transition to wait for — clean up right away.
      const fallbackTimer = window.setTimeout(
        finalize,
        reducedMotion ? 0 : delay + TRANSITION_DURATION_MS + CLEANUP_BUFFER_MS
      );
      el.addEventListener("transitionend", handleTransitionEnd);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          // Play once — unobserve immediately after triggering.
          observer.unobserve(entry.target);
          reveal(entry.target as HTMLElement);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        observer.observe(el);
      });
    };

    scan();

    // Catch dynamically mounted [data-reveal] nodes
    // (e.g. product cards rendered after filtering / data loading).
    let scanQueued = false;
    const mutationObserver = new MutationObserver(() => {
      if (scanQueued) return;
      scanQueued = true;
      window.requestAnimationFrame(() => {
        scanQueued = false;
        scan();
      });
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
    // Re-run the observer scan on every client-side route/page change.
  }, [pathname]);

  return null;
}
