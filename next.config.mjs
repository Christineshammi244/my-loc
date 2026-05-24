/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          
            {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '/**',
          },
          { protocol: 'https', hostname: 'placeholde.co' },
          {
            protocol: 'https',
            hostname: '://unsplash.com',
          }
        ],
      },
};

export default nextConfig;