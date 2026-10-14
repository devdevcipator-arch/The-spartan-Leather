"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "whatsapp";
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "btn-spartan font-bold text-xs sm:text-[13px] uppercase tracking-[0.22em] rounded-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#C29B38] to-[#E0C681] text-[#1A1918] px-8 py-4 sm:px-9 sm:py-4 shadow-[0_8px_25px_rgba(194,155,56,0.3)] hover:brightness-105",
    secondary:
      "bg-[#1A1918] text-[#E0C681] border border-[#7A5C22] px-7 py-3.5 sm:px-8 sm:py-4 hover:border-[#E0C681] hover:text-[#F3DE9E]",
    outline:
      "bg-transparent text-[#E0C681] border border-[#C29B38]/60 px-7 py-3.5 sm:px-8 sm:py-4 hover:border-[#E0C681] hover:bg-[#1A1918]/40",
    whatsapp:
      "bg-gradient-to-r from-[#1E5E3A] via-[#25D366] to-[#1E5E3A] text-white px-7 py-3.5 sm:px-8 sm:py-4 shadow-[0_8px_25px_rgba(37,211,102,0.25)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.4)]",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
