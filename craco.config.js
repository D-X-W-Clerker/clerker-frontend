const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@api': path.resolve(__dirname, 'src/api'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@data': path.resolve(__dirname, 'src/data'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@types': path.resolve(__dirname, 'src/types'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@layout': path.resolve(__dirname, 'src/Layout'),
        },
    },
};
