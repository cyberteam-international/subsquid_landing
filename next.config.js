/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: false
    },
    future: {
        webpack5: true,
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(zip)$/,
            type: 'asset/resource',
            generator: {
                filename: '[name][ext]'
            }
        });
        return config;
    }
}

module.exports = nextConfig
