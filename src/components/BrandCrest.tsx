import Image from "next/image";

interface BrandCrestProps {
  /** Rendered size of the square crest, in pixels. */
  size?: number;
  /** Extra classes applied to the <img>. Use `w-full h-full` to fill a sized parent. */
  className?: string;
  alt?: string;
  /** Preload the asset (use for above-the-fold instances). */
  preload?: boolean;
}

/**
 * The Spartan Leather brand crest.
 *
 * Sourced from /public/brand/crest.png - a transparent PNG of the gold medallion
 * lifted out of the brand artwork. Keeping the mark in one place means the
 * header, footer, auth pages and favicon can never drift apart.
 */
export default function BrandCrest({
  size = 48,
  className = "",
  alt = "The Spartan Leather crest",
  preload = false,
}: BrandCrestProps) {
  return (
    <Image
      src="/brand/crest.png"
      alt={alt}
      width={size}
      height={size}
      preload={preload}
      className={className}
    />
  );
}
