/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['example.com'],
    },
    async redirects() {
      return [
        {
          source: '/old-page',
          destination: '/new-page',
          permanent: true,
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: '/api/hello',
          destination: '/api/custom-hello',
        },
      ];
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      return config;
    },

        
          
  };
  
  export default nextConfig;
  