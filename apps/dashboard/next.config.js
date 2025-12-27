const { composePlugins, withNx } = require('@nx/next');

const nextConfig = {
  nx: { svgr: true },
  experimental: {
    typedRoutes: true,
  },
  reactStrictMode: true,
};

const plugins = [withNx];
module.exports = composePlugins(...plugins)(nextConfig);
