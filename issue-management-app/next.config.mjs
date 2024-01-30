/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'referrer-policy',
                        value: 'no-referrer',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
