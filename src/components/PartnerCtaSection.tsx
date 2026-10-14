"use client";

import React from "react";
import Image from "next/image";

interface PartnerCtaSectionProps {
  whatsappNumber?: string;
  defaultMessage?: string;
}

export default function PartnerCtaSection({
  whatsappNumber = "923000000000",
  defaultMessage = "Hello The Spartan Leather, I am interested in partnering with you for custom leather goods and wholesale manufacturing.",
}: PartnerCtaSectionProps) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <div className="relative w-full py-20 sm:py-28 px-6 sm:px-8 md:px-[48px] overflow-hidden">
      {/* Background Workshop Image with Dark Atmospheric Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/workshop-cta-bg.jpg"
          alt="Leather Workshop Craftsmanship"
          fill
          sizes="100vw"
          className="object-cover object-center select-none"
        />
        {/* Deep Dark Overlay to achieve screenshot's moody luxury ambiance */}
        <div className="absolute inset-0 bg-[#0B0B0B]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/40 via-transparent to-[#0B0B0B]/40" />
      </div>

      {/* Central Floating Callout Card */}
      <div className="relative z-10 max-w-4xl mx-auto border border-[#7A5C22]/70 bg-[#161514]/95 px-6 py-12 sm:px-14 sm:py-16 text-center shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
        {/* Main Headline */}
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-[36px] font-bold uppercase tracking-[0.06em] text-[#E0C681] leading-tight sm:leading-[1.25]">
          Partner With The Best In Leather <br className="hidden sm:inline" />
          Craftsmanship
        </h2>

        {/* Subtitle / Description */}
        <p className="mt-4 sm:mt-5 max-w-xl mx-auto text-xs sm:text-sm text-[#E5DFD3]/80 leading-relaxed font-light">
          Join our network of international distributors and retailers.
          Experience the pinnacle of Pakistani leather manufacturing expertise.
        </p>

        {/* WhatsApp CTA Button with Uniform Spartan Animation */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-spartan inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:px-9 sm:py-4 rounded-md bg-[#25D366] text-white font-bold text-xs sm:text-[13px] uppercase tracking-[0.18em] shadow-[0_8px_25px_rgba(37,211,102,0.3)] hover:bg-[#20bd5a] hover:shadow-[0_12px_32px_rgba(37,211,102,0.45)]"
          >
            {/* WhatsApp Icon */}
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.54 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44s-.56-1.36-.77-1.86c-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29" />
            </svg>
            <span>Inquire via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
