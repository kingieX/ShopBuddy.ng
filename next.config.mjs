// next.config.mjs
const nextConfig = {
  // Existing config options...
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary domain here
  },
  async middleware() {
    return [
      {
        source: '/admin/:path*',
        middleware: ['authMiddleware'],
      },
    ];
  },
};

export default nextConfig;
