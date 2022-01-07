const path = require('path')
const fs = require('fs')

module.exports = {
    // 数据库URL
    dbUrl: process.env.NODE_ENV === 'product' ? 'mongodb://equipment-mongodb:27017' : 'mongodb://127.0.0.1:27017',
    // 数据库名称
    dbName: 'monitor',
    // 服务端口
    serverPort: 8081,
    privateKey: fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'), 'utf-8') ,
    publicKey: fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'), 'utf-8')
}
