/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["encrypted-tbn0.gstatic.com"],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
};

module.exports = nextConfig;
