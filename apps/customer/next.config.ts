
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Load authentication and database packages directly
  // in Node.js rather than bundling them into server chunks.
  serverExternalPackages: [
    "better-auth",
    "@better-auth/mongo-adapter",
    "mongodb",
  ],
};

export default nextConfig;
