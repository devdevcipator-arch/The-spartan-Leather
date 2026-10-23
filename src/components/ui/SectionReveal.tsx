import React from "react";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  withDivider?: boolean;
}

/**
 * Marks a page section for the scroll-triggered reveal animation
 * (blur / fade / slide-up). Detection, staggering, and cleanup are
 * handled globally by <RevealObserver /> mounted in the root layout.
 */
export default function SectionReveal({
  children,
  className = "",
  id,
  withDivider = false,
}: SectionRevealProps) {
  return (
    <section
      id={id}
      data-reveal
      className={`relative w-full ${className}`}
    >
      {/* Optional Subtle Luxury Gold Horizon Divider between sections */}
      {withDivider && (
        <div className="w-full flex items-center justify-center py-4">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-[48px]">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#7A5C22]/35 to-transparent" />
          </div>
        </div>
      )}
      {children}
    </section>
  );
}
