import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  allowedDevOrigins: ['e-commerce.mavencrest.site'],
  
  serverExternalPackages: ['@prisma/client', 'pg'],
};

export default nextConfig;