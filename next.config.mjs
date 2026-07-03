/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '://cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL: "/",
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: "/admin",
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: "/admin",
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: "/m/login",
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: "/m/login"
  }
};

export default nextConfig;