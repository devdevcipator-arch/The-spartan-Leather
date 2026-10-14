"use client";

import React, { useEffect, useRef, useState } from "react";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  withDivider?: boolean;
}

export default function SectionReveal({
  children,
  className = "",
  id,
  withDivider = false,
}: SectionRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once revealed, unobserve to maintain clean performance
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative w-full spartan-section-reveal ${
        isVisible ? "is-visible" : ""
      } ${className}`}
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
