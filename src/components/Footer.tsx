"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import BrandCrest from "@/components/BrandCrest";

interface FooterProps {
  activePath?: string;
}

export default function Footer({ activePath = "/" }: FooterProps) {
  const quickLinks = [
    { name: "HOME", href: "/" },
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
              <BrandCrest
                size={36}
                className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-105 select-none"
              />
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
              {/* Instagram */}
              <a
                href="https://www.instagram.com/the_spartan_leather"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[#7A5C22]/50 bg-[#161514] flex items-center justify-center text-[#E0C681] transition-all duration-200 hover:border-[#E0C681] hover:bg-[#1E1D1C] hover:text-[#F3DE9E] hover:scale-105"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/923146827277"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-[#7A5C22]/50 bg-[#161514] flex items-center justify-center text-[#E0C681] transition-all duration-200 hover:border-[#E0C681] hover:bg-[#1E1D1C] hover:text-[#F3DE9E] hover:scale-105"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.54 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44s-.56-1.36-.77-1.86c-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/the-spartan-leather-8a138242b"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-[#7A5C22]/50 bg-[#161514] flex items-center justify-center text-[#E0C681] transition-all duration-200 hover:border-[#E0C681] hover:bg-[#1E1D1C] hover:text-[#F3DE9E] hover:scale-105"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
            </div>
          </div>


          {/* Column 2: Quick Links (3 Cols) */}
          <div className="md:col-span-3 space-y-5">
            <h3 className="font-serif text-sm sm:text-base font-semibold uppercase tracking-[0.14em] text-[#E0C681]">
              Quick Links
            </h3>

            <nav className="flex flex-col space-y-3.5">
              {quickLinks.map((link) => {
                const isActive = activePath === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs sm:text-[13px] uppercase tracking-[0.18em] transition-colors ${
                      isActive
                        ? "text-[#E0C681] font-semibold"
                        : "text-[#E5DFD3]/75 hover:text-[#E0C681]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
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
                  Dalowali, Jammu Road, Sialkot District, Punjab
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C29B38] flex-shrink-0" />
                <span>+92 314 6827277</span>
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
