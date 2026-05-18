import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tasklyqu.runasp.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
