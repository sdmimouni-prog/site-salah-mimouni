import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: { root: process.cwd() },
  redirects() {
    return [
      {
        source: '/lancien-pauvre',
        destination: '/livres/lancien-pauvre',
        permanent: true,
      },
      {
        source: '/quand-les-marques-pensent',
        destination: '/livres/quand-les-marques-pensent',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
