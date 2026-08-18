const path = require('path');

const CLIENT_MODE = process.env.NEXT_PUBLIC_CLIENT_MODE === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  webpack: (config, { webpack }) => {
    if (CLIENT_MODE) {
      // Keep the internal demo page (integration guide, newsletter, debug
      // controls) out of the client deliverable's bundle entirely.
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /^@\/app\/ClientHome$/,
          path.resolve(__dirname, 'src/app/ClientHomeStub.tsx')
        )
      );
    }
    return config;
  },
};

module.exports = nextConfig;
