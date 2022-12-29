/** @type {import('next').NextConfig} */



const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    formats: ['image/avif', 'image/webp'],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.arweave.net',
      },
      {
        protocol: 'https',
        hostname: '*.run.app',
      },
      {
        protocol: 'https',
        hostname: 'arweave.net',
      },
    ],
  },
  webpack: (config) =>{
    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;
