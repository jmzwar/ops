// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  env: {
    NEXT_PUBLIC_OPENSEA_API_KEY: process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all HTTPS images
      },
      {
        protocol: "http",
        hostname: "**", // Allows all HTTP images (not recommended for production)
      },
      {
        protocol: "https",
        hostname: "ops-nextjs.vercel.app",
      },
    ],
  },
};

module.exports = nextConfig;
