/** @type {import('next').NextConfig} */
const nextConfig = {
    // typescript: {
    //     ignoreBuildErrors: true
    // },
    images: {
        remotePatterns: [
           {
            protocol: 'https',
            hostname: 'i.postimg.cc',
            pathname: '/**',
           }
        ]
    }
};

export default nextConfig;
