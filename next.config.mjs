/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Optimization settings for better performance
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  compress: true,
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
}

export default nextConfig
