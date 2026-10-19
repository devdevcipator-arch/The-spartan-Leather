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

  const customOrderWhatsAppUrl = `https://wa.me/923000000000?text=${encodeURIComponent(
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
          <div className="relative w-full overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-28">
            <div className="w-full px-6 sm:px-8 md:px-[48px] max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left Column: Heading, Accent & Story */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  {/* Subtle Gold Accent Bar */}
                  <div className="w-12 h-[3.5px] bg-[#C29B38] mb-6 sm:mb-8 shadow-[0_0_12px_rgba(194,155,56,0.45)]" />

                  {/* Main Headline with Serif + Italic Serif Combination */}
                  <h1 className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-normal leading-[1.14] tracking-[0.03em] mb-6 sm:mb-8">
                    <span className="font-serif block text-[#E5DFD3]">
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

                {/* Right Column: Close-up Macro Pebble Leather & Cross-Stitch Artwork */}
                <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                  <div className="relative aspect-square w-full max-w-md sm:max-w-lg lg:max-w-none overflow-hidden rounded-sm shadow-2xl">
                    <Image
                      src="/images/about/hero-leather.jpg"
                      alt="Full-grain leather texture with double saddle stitch"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover object-center select-none"
                    />

                    {/* Gradient Blends to melt seamlessly into obsidian background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-transparent to-transparent opacity-70 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-70 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/40 via-transparent to-transparent opacity-50 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-l from-[#0B0B0B]/30 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Link
                  href="/shop"
                  className="btn-spartan w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 bg-[#8C6D2B] hover:bg-[#A38135] text-[#0C0B0A] font-bold text-xs uppercase tracking-[0.2em] shadow-[0_6px_20px_rgba(140,109,43,0.35)] transition-all cursor-pointer"
                >
                  SHOP COLLECTION
                </Link>

                <a
                  href={customOrderWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-spartan w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 border border-[#7A5C22] bg-[#141312]/80 text-[#CCA855] hover:border-[#CCA855] hover:text-[#E0C681] hover:bg-[#1A1918] font-bold text-xs uppercase tracking-[0.2em] transition-all cursor-pointer"
                >
                  CUSTOM ORDER
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
