/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ hostname: 'utfs.io', protocol: 'https' }] },
  output: process.env.VERCEL ? undefined : 'standalone',
};

export default nextConfig;
