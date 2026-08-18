/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hare-media-cdn.tripadvisor.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dynamic-media.tacdn.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
