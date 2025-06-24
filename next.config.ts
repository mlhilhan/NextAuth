import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // experimental: {
  //   appDir: true,
  // },

  // Environment variables validation
  env: {
    CUSTOM_APP_ENV: process.env.NODE_ENV,
  },

  // Image optimization
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google OAuth images
      "s.gravatar.com", // Auth0 gravatar images
      "cdn.auth0.com", // Auth0 profile images
      "avatars.githubusercontent.com", // GitHub OAuth images
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },

  // Redirects for better UX
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/auth/signin",
        permanent: true,
      },
      {
        source: "/signin",
        destination: "/auth/signin",
        permanent: true,
      },
    ];
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Standalone output for Docker
  output: "standalone",
};

export default nextConfig;
