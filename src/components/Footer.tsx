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
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-[#7A5C22]/50 bg-[#161514] flex items-center justify-center text-[#E0C681] transition-all duration-200 hover:border-[#E0C681] hover:bg-[#1E1D1C] hover:text-[#F3DE9E] hover:scale-105"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
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

              {/* Help / Question */}
              <Link
                href="/contact"
                aria-label="Help & Contact"
                className="w-9 h-9 rounded-full border border-[#7A5C22]/50 bg-[#161514] flex items-center justify-center text-[#E0C681] transition-all duration-200 hover:border-[#E0C681] hover:bg-[#1E1D1C] hover:text-[#F3DE9E] hover:scale-105"
              >
                <span className="font-serif text-sm font-semibold leading-none">
                  ?
                </span>
              </Link>
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
