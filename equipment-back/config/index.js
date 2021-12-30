const path = require('path')
const fs = require('fs')

module.exports = {
    // 数据库URL
    dbUrl: 'mongodb://127.0.0.1:27017',
    // 数据库名称
    dbName: 'monitor',
    // 服务端口
    server: {
        hostname: 'localhost',
        port: 8080
    },
    privateKey: fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'), 'utf-8') ,
    publicKey: fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'), 'utf-8')
}
