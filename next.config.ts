import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'your-cdn.com' },
    ],
  },
  devIndicators: false
};

export default nextConfig;
