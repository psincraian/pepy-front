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
}

module.exports = nextConfig
