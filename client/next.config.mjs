/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'imgix',
        path: 
            'via.placeholder.com'
        
    },
    env: {
        SERVER_DOMAIN: process.env.SERVER_DOMAIN
    }
};

export default nextConfig;
