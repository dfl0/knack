/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "knack-storage.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};
