"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/ui/SectionReveal";
import { Shield, Zap, Globe, PenTool } from "lucide-react";

export default function AboutPage() {
  const pillars = [
    {
      icon: Shield,
      title: "Material Selection",
      description:
        "We source only the finest full-grain hides. Every piece is inspected for character, strength, and the unique patina that defines genuine luxury.",
    },
    {
      icon: Zap,
      title: "Hand-Stitched Precision",
      description:
        "Our master artisans employ traditional stitching techniques that machines simply cannot replicate, ensuring lifetime durability in every seam.",
    },
    {
      icon: Globe,
      title: "Ethical Sourcing",
      description:
        "Responsibility is at our core. We partner with sustainable tanneries that adhere to strict environmental and labor standards.",
    },
    {
      icon: PenTool,
      title: "Customization Expertise",
      description:
        "From OEM private labeling to bespoke individual commissions, we bring your specific vision to life with unrivaled design expertise.",
    },
  ];

  const customOrderWhatsAppUrl = `https://wa.me/923143351255?text=${encodeURIComponent(
    "Hello The Spartan Leather, I am interested in inquiring about a bespoke Custom Order with your master artisans."
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-[#E5DFD3]">
      {/* Header with activePath set to /about */}
      <Header activePath="/about" />

      <main className="flex-1 flex flex-col">
        {/* ======================================================== */}
        {/* SECTION 1: HERO - A LEGACY OF UNCOMPROMISING ARTISTRY */}
        {/* ======================================================== */}
        <SectionReveal>
          <div className="relative w-full overflow-hidden min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center py-20 sm:py-28 lg:py-32">
            {/* Full-bleed Panoramic Leather Background */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/about/hero-leather-bg.jpg"
                alt="Full-grain leather texture craftsmanship"
                fill
                priority
                sizes="100vw"
                className="object-cover object-right md:object-center select-none"
              />

              {/* Seamless Dark Vignette / Gradient Overlays */}
              {/* Deep obsidian fade on left where text sits */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/85 md:via-[#0B0B0B]/60 to-transparent" />
              {/* Top & bottom subtle transitions */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/50 to-transparent pointer-events-none" />
            </div>

            {/* Content Container (Left-aligned) */}
            <div className="relative z-10 w-full px-6 sm:px-8 md:px-[48px] max-w-7xl mx-auto">
              <div className="max-w-2xl">
                {/* Subtle Gold Accent Bar */}
                <div className="w-14 h-[3.5px] bg-[#C29B38] mb-6 sm:mb-8 shadow-[0_0_12px_rgba(194,155,56,0.5)]" />

                {/* Main Headline with Serif + Italic Serif in Warm Gold */}
                <h1 className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-normal leading-[1.12] tracking-[0.02em] mb-6 sm:mb-7">
                  <span className="font-serif block text-[#CCA855]">
                    A Legacy of
                  </span>
                  <span className="font-serif-italic italic block text-[#CCA855] mt-1 sm:mt-2">
                    Uncompromising Artistry
                  </span>
                </h1>

                {/* Paragraph Copy */}
                <p className="text-xs sm:text-sm lg:text-[15px] text-[#A8A49C] leading-relaxed font-light max-w-xl">
                  Born from the rich traditions of Pakistani leatherwork, The Spartan Leather
                  represents the pinnacle of handcrafted excellence. We don&apos;t just
                  manufacture goods; we preserve a heritage of durability, luxury, and
                  meticulous precision that spans generations.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* ======================================================== */}
        {/* SECTION 2: THE PILLARS OF OUR CRAFT (4 CARDS) */}
        {/* ======================================================== */}
        <SectionReveal withDivider={false}>
          <div className="w-full px-6 sm:px-8 md:px-[48px] max-w-7xl mx-auto py-16 sm:py-24 lg:py-28">
            {/* Centered Eyebrow & Main Title */}
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.25em] sm:tracking-[0.3em] text-[#C29B38] mb-3 block">
                OUR STANDARD OF EXCELLENCE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#CCA855] tracking-[0.04em]">
                The Pillars of Our Craft
              </h2>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-7">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    data-reveal
                    className="group border border-[#7A5C22]/35 bg-[#141312] p-7 sm:p-8 flex flex-col justify-start transition-all duration-300 hover:border-[#C29B38]/80 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(0,0,0,0.85)]"
                  >
                    {/* Gold Circular Icon Container */}
                    <div className="w-12 h-12 rounded-full border border-[#C29B38]/50 bg-[#1C1A18] flex items-center justify-center text-[#CCA855] mb-6 sm:mb-7 transition-transform duration-300 group-hover:scale-105 group-hover:border-[#E0C681]">
                      <IconComponent className="w-5 h-5 text-[#CCA855] group-hover:text-[#F3DE9E] transition-colors" />
                    </div>

                    {/* Pillar Title */}
                    <h3 className="font-serif text-base sm:text-lg lg:text-xl font-normal text-[#CCA855] mb-3 leading-snug">
                      {pillar.title}
                    </h3>

                    {/* Pillar Description */}
                    <p className="text-xs sm:text-[13px] text-[#A8A49C] leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionReveal>

        {/* ======================================================== */}
        {/* SECTION 3: CTA - READY TO EXPERIENCE TRUE LEATHER MASTERY */}
        {/* ======================================================== */}
        <SectionReveal withDivider={false}>
          <div className="relative w-full py-20 sm:py-28 lg:py-32 px-6 sm:px-8 md:px-[48px] overflow-hidden">
            {/* Background Workshop Image with Dark Atmospheric Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/about/cta-bg.jpg"
                alt="Leather artisan crafting by hand in workshop"
                fill
                sizes="100vw"
                className="object-cover object-center select-none"
              />
              {/* Atmospheric Dark Overlays */}
              <div className="absolute inset-0 bg-[#0B0B0B]/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-transparent to-[#0B0B0B]" />
            </div>

            {/* Central Callout Card */}
            <div className="relative z-10 max-w-4xl mx-auto border border-[#7A5C22]/50 bg-[#0C0B0A]/92 backdrop-blur-md px-6 py-12 sm:px-14 sm:py-16 md:px-20 md:py-20 text-center shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[42px] font-normal text-[#CCA855] leading-tight sm:leading-snug mb-4 sm:mb-5">
                Ready to Experience <br />
                True Leather Mastery?
              </h2>

              <p className="max-w-xl mx-auto text-xs sm:text-[14px] text-[#A8A49C] leading-relaxed font-light mb-8 sm:mb-10">
                Explore our curated collection of equestrian gear and luxury accessories, or consult
                with our artisans for a custom creation tailored to your legacy.
              </p>

              {/* Action Buttons: Gold Gradient SHOP COLLECTION & Green INQUIRE VIA WHATSAPP */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Link
                  href="/shop"
                  className="btn-spartan inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 bg-gradient-to-r from-[#C29B38] to-[#E0C681] text-[#1A1918] font-bold text-xs sm:text-[13px] uppercase tracking-[0.22em] shadow-[0_8px_25px_rgba(194,155,56,0.3)] hover:brightness-105 transition-all cursor-pointer"
                >
                  SHOP COLLECTION
                </Link>

                <a
                  href={customOrderWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-spartan inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 sm:px-9 sm:py-4 rounded-md sm:rounded-lg bg-[#25D366] text-white font-bold text-xs sm:text-[13px] uppercase tracking-[0.18em] shadow-[0_8px_25px_rgba(37,211,102,0.3)] hover:bg-[#20bd5a] hover:shadow-[0_12px_32px_rgba(37,211,102,0.45)] transition-all cursor-pointer"
                >
                  <svg
                    className="w-5 h-5 fill-current flex-shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.54 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44s-.56-1.36-.77-1.86c-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29" />
                  </svg>
                  <span>INQUIRE VIA WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>
      </main>

      {/* Footer with activePath set to /about */}
      <Footer activePath="/about" />
    </div>
  );
}
