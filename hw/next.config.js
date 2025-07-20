/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "vercel.com"],
  },
  env: {
    NEXT_PUBLIC_TODOIST_API_TOKEN: process.env.TODOIST_API_TOKEN,
  }
};

module.exports = nextConfig;
