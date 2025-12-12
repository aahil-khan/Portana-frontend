// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
//   // Optimization settings for better performance
//   productionBrowserSourceMaps: false,
//   experimental: {
//     optimizePackageImports: ["framer-motion", "lucide-react"],
//   },
//   compress: true,
//   onDemandEntries: {
//     maxInactiveAge: 60 * 1000,
//     pagesBufferLength: 5,
//   },
// }

// export default nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect old Vercel domain
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'portana.vercel.app' }],
        destination: 'https://aahil-khan.tech/:path*',
        permanent: true,
      },

      // Redirect www → non-www (if you choose non-www canonical)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.aahil-khan.tech' }],
        destination: 'https://aahil-khan.tech/:path*',
        permanent: true,
      },
    ]
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  compress: true,
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
}

export default nextConfig

