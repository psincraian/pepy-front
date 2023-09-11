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
    compiler: {
        removeConsole: process.env.NODE_ENV === "production"
    }
}

module.exports = nextConfig
