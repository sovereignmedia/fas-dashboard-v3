/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint runs via CI/local checks; Vercel build should not fail on lint warnings
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
