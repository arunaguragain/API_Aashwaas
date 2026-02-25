import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow cross-origin dev requests from these origins (for dev server hot reload, assets)
  // Add additional origins as needed, exact origin must include protocol and port if used.
  allowedDevOrigins: [
    "http://192.168.137.1",
    "http://192.168.137.1:3000",
    "http://localhost:3000",
    "http://0.0.0.0:3000",
    "https://192.168.137.1:3000",
    "https://localhost:3000",
    "http://192.168.137.247",
    "http://192.168.137.247:3000",
  ],
};

export default nextConfig;
