const { composePlugins, withNx } = require('@nx/next');

const nextConfig = {
  nx: { svgr: true }, // Enable SVGR since we fixed your SVG types earlier
  experimental: {
    typedRoutes: true, // Matches the fix in your tsconfig
  },
  reactStrictMode: true,
};

const plugins = [withNx];
module.exports = composePlugins(...plugins)(nextConfig);
