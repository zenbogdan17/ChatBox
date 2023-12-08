/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'res.cloudinary.com',
    ],
  },
  experimental: {
    appDir: true,
    swcPlugins: [['next-superjson-plugin', {}]],
  },
};

module.exports = nextConfig;
