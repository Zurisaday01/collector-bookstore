/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['lucide-react'], // add this
    images: {
        domains: ['lh3.googleusercontent.com', 'images-na.ssl-images-amazon.com', 'images.unsplash.com'],
    },
}

module.exports = nextConfig
