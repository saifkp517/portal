/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'imgix',
        path: 
            'via.placeholder.com'
        
    },
    env: {
        NEXT_PUBLIC_SERVER_DOMAIN: process.env.NEXT_PUBLIC_SERVER_DOMAIN
    }
};

export default nextConfig;
