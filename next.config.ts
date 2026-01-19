import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    reactCompiler: false, // Prompt gereği kapatıldı
  }
};

export default nextConfig;