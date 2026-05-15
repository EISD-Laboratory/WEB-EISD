/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['miro.medium.com', 'cdn-images-1.medium.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig

