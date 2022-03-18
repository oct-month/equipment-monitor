const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
const zlib = require('zlib')

// const isProduction = process.env.NODE_ENV === 'production'
var host = '172.21.186.30'

module.exports = {
    publicPath: './',
    filenameHashing: true,
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        https: false,
        open: false,
        hotOnly: true,
        proxy: {
            '/api/image': {
                target: `http://${host}:8082`,
                ws: true,
                secure: false,
                changeOrigin: true
            },
            '/api': {
                target: `http://${host}:8081`,    // 后端域名
                ws: true,
                secure: false,
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@i': path.resolve(__dirname, './src/assets'),
            }
        },
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new CompressionPlugin({
                filename: "[path][base].gz",
                algorithm: "gzip",
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            }),
            new CompressionPlugin({
                filename: "[path][base].br",
                algorithm: "brotliCompress",
                test: /\.(js|css|html|svg)$/,
                compressionOptions: {
                    params: {
                        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                    },
                },
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    }
}
