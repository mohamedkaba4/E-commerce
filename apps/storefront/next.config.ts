import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../.."),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd3njnrug6obz9k.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'd3njnrug6obz9k.cloudfront.net',
        pathname: '/**',
      },
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
