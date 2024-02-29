/** @type {import('next').NextConfig} */
const nextConfig = {
  // FIXME Collaboration features not working correctly on React.StrictMode
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
