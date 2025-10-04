/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
        port: '',
        pathname: '/**',
      },
      // Allow all images from cdn.prod.website-files.com
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'carboncraft.in',
        port: '',
        pathname: '/static/media/logo.67964fd77212965c6c78.webp',
      },
      {
        protocol: 'https',
        hostname: 'cohere-ai.ghost.io',
        port: '',
        pathname: '/content/images/size/wla1000/**',
      },
    ],
  },
};

export default nextConfig;
