/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      snarkyjs: require('path').resolve('node_modules/snarkyjs'),
    }
    return config;
  },
  // To enable SnarkyJS for the web, we must set the COOP and COEP headers.
  // See here for more information: https://docs.minaprotocol.com/zkapps/how-to-write-a-zkapp-ui#enabling-coop-and-coep-headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ];
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  }

};

module.exports = nextConfig
