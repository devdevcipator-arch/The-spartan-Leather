import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Marks this app as undergoing the agent-driven security upgrade
  // (Next.js 16.4.0 → 16.4.3, published security advisory).
  experimental: {
    agentUpgrade: "security",
  },
  // Product visuals uploaded through the admin dashboard are served from
  // Supabase Storage public URLs; allow next/image to optimize them.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vpditkpshterzmqkqpwj.supabase.co",
        pathname: "/storage/v1/object/public/product-visuals/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
