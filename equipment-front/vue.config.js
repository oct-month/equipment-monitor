module.exports = {
    publicPath: './',
    filenameHashing: true,
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        https: false,
        open: false,
        hotOnly: true,
        proxy: {
            '/api/image': {
                target: 'http://127.0.0.1:8082',
                ws: true,
                secure: false,
                changeOrigin: true
            },
            '/api': {
                target: 'http://127.0.0.1:8081',    // 后端域名
                ws: true,
                secure: false,
                changeOrigin: true
            }
        }
    }
}
