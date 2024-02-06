/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["www.gutenberg.org", "localhost", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
