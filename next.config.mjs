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
           },
           {
            protocol: 'https',
            hostname: 'i.ibb.co',
            pathname: '/**',
           },
           {
            protocol: 'https',
            hostname: 'i.ibb.co.com',
            pathname: '/**',
           }
        ]
    }
};

export default nextConfig;
