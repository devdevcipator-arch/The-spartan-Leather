"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FaqSection() {
  // Default second item ("samples") open as shown in the screenshot
  const [openId, setOpenId] = useState<string | null>("samples");

  const faqs: FaqItem[] = [
    {
      id: "moq",
      question: "WHAT IS YOUR MINIMUM ORDER QUANTITY (MOQ)?",
      answer:
        "Our standard MOQ depends on the product category. For small leather accessories and wallets, baseline MOQs typically start at 50–100 units per design, while bespoke leather jackets, equestrian gear, and luxury duffels can be accommodated in flexible lower batches for premium partners.",
    },
    {
      id: "samples",
      question: "CAN I REQUEST CUSTOM SAMPLES?",
      answer:
        "Yes, we provide sample development services for OEM clients. Sample charges are applicable and can be adjusted in the final bulk order payment.",
    },
    {
      id: "lead-times",
      question: "WHAT ARE YOUR TYPICAL SHIPPING LEAD TIMES?",
      answer:
        "Sample orders typically dispatch within 7–12 business days following design approval. Bulk production orders usually ship in 3–5 weeks depending on order volume and custom hardware requirements, with full worldwide air/sea logistics support.",
    },
    {
      id: "quotation",
      question: "HOW CAN I GET A QUOTATION FOR A BULK ORDER?",
      answer:
        "Simply click any 'Inquire on WhatsApp' CTA across our catalog, or send us your target quantities, leather grade preferences, and custom specifications directly. Our team provides fast, tailored wholesale quotations.",
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full px-6 sm:px-8 md:px-[48px] py-20 sm:py-28 bg-[#0B0B0B]">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.06em] text-[#E0C681]">
          Frequently Asked Questions
        </h2>
      </div>

      {/* FAQ Accordion List */}
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-4.5">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`border transition-all duration-300 ${
                isOpen
                  ? "border-[#7A5C22] bg-[#141312] shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
                  : "border-[#2B2A28]/80 bg-[#141312]/70 hover:border-[#7A5C22]/60 hover:bg-[#141312]"
              }`}
            >
              {/* Question Toggle Header */}
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span
                  className={`font-serif text-sm sm:text-base font-semibold uppercase tracking-[0.12em] transition-colors pr-4 ${
                    isOpen
                      ? "text-[#E0C681]"
                      : "text-[#E5DFD3]/85 group-hover:text-[#E0C681]"
                  }`}
                >
                  {faq.question}
                </span>

                <div className="flex-shrink-0 text-[#E0C681]">
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-[#E0C681] transition-transform duration-200" />
                  ) : (
                    <Plus className="w-5 h-5 text-[#E0C681]/90 group-hover:text-[#E0C681] transition-transform duration-200" />
                  )}
                </div>
              </button>

              {/* Answer Body (Animated expansion) */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pt-0 sm:px-8 sm:pb-7">
                    <p className="text-xs sm:text-sm text-[#E5DFD3]/75 leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
