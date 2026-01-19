import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    // reactCompiler: false, // Ensure compiler is off as requested
  }
};

export default nextConfig;