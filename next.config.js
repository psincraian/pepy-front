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
                destination: 'http://localhost:8081/api/:path*',
            },
        ]
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production"
    }
}

module.exports = nextConfig
