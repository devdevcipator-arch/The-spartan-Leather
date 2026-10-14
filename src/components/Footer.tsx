"use client";

import React from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  HelpCircle,
  MapPin,
  Phone,
  Mail,
  Shield,
} from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "HOME", href: "/", active: true },
    { name: "SHOP", href: "/shop" },
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT US", href: "/contact" },
  ];

  return (
    <footer className="w-full bg-[#11100F] border-t border-[#7A5C22]/30 text-[#E5DFD3]">
      <div className="w-full px-6 sm:px-8 md:px-[48px] py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Column 1: Brand Info & Socials (5 Cols) */}
          <div className="md:col-span-5 space-y-6">
            {/* Logo Lockup */}
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full border border-[#C29B38] bg-[#141312] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:border-[#E0C681]">
                <Shield className="w-4 h-4 text-[#E0C681]" />
              </div>
              <span className="font-serif text-base sm:text-lg font-bold uppercase tracking-[0.2em] text-[#E0C681] group-hover:text-[#F3DE9E] transition-colors">
                Spartan Leather
              </span>
            </Link>

            {/* Brand Mission Description */}
            <p className="max-w-sm text-xs sm:text-[13px] text-[#E5DFD3]/65 leading-relaxed font-light">
              Defining rugged elegance through masterful leathercraft. Our legacy
              is built on every stitch, ensuring a lifetime of durability and
              style.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-[#7A5C22]/50 bg-[#161514] flex items-center justify-center text-[#E0C681] transition-all duration-200 hover:border-[#E0C681] hover:bg-[#1E1D1C] hover:text-[#F3DE9E] hover:scale-105"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[#7A5C22]/50 bg-[#161514] flex items-center justify-center text-[#E0C681] transition-all duration-200 hover:border-[#E0C681] hover:bg-[#1E1D1C] hover:text-[#F3DE9E] hover:scale-105"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <Link
                href="/faq"
                aria-label="Help & FAQ"
                className="w-9 h-9 rounded-full border border-[#7A5C22]/50 bg-[#161514] flex items-center justify-center text-[#E0C681] transition-all duration-200 hover:border-[#E0C681] hover:bg-[#1E1D1C] hover:text-[#F3DE9E] hover:scale-105"
              >
                <HelpCircle className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links (3 Cols) */}
          <div className="md:col-span-3 space-y-5">
            <h3 className="font-serif text-sm sm:text-base font-semibold uppercase tracking-[0.14em] text-[#E0C681]">
              Quick Links
            </h3>

            <nav className="flex flex-col space-y-3.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs sm:text-[13px] uppercase tracking-[0.18em] transition-colors ${
                    link.active
                      ? "text-[#E0C681] font-semibold"
                      : "text-[#E5DFD3]/75 hover:text-[#E0C681]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact Details (4 Cols) */}
          <div className="md:col-span-4 space-y-5">
            <h3 className="font-serif text-sm sm:text-base font-semibold uppercase tracking-[0.14em] text-[#E0C681]">
              Contact
            </h3>

            <div className="flex flex-col space-y-3.5 text-xs sm:text-[13px] text-[#E5DFD3]/75">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C29B38] mt-0.5 flex-shrink-0" />
                <span className="leading-snug">
                  122 Spartan Road, Artisan District
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C29B38] flex-shrink-0" />
                <span>+1 (555) LEATHER-01</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C29B38] flex-shrink-0" />
                <a
                  href="mailto:info@spartanleather.com"
                  className="hover:text-[#E0C681] transition-colors"
                >
                  info@spartanleather.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
