const dotenv = require('dotenv')
const express = require('express')
const multer = require('multer')

const logger = require('./logger')
const config = require('./config')

var denv = dotenv.config({
    path: './.env',
    encoding: 'utf8'
})
if (denv.error) {
    throw denv.error
}
logger.debug('load env', denv.parsed)


const upload = multer({
    dest: 'public/uploads/'
})
const app = express()

// 静态资源
app.use(express.static('public'))

app.post('/api/image', upload.single('upload'), (req, res, next) => {
    console.log(req.file)
    res.json({
        path: req.file.filename
    })
})

app.listen(config.serverPort, () => {
    logger.debug(`Server start on http://127.0.0.1:${config.serverPort}`)
})
