/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '/**',
          },
          
          
        ],
      },
      exoperimental: {
        serverActions: {
        bodySizeLimit: '10mb',
      },
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  };
export default nextConfig;