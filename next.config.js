/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.fal.media" },
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/inspiration", destination: "/marketplace", permanent: false },
    ];
  },
};

module.exports = nextConfig;
