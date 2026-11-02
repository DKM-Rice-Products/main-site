/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  // GitHub project sites are served from /<repository-name>. Set
  // PAGES_CUSTOM_DOMAIN=true in the workflow when publishing at a domain root.
  basePath: process.env.PAGES_CUSTOM_DOMAIN === "true" ? "" : "/main-site",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
