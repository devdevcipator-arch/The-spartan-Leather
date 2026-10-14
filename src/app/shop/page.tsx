"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/ui/SectionReveal";
import { Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  badge?: "BEST SELLER" | "LIMITED EDITION";
  description: string;
  image: string;
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Leather Jackets",
    "Leather Gloves",
    "Leather Bags",
    "Leather Wallets",
    "Leather Belts",
    "Leather Aprons",
  ];

  const products: Product[] = [
    {
      id: "spartan-vanguard-jacket",
      name: "SPARTAN VANGUARD JACKET",
      category: "Leather Jackets",
      badge: "BEST SELLER",
      description:
        "Hand-burnished full-grain cowhide leather with reinforced double stitching.",
      image: "/images/shop/jacket.jpg",
    },
    {
      id: "the-odyssey-duffle",
      name: "THE ODYSSEY DUFFLE",
      category: "Leather Bags",
      badge: "LIMITED EDITION",
      description:
        "Spacious, rugged, and refined. Designed for the modern-day conqueror.",
      image: "/images/shop/duffle.jpg",
    },
    {
      id: "craftsman-armor-apron",
      name: "CRAFTSMAN ARMOR APRON",
      category: "Leather Aprons",
      description:
        "Maximum protection and utility for professional artisans and metalworkers.",
      image: "/images/shop/apron.jpg",
    },
    {
      id: "royal-equestrian-saddle",
      name: "ROYAL EQUESTRIAN SADDLE",
      category: "All",
      description:
        "Engineered for comfort and control. The pinnacle of horse riding equipment.",
      image: "/images/shop/saddle.jpg",
    },
    {
      id: "phalanx-bifold-wallet",
      name: "PHALANX BIFOLD WALLET",
      category: "Leather Wallets",
      description:
        "Slim silhouette, maximum security. Crafted from premium Italian calfskin.",
      image: "/images/shop/wallet.jpg",
    },
    {
      id: "goliath-work-gloves",
      name: "GOLIATH WORK GLOVES",
      category: "Leather Gloves",
      description:
        "Double-reinforced palms and heat-resistant thread for extreme durability.",
      image: "/images/shop/gloves.jpg",
    },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory ||
        (selectedCategory === "Leather Belts" && product.name.includes("BELT"));

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, products]);

  const getWhatsAppLink = (productName: string) => {
    const text = `Hello The Spartan Leather, I am interested in inquiring about "${productName}". Please provide wholesale pricing, MOQ, and customization options.`;
    return `https://wa.me/923000000000?text=${encodeURIComponent(text)}`;
  };

  const b2bWhatsAppUrl = `https://wa.me/923000000000?text=${encodeURIComponent(
    "Hello The Spartan Leather, I would like to inquire about Bulk B2B Orders and corporate manufacturing partnerships."
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-[#E5DFD3]">
      {/* Header with activePath set to shop */}
      <Header activePath="/shop" />

      <main className="flex-1 w-full px-6 sm:px-8 md:px-[48px] py-12 sm:py-16">
        <SectionReveal>
          {/* Page Title */}
          <div className="text-center mb-10 sm:mb-12">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.1em] text-[#E0C681]">
              Our Collection
            </h1>
            <div className="w-14 sm:w-16 h-[2.5px] bg-[#C29B38] mx-auto mt-3.5 shadow-[0_0_10px_rgba(194,155,56,0.5)]" />
          </div>

          {/* Filter Pills and Search Bar Container */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 mb-10 sm:mb-14">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#C29B38] text-[#141312] font-bold shadow-[0_0_12px_rgba(194,155,56,0.35)]"
                        : "border border-[#7A5C22]/40 bg-[#141312]/70 text-[#E5DFD3]/80 hover:border-[#E0C681] hover:text-[#E0C681]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72 lg:w-80">
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141312] border border-[#2B2A28] rounded-full pl-10 pr-4 py-2 text-xs text-[#E5DFD3] placeholder-[#E5DFD3]/40 focus:outline-none focus:border-[#C29B38] transition-colors"
              />
              <Search className="w-4 h-4 text-[#E5DFD3]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Product Grid (3 Columns) */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-[#E5DFD3]/60 text-sm">
              No products found in this category. Try adjusting your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between border border-[#7A5C22]/35 bg-[#141312] overflow-hidden transition-all duration-300 hover:border-[#C29B38]/80 hover:shadow-[0_12px_35px_rgba(0,0,0,0.85)]"
                >
                  {/* Image Container with Badges */}
                  <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full overflow-hidden bg-[#0F0E0D]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                    />

                    {/* Top-Left Badge */}
                    {product.badge && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-[#C29B38] text-[#141312] text-[10px] font-bold uppercase tracking-[0.2em] shadow-md">
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {/* Dark gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Product Details & Action */}
                  <div className="p-6 flex flex-col items-center text-center flex-1 justify-between">
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-[0.12em] text-[#E0C681] group-hover:text-[#F3DE9E] transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-xs sm:text-[13px] text-[#E5DFD3]/70 font-light italic leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* WhatsApp CTA Button with Uniform Spartan Animation */}
                    <div className="w-full mt-6">
                      <a
                        href={getWhatsAppLink(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-spartan w-full py-3.5 bg-gradient-to-r from-[#C29B38] to-[#E0C681] text-[#1A1918] font-bold text-xs uppercase tracking-[0.22em] shadow-[0_6px_20px_rgba(194,155,56,0.3)] hover:brightness-105 flex items-center justify-center gap-2"
                      >
                        <span>Shop</span>
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.54 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44s-.56-1.36-.77-1.86c-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bulk Orders & B2B Partnerships Banner */}
          <div className="relative overflow-hidden border border-[#7A5C22]/40 bg-[#141312] p-8 sm:p-12 lg:p-14 mt-16 sm:mt-24 shadow-2xl">
            {/* Background Image & Gradient */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/shop/b2b-bg.jpg"
                alt="Leather Manufacturing Factory"
                fill
                sizes="100vw"
                className="object-cover object-center select-none"
              />
              <div className="absolute inset-0 bg-[#0B0B0B]/85 backdrop-blur-[1px]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent" />
            </div>

            {/* Banner Content Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Headline, Copy & WhatsApp CTA */}
              <div className="lg:col-span-7 space-y-5">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-[0.06em] text-[#E0C681] leading-tight">
                  Bulk Orders & B2B <br />
                  Partnerships
                </h2>

                <p className="max-w-xl text-xs sm:text-sm text-[#E5DFD3]/80 leading-relaxed font-light">
                  Looking to stock Spartan Leather or need a custom fleet of
                  equipment for your business? We offer exclusive wholesale
                  pricing and custom branding.
                </p>

                <div className="pt-2">
                  <a
                    href={b2bWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-spartan inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:px-9 sm:py-4 rounded-md bg-[#25D366] text-white font-bold text-xs sm:text-[13px] uppercase tracking-[0.18em] shadow-[0_8px_25px_rgba(37,211,102,0.3)] hover:bg-[#20bd5a] hover:shadow-[0_12px_32px_rgba(37,211,102,0.45)]"
                  >
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

              {/* Right Column: Statistics */}
              <div className="lg:col-span-5 flex flex-row lg:flex-col justify-around lg:justify-center items-start lg:items-end gap-6 sm:gap-8 border-t lg:border-t-0 lg:border-l border-[#7A5C22]/30 pt-6 lg:pt-0 lg:pl-10">
                <div className="text-left lg:text-right">
                  <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E0C681]">
                    500+
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-[#E5DFD3]/70 font-medium mt-1">
                    Corporate Clients
                  </div>
                </div>

                <div className="text-left lg:text-right">
                  <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E0C681]">
                    100%
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-[#E5DFD3]/70 font-medium mt-1">
                    Genuine Leather
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
