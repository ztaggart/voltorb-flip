/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "build",
  basePath: "/voltorb-flip",
  images: { unoptimized: true },
};

export default nextConfig;
