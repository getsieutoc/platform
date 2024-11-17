/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.s3.eu-central-1.amazonaws.com',
      },
    ],
  },
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
};
