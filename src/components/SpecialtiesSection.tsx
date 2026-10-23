"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function SpecialtiesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const mainSpecialties = [
    {
      id: "jackets",
      title: "LEATHER JACKETS",
      image: "/images/specialties/jacket.jpg",
      href: "/shop?category=jackets",
    },
    {
      id: "horse-riding",
      title: "HORSE RIDING",
      image: "/images/specialties/saddle.jpg",
      href: "/shop?category=equestrian",
    },
    {
      id: "bags",
      title: "LUXURY BAGS",
      image: "/images/specialties/bag.jpg",
      href: "/shop?category=bags",
    },
    {
      id: "gloves",
      title: "GLOVES & MORE",
      image: "/images/specialties/gloves.jpg",
      href: "/shop?category=gloves",
    },
  ];

  const supportingSpecialties = [
    {
      id: "wallets",
      title: "WALLETS",
      subtitle: "Minimalist & Bifold",
      href: "/shop?category=wallets",
    },
    {
      id: "belts",
      title: "BELTS",
      subtitle: "Classic Formal & Casual",
      href: "/shop?category=belts",
    },
    {
      id: "aprons",
      title: "APRONS",
      subtitle: "Workshop & Hospitality",
      href: "/shop?category=aprons",
    },
    {
      id: "custom",
      title: "CUSTOM PRODUCTS",
      subtitle: "Tailored to Specifications",
      href: "/contact?inquiry=custom",
    },
    {
      id: "accessories",
      title: "ACCESSORIES",
      subtitle: "Small Leather Goods",
      href: "/shop?category=accessories",
    },
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full px-6 sm:px-8 md:px-[48px] py-16 sm:py-20 lg:py-24">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8 sm:mb-12">
        <div className="space-y-1 sm:space-y-1.5">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-[0.06em] text-[#E0C681]">
            Our Specialties
          </h2>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C29B38]/85 font-medium">
            Curated Collections for the Modern Connoisseur
          </p>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-[#7A5C22]/50 bg-[#1A1918]/60 text-[#E0C681] hover:border-[#E0C681] hover:bg-[#1A1918] transition-colors focus:outline-none"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#E0C681]" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-[#7A5C22]/50 bg-[#1A1918]/60 text-[#E0C681] hover:border-[#E0C681] hover:bg-[#1A1918] transition-colors focus:outline-none"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#E0C681]" />
          </button>
        </div>
      </div>

      {/* Main 4 Featured Specialty Cards */}
      <div
        ref={scrollContainerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
      >
        {mainSpecialties.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            data-reveal
            className="group relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden border border-[#7A5C22]/35 bg-[#141312] transition-all duration-300 hover:border-[#C29B38]/80 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            {/* Background Image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            />

            {/* Dark Bottom Gradient for Typography Clarity */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/95 via-[#0B0B0B]/40 to-transparent" />

            {/* Subtle Gold Hover Sheen */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[#C29B38]/5 transition-opacity duration-300 pointer-events-none" />

            {/* Overlay Title at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <span className="font-serif text-base sm:text-lg lg:text-xl font-bold tracking-[0.1em] uppercase text-[#E0C681] group-hover:text-[#F3DE9E] transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {item.title}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Row of 5 Supporting Specialty Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 mt-4 sm:mt-5 lg:mt-6">
        {supportingSpecialties.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            data-reveal
            className="group flex flex-col justify-between p-5 sm:p-6 border border-[#2B2A28] bg-[#141312] transition-all duration-300 hover:border-[#7A5C22] hover:bg-[#1A1918] hover:shadow-[0_8px_20px_rgba(0,0,0,0.6)] min-h-[140px] sm:min-h-[155px]"
          >
            <div>
              <h3 className="font-serif text-sm sm:text-base font-semibold uppercase tracking-[0.14em] text-[#E0C681] group-hover:text-[#F3DE9E] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#E5DFD3]/65 font-light mt-1.5 transition-colors group-hover:text-[#E5DFD3]/85">
                {item.subtitle}
              </p>
            </div>

            <div className="pt-4 flex items-center">
              <ArrowRight className="w-4 h-4 text-[#C29B38] transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[#E0C681]" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
