const PEPY_HOST = 'https://api.pepy.tech';
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
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
