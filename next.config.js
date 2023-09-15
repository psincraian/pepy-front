const PEPY_HOST = process.env.NODE_ENV === "production" ? 'https://api.pepy.tech' : 'http://localhost:8081';
/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/project/:project',
                destination: '/projects/:project',
                permanent: true,
            },
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: PEPY_HOST + '/api/:path*',
            },
        ]
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production"
    }
}

module.exports = nextConfig
