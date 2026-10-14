"use client";

import React from "react";
import {
  Shield,
  Tag,
  PenTool,
  Globe,
  Zap,
  Headphones,
} from "lucide-react";

export default function WhyPartnerSection() {
  const valueProps = [
    {
      id: "quality",
      icon: Shield,
      title: "PREMIUM QUALITY",
      description:
        "Sourcing the finest hides to ensure durability, comfort, and an unmatched premium feel.",
    },
    {
      id: "oem",
      icon: Tag,
      title: "OEM & PRIVATE LABEL",
      description:
        "Turn your vision into reality with our professional OEM manufacturing and branding services.",
    },
    {
      id: "custom",
      icon: PenTool,
      title: "CUSTOM DESIGNS",
      description:
        "Bespoke leather products tailored precisely to your design requirements and specifications.",
    },
    {
      id: "shipping",
      icon: Globe,
      title: "WORLDWIDE SHIPPING",
      description:
        "Fast and secure global logistics ensuring your premium cargo reaches any destination.",
    },
    {
      id: "fast",
      icon: Zap,
      title: "FAST SERVICE",
      description:
        "Optimized production cycles and rapid response times for all our international partners.",
    },
    {
      id: "support",
      icon: Headphones,
      title: "PROFESSIONAL SUPPORT",
      description:
        "Dedicated account managers providing expert guidance throughout the procurement process.",
    },
  ];

  return (
    <div className="w-full px-6 sm:px-8 md:px-[48px] py-20 sm:py-28 bg-[#1A1918]">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <span className="text-xs uppercase tracking-[0.28em] text-[#C29B38] font-semibold">
          Excellence Guaranteed
        </span>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.06em] text-[#E0C681]">
          Why Partner With Us
        </h2>
      </div>

      {/* Grid of 6 Value Propositions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-12 gap-y-12 sm:gap-y-16 max-w-6xl mx-auto">
        {valueProps.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="group flex flex-col items-center text-center select-none"
            >
              {/* Circular Icon Emblem */}
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-[#7A5C22]/60 bg-[#0B0B0B] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[#E0C681] group-hover:shadow-[0_0_25px_rgba(224,198,129,0.22)]">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#E0C681] transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* Title */}
              <h3 className="mt-6 font-serif text-base sm:text-lg font-semibold uppercase tracking-[0.14em] text-[#E0C681] group-hover:text-[#F3DE9E] transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-3 max-w-xs text-xs sm:text-[13px] text-[#E5DFD3]/75 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
