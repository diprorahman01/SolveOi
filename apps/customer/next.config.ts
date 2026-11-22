import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Deliberately do NOT enable cacheComponents for request-based auth pages.
};
export default nextConfig;
