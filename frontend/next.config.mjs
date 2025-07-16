/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend-xxr1.onrender.com',
        pathname: '/file/**',
      },
    ],
  },
};

export default nextConfig;
