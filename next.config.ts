import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 85, 90, 95],
    deviceSizes: [390, 640, 744, 1024, 1280, 1440, 1920, 2400],
    imageSizes: [80, 120, 240, 358, 540, 728, 1128],
  },
};

export default nextConfig;
