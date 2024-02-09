/** @type {import('next').NextConfig} */
const nextConfig = {
  // FIXME Collaboration features not working correctly on React.StrictMode
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/*",
      },
    ],
  },
};

module.exports = nextConfig;
