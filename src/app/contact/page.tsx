"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;

    // Simulate successful transmission
    setSubmitted(true);
  };

  const whatsappInquiryUrl = `https://wa.me/923143351255?text=${encodeURIComponent(
    "Hello The Spartan Leather, I am interested in inquiring about Craftsmanship, B2B Collaboration, and bespoke orders."
  )}`;

  const stats = [
    { value: "500+", label: "B2B PARTNERS" },
    { value: "100%", label: "FULL GRAIN" },
    { value: "24/7", label: "CLIENT SUPPORT" },
    { value: "GLOBAL", label: "SECURE DELIVERY" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-[#E5DFD3]">
      {/* Header with activePath set to /contact */}
      <Header activePath="/contact" />

      <main className="flex-1 w-full px-6 sm:px-8 md:px-[48px] py-12 sm:py-16 lg:py-20">
        {/* NOTE: this page does NOT use a single <SectionReveal> wrapper — a
            wrapper this tall can never hit the 15% IntersectionObserver
            threshold on mobile, hiding the entire page. Each block reveals
            with its own [data-reveal] instead. */}
        {/* Page Title & Intro */}
        <div
          data-reveal
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal uppercase tracking-[0.25em] text-[#CCA855]">
              Contact Us
            </h1>
            <div className="w-14 sm:w-16 h-[3px] bg-[#C29B38] mx-auto mt-4 mb-6 shadow-[0_0_12px_rgba(194,155,56,0.5)]" />
            <p className="text-xs sm:text-sm lg:text-[15px] text-[#A8A49C] leading-relaxed font-light">
              Whether it&apos;s a custom commission, a wholesale partnership, or a simple inquiry
              about our leathercraft, we are here to assist you with the precision of a Spartan.
            </p>
          </div>

          {/* Main 2-Column Luxury Contact Card Container */}
          <div
            data-reveal
            className="max-w-6xl mx-auto overflow-hidden rounded-2xl md:rounded-[24px] border border-[#7A5C22]/35 bg-[#121110] shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Column: Workshop Atmosphere & Contact Information (5.5 or 6 Cols) */}
              <div className="lg:col-span-6 relative p-8 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden">
                {/* Background Image & Moody Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/shop/b2b-bg.jpg"
                    alt="Leather Manufacturing Studio"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center select-none"
                  />
                  {/* Dark moody overlays */}
                  <div className="absolute inset-0 bg-[#0B0B0B]/80 backdrop-blur-[0.5px]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/85 to-[#0B0B0B]/60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/50" />
                </div>

                {/* Left Column Content */}
                <div className="relative z-10 space-y-7 sm:space-y-8">
                  {/* Section Title */}
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-normal uppercase tracking-[0.08em] text-[#CCA855] leading-snug">
                      Craftsmanship & <br />
                      Collaboration
                    </h2>
                    <p className="mt-3.5 text-xs sm:text-[13px] text-[#A8A49C] leading-relaxed font-light max-w-md">
                      At Spartan Leather, every stitch tells a story of heritage and resilience.
                      Beyond our collection, we offer bespoke OEM services and strategic B2B
                      partnerships for businesses that value authentic quality and rugged elegance.
                    </p>
                  </div>

                  {/* Contact Details List */}
                  <div className="space-y-5 pt-2">
                    {/* Headquarters */}
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 text-[#CCA855] flex-shrink-0">
                        <MapPin className="w-4 h-4 text-[#C29B38]" />
                      </div>
                      <div>
                        <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#CCA855]">
                          Headquarters
                        </span>
                        <span className="text-xs sm:text-[13px] text-[#A8A49C] font-light">
                          122 Spartan Road, Artisan District
                        </span>
                      </div>
                    </div>

                    {/* Direct Line */}
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 text-[#CCA855] flex-shrink-0">
                        <Phone className="w-4 h-4 text-[#C29B38]" />
                      </div>
                      <div>
                        <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#CCA855]">
                          Direct Line
                        </span>
                        <a
                          href="tel:+15555328437"
                          className="text-xs sm:text-[13px] text-[#A8A49C] font-light hover:text-[#CCA855] transition-colors"
                        >
                          +1 (555) LEATHER-01
                        </a>
                      </div>
                    </div>

                    {/* Electronic Mail */}
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 text-[#CCA855] flex-shrink-0">
                        <Mail className="w-4 h-4 text-[#C29B38]" />
                      </div>
                      <div>
                        <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#CCA855]">
                          Electronic Mail
                        </span>
                        <a
                          href="mailto:info@spartanleather.com"
                          className="text-xs sm:text-[13px] text-[#A8A49C] font-light hover:text-[#CCA855] transition-colors"
                        >
                          info@spartanleather.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Button at bottom */}
                <div className="relative z-10 pt-8 sm:pt-10">
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-spartan inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-lg bg-[#25D366] text-white font-bold text-xs sm:text-[13px] uppercase tracking-wide shadow-[0_6px_22px_rgba(37,211,102,0.32)] hover:bg-[#20bd5a] hover:shadow-[0_8px_28px_rgba(37,211,102,0.48)] transition-all cursor-pointer"
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

              {/* Right Column: Contact Message Form (6 Cols) */}
              <div className="lg:col-span-6 bg-[#121110] p-8 sm:p-10 lg:p-12 border-t lg:border-t-0 lg:border-l border-[#7A5C22]/25 flex flex-col justify-center">
                {submitted ? (
                  <div className="text-center py-12 px-4 space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-[#CCA855] mx-auto animate-bounce" />
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#CCA855] uppercase tracking-wider">
                      Message Transmitted
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A8A49C] max-w-md mx-auto leading-relaxed">
                      Thank you. Your inquiry has been received by our master artisans. We will review
                      your specifications and reach out promptly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ fullName: "", email: "", subject: "", message: "" });
                      }}
                      className="mt-4 px-6 py-2.5 border border-[#7A5C22] text-[#CCA855] text-xs uppercase tracking-[0.2em] rounded hover:border-[#CCA855] hover:text-[#E0C681] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    {/* Row 1: Full Name & Email Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#CCA855] mb-2"
                        >
                          Full Name
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Leonidas"
                          className="w-full rounded-md bg-[#0C0B0A] border border-[#2B2A28] focus:border-[#C29B38] px-4 py-3.5 text-xs sm:text-[13px] text-[#E5DFD3] placeholder-[#E5DFD3]/30 outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#CCA855] mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="king@sparta.com"
                          className="w-full rounded-md bg-[#0C0B0A] border border-[#2B2A28] focus:border-[#C29B38] px-4 py-3.5 text-xs sm:text-[13px] text-[#E5DFD3] placeholder-[#E5DFD3]/30 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 2: Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#CCA855] mb-2"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Custom Order Inquiry"
                        className="w-full rounded-md bg-[#0C0B0A] border border-[#2B2A28] focus:border-[#C29B38] px-4 py-3.5 text-xs sm:text-[13px] text-[#E5DFD3] placeholder-[#E5DFD3]/30 outline-none transition-colors"
                      />
                    </div>

                    {/* Row 3: Your Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#CCA855] mb-2"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your requirement in detail..."
                        className="w-full rounded-md bg-[#0C0B0A] border border-[#2B2A28] focus:border-[#C29B38] px-4 py-3.5 text-xs sm:text-[13px] text-[#E5DFD3] placeholder-[#E5DFD3]/30 outline-none transition-colors resize-none leading-relaxed"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="btn-spartan w-full py-4 rounded-md bg-gradient-to-r from-[#C29B38] via-[#D4AF37] to-[#E0C681] text-[#141312] font-bold text-xs sm:text-[13px] uppercase tracking-[0.22em] shadow-[0_8px_25px_rgba(194,155,56,0.3)] hover:brightness-105 transition-all cursor-pointer"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Bottom 4 Trust / Statistics Cards */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16">
            {stats.map((stat) => (
              <div
                key={stat.label}
                data-reveal
                className="border border-[#7A5C22]/30 bg-[#141312] p-6 sm:p-8 text-center rounded-xl transition-all duration-300 hover:border-[#C29B38]/60 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.7)]"
              >
                <div className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#CCA855] mb-1.5 leading-none">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#8E8B85] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
      </main>

      {/* Footer with activePath set to /contact */}
      <Footer activePath="/contact" />
    </div>
  );
}
