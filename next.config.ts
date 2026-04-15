import type { NextConfig } from "next";

const repoName = "Trinh-Cong-Minh-Profile";
const isStaticExport = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isStaticExport ? `/${repoName}` : '',
  assetPrefix: isStaticExport ? `/${repoName}/` : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
