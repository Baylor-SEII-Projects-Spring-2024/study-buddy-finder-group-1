const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Only include browser-specific code in the webpack bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        // Enable the usage of 'window' and 'location' in browser environment
        'assert': false,
        'fs': false,
        'path': false,
        'os': false,
      };
    }
    return config;
  },
};

module.exports = nextConfig
