import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : (isVercel ? "standalone" : undefined),
  basePath: isGithubPages ? "/Priyesh" : undefined,
  assetPrefix: isGithubPages ? "/Priyesh" : undefined,
  images: { unoptimized: true },
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
