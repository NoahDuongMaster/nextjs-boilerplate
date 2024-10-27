import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';
import createJiti from 'jiti';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/shared/env-client.ts');
jiti('./src/shared/env-server.ts');

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'debug'] }
        : false,
  },
  devIndicators: {
    appIsrStatus: false,
  },
  experimental: {
    cssChunking: 'loose',
    optimizePackageImports: [],
    reactCompiler: true,
    serverActions: {
      allowedOrigins: process.env.CORS_ORIGINS?.split(','),
    },
    webVitalsAttribution: ['FCP', 'TTFB'],
    useLightningcss: false,
  },
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: process.env.NODE_ENV === 'production' ? 60 : 0,
    remotePatterns:
      process.env.CORS_RESOURCE?.split(',').map((remote) => ({
        hostname: remote,
      })) ?? [],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: 'standalone',
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  reactStrictMode: true,
  serverExternalPackages: ['pino-pretty'],
};

export default nextConfig;
