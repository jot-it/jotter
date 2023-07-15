const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Prevent Yjs from being bundled twice
  //https://github.com/yjs/yjs/issues/410#issuecomment-1127478919
  webpack: (config) => {
    config.resolve.alias.yjs = path.resolve('node_modules/yjs/dist/yjs.cjs');
    return config;
  }
}

module.exports = nextConfig
