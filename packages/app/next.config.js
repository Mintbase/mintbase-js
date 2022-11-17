/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  webpack: (config) =>{
    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;
