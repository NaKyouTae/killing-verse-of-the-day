/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  output: 'export',
  images: {
    loader: 'imgix',
    path: 'https://killing-verse.kr/images/', // 배포 경로
  },
}

module.exports = nextConfig
