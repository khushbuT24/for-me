import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backend = (process.env.AGENT_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
    return [
      { source: "/api/agent/:path*", destination: `${backend}/:path*` },
      { source: "/api/users/:path*", destination: `${backend}/api/users/:path*` },
    ];
  },
};

export default nextConfig;
