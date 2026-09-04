/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: '*.ufs.sh', pathname: '/f/*', protocol: 'https' },
    ],
  },
  output: process.env.VERCEL ? undefined : 'standalone',
};

export default nextConfig;
