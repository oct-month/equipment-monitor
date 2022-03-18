const path = require('path')
// const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const express = require('express')

const logger = require('./utils/logger')
const config = require('./config')
const router = require('./route')


// var denv = dotenv.config({
//     path: './.env',
//     encoding: 'utf8'
// })
// if (denv.error) {
//     throw denv.error
// }
// logger.debug('load env', denv.parsed)


const app = express()

// 静态资源
app.use(express.static('public'))
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// 解析 application/json
app.use(bodyParser.json())
// art-template 设置
app.engine('art', require('express-art-template'))
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production',
    // 关闭自动编码
    escape: false
})
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')

// 解析querystring #临时 TODO
app.use('/', (req, res, next) => {
    var dtstr = req.query['data']
    if (dtstr) {
        try {
            var data = JSON.parse(dtstr)
            Object.assign(req.body, data)
        }
        catch (err) {
            logger.error(err)
        }
    }
    next()
})

// 跨域
if (process.env.NODE_ENV !== 'product') {
    app.use('/', (req, res, next) => {
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.header('Access-Control-Allow-Origin', `http://${config.host}:8080`)
        next()
    })
}

app.use('/', router)


app.listen(config.serverPort, () => {
    logger.debug(`Server start on http://127.0.0.1:${config.serverPort}`)
})
