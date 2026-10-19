"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/ui/SectionReveal";
import { Search, ChevronDown, Check } from "lucide-react";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Exactly 3 categories for display
  const displayedCategories = [
    "All",
    "Leather Jackets",
    "Leather Gloves",
  ];

  // Remaining categories shown in More Categories dropdown
  const remainingCategories = [
    "Leather Bags",
    "Leather Wallets",
    "Leather Aprons",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      id: "centurion-saddle-leather-belt",
      name: "CENTURION SADDLE BELT",
      category: "Leather Belts",
      badge: "LIMITED EDITION",
      description:
        "Full-grain vegetable-tanned steerhide fitted with an antiqued solid brass Spartan crest buckle.",
      image: "/images/shop/belt.jpg",
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
      category: "Equestrian & Saddlery",
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
    {
      id: "ares-tactical-vest",
      name: "ARES REINFORCED VEST",
      category: "Vests & Armor",
      description:
        "Heavy-gauge tactical cowhide vest with reinforced dual-stitch panels and concealed carry pockets.",
      image: "/images/shop/jacket.jpg",
    },
    {
      id: "artisan-spartan-tool-roll",
      name: "SPARTAN ARTISAN ROLL",
      category: "Small Accessories",
      description:
        "Dedicated full-grain roll-up tool case engineered for master craftsmen, mechanics, and barbers.",
      image: "/images/shop/wallet.jpg",
    },
  ];

  const isRemainingCategorySelected = remainingCategories.includes(selectedCategory);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

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

          {/* Filter Pills Enclosure & Search Bar Container (Categories on Left, Search Bar on Right) */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6 mb-10 sm:mb-14 w-full max-w-full relative z-30">
            {/* 3 Displayed Categories + More Categories Dropdown Capsule (Left side) */}
            <div className="w-full md:w-auto flex-shrink-0 flex justify-start py-1 relative z-30 overflow-visible">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#7A5C22]/55 bg-[#121110] p-1.5 shadow-[0_4px_25px_rgba(0,0,0,0.7)] max-w-full overflow-visible">
                {/* 3 Displayed Category Pills */}
                {displayedCategories.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(category);
                        setDropdownOpen(false);
                      }}
                      className={`whitespace-nowrap px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#C29B38] text-[#121110] font-semibold shadow-[0_0_14px_rgba(194,155,56,0.35)]"
                          : "border border-[#7A5C22]/45 bg-[#161514]/70 text-[#E5DFD3] hover:border-[#C29B38] hover:text-[#E0C681]"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}

                {/* More Categories Dropdown Button */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`whitespace-nowrap flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                      isRemainingCategorySelected
                        ? "bg-[#C29B38] text-[#121110] font-semibold shadow-[0_0_14px_rgba(194,155,56,0.35)]"
                        : "border border-[#7A5C22]/45 bg-[#161514]/70 text-[#E5DFD3] hover:border-[#C29B38] hover:text-[#E0C681]"
                    }`}
                  >
                    <span>
                      {isRemainingCategorySelected ? selectedCategory : "More Categories"}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu of Remaining Categories with Fluid Animation */}
                  {dropdownOpen && (
                    <div className="animate-spartan-dropdown absolute left-0 sm:left-auto sm:right-0 top-full mt-2.5 w-56 sm:w-60 max-w-[calc(100vw-3rem)] rounded-2xl border border-[#7A5C22]/60 bg-[#141312] py-2 px-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_20px_rgba(194,155,56,0.12)] z-50 backdrop-blur-md">
                      <div className="px-3 py-1.5 flex items-center justify-between border-b border-[#7A5C22]/25 mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C29B38]">
                          More Categories
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.1em] text-[#E5DFD3]/40 font-mono">
                          3 Items
                        </span>
                      </div>
                      <div className="space-y-1">
                        {remainingCategories.map((category, idx) => {
                          const isSelected = selectedCategory === category;
                          return (
                            <button
                              key={category}
                              type="button"
                              style={{ animationDelay: `${idx * 60 + 30}ms` }}
                              onClick={() => {
                                setSelectedCategory(category);
                                setDropdownOpen(false);
                              }}
                              className={`animate-spartan-item w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-[13px] text-left transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "text-[#E0C681] bg-[#1E1C1B] font-semibold border border-[#C29B38]/40 shadow-[0_0_12px_rgba(194,155,56,0.2)]"
                                  : "text-[#E5DFD3]/85 hover:text-[#E0C681] hover:bg-[#1A1918] hover:translate-x-1"
                              }`}
                            >
                              <span className="tracking-wide">{category}</span>
                              {isSelected && (
                                <Check className="w-3.5 h-3.5 text-[#C29B38]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Matching Search Capsule (Right side, stretched) */}
            <div className="w-full md:flex-1 flex justify-start md:justify-end min-w-0">
              <div className="relative flex items-center rounded-full border border-[#7A5C22]/55 bg-[#121110] px-4 sm:px-5 py-2 sm:py-2.5 shadow-[0_4px_25px_rgba(0,0,0,0.7)] w-full max-w-full">
                <Search className="w-4 h-4 text-[#C29B38] flex-shrink-0 mr-2.5" />
                <input
                  type="text"
                  placeholder="Search collection..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full min-w-0 bg-transparent text-xs sm:text-[13px] text-[#E5DFD3] placeholder-[#E5DFD3]/40 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-[#E5DFD3]/50 hover:text-[#E0C681] text-xs px-1 cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>
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
          <div className="relative overflow-hidden rounded-2xl md:rounded-[22px] border border-[#7A5C22]/35 bg-[#0C0B0A] px-6 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14 lg:px-14 lg:py-14 mt-16 sm:mt-24 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
            {/* Background Image & Gradient */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/shop/b2b-bg.jpg"
                alt="Bulk Orders and B2B Leather Manufacturing"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center select-none"
              />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px]" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/80" />
            </div>

            {/* Banner Content Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
              {/* Left Column: Headline, Copy & WhatsApp CTA */}
              <div className="lg:col-span-8 flex flex-col items-start text-left">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-normal uppercase tracking-[0.08em] sm:tracking-[0.1em] text-[#CCA855] leading-tight sm:leading-snug">
                  Bulk Orders & B2B <br />
                  Partnerships
                </h2>

                <p className="max-w-xl text-xs sm:text-[13px] md:text-sm text-[#A8A49C] leading-relaxed font-light mt-3 sm:mt-4">
                  Looking to stock Spartan Leather or need a custom fleet of
                  equipment for your business? We offer exclusive wholesale
                  pricing and custom branding.
                </p>

                <div className="mt-6 sm:mt-8">
                  <a
                    href={b2bWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg sm:rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-[13px] uppercase tracking-wide shadow-[0_6px_22px_rgba(37,211,102,0.32)] hover:bg-[#20ba59] hover:shadow-[0_8px_28px_rgba(37,211,102,0.48)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
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

              {/* Right Column: Statistics with Vertical Gold Accent Bar */}
              <div className="lg:col-span-4 flex items-center lg:justify-end pt-6 lg:pt-0 border-t border-[#7A5C22]/30 lg:border-t-0">
                <div className="flex items-center gap-5 sm:gap-6">
                  {/* Slender Vertical Gold Divider Line */}
                  <div className="w-[1.5px] h-[105px] sm:h-[120px] bg-gradient-to-b from-[#C29B38]/30 via-[#C29B38] to-[#C29B38]/30 flex-shrink-0" />

                  {/* Two Left-Aligned Stats */}
                  <div className="flex flex-col justify-between py-0.5 space-y-5 sm:space-y-6 text-left">
                    <div>
                      <div className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#CCA855] leading-none">
                        500+
                      </div>
                      <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#8E8B85] font-medium mt-1.5">
                        Corporate Clients
                      </div>
                    </div>

                    <div>
                      <div className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#CCA855] leading-none">
                        100%
                      </div>
                      <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#8E8B85] font-medium mt-1.5">
                        Genuine Leather
                      </div>
                    </div>
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
