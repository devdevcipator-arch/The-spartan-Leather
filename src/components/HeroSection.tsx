"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-96px)] flex items-center overflow-hidden bg-[#0B0B0B]">
      {/* Background Macro Leather Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-leather-bg.jpg"
          alt="Genuine Handcrafted Leather Texture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-center select-none"
        />
        {/* Cinematic Gradient Overlays to preserve deep contrast on left while keeping right golden texture vivid */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/85 to-transparent sm:via-[#0B0B0B]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/50" />
      </div>

      {/* Content Container aligned with exact 48px padding */}
      <div className="relative z-10 w-full px-4 sm:px-8 md:px-[48px] py-16 sm:py-24">
        <div className="w-full max-w-2xl">
          {/* Gold Accent Rule Bar */}
          <div className="w-14 sm:w-16 h-[3px] bg-[#C29B38] mb-6 sm:mb-8 rounded-full shadow-[0_0_10px_rgba(194,155,56,0.6)]" />

          {/* Main Headline */}
          <h1 className="flex flex-col select-none break-words max-w-full">
            <span className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] tracking-wide sm:tracking-[0.04em] text-[#E0C681] leading-[1.15] sm:leading-[1.08] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              EXQUISITE
            </span>
            <span className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] tracking-wide sm:tracking-[0.04em] text-[#E0C681] leading-[1.15] sm:leading-[1.08] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              CRAFTSMANSHIP,
            </span>
            <span
              style={{ fontFamily: "var(--font-cormorant), serif" }}
              className="italic font-normal text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] text-[#E0C681] leading-[1.15] sm:leading-[1.12] mt-1 break-words drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            >
              Timeless Leather
            </span>
          </h1>

          {/* Subtext Paragraph */}
          <p className="mt-6 sm:mt-8 max-w-xl text-sm sm:text-base md:text-[17px] text-[#E5DFD3]/85 leading-relaxed font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
            A legacy of perfection in every stitch. We manufacture and export
            premium grade genuine leather goods and elite equestrian equipment
            worldwide.
          </p>

          {/* CTA Button */}
          <div className="mt-8 sm:mt-10">
            <Button href="/shop" variant="primary">
              EXPLORE COLLECTION
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
