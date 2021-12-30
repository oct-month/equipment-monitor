module.exports = {
    publicPath: './',
    filenameHashing: true,
    devServer: {
        host: '127.0.0.1',
        port: 3000,
        https: false,
        open: false,
        hotOnly: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',    // 后端域名
                ws: true,
                secure: false,
                changeOrigin: true
                // pathRewrite: {
                //     '/api': '/api'
                // }
            }
        },
        before: (app) => {
            // app express实例
        },
        after: () => {
            // 启动后
        }
    }
}
