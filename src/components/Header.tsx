"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import BrandCrest from "@/components/BrandCrest";

interface HeaderProps {
  activePath?: string;
}

export default function Header({ activePath = "/" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SHOP", href: "/shop" },
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT US", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#7A5C22]/30 transition-all duration-300">
      <div className="w-full px-6 sm:px-8 md:px-[48px] h-20 sm:h-24 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link
          href="/"
          className="group flex items-center gap-3.5 sm:gap-4 select-none"
        >
          {/* Circular Badge Emblem */}
          <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-105">
            <BrandCrest
              size={48}
              preload
              className="w-full h-full object-contain select-none"
            />
          </div>

          {/* Brand Typography */}
          <div className="flex flex-col justify-center">
            <span className="font-serif text-base sm:text-lg lg:text-xl font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#E0C681] leading-tight transition-colors duration-200 group-hover:text-[#F3DE9E]">
              The Spartan Leather
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navLinks.map((link) => {
            const isActive = activePath === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-xs sm:text-[13px] uppercase font-medium tracking-[0.2em] transition-all duration-200 py-2 ${
                  isActive
                    ? "text-[#E0C681] font-semibold"
                    : "text-[#E5DFD3]/80 hover:text-[#E0C681]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C29B38] rounded-full shadow-[0_0_8px_#C29B38]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-[#E0C681] hover:text-[#F3DE9E] hover:bg-[#1A1918] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#7A5C22]/30 bg-[#0E0D0C]/98 px-6 py-6 transition-all duration-300 shadow-2xl">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = activePath === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm uppercase tracking-[0.2em] py-2 px-3 rounded transition-colors ${
                    isActive
                      ? "text-[#E0C681] font-semibold bg-[#1A1918]"
                      : "text-[#E5DFD3]/85 hover:text-[#E0C681] hover:bg-[#1A1918]/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
