const express = require('express')
const http = require('http')
const { WebSocket } =require('ws')

const equipmentController = require('../controller/equipment-controller')
const monitoringController = require('../controller/monitoring-controller')
const sensorDataController = require('../controller/sensordata-controller')
// const logger = require('../utils/logger')


/**
 * 
 * @param {express.Express} app 
 */
function registerRoute(app) {
    var router = express.Router()
    router.get('/api/equipment', equipmentController.getEquipments)
    router.get('/api/equipment/position', equipmentController.getEquipmentsByPosition)
    router.post('/api/equipment', equipmentController.postEquipment)
    router.get('/api/monitoring', monitoringController.getMonitorings)
    router.post('/api/monitoring', monitoringController.postMonitoring)
    app.use('/', router)

    const server = http.createServer(app)
    const wss = new WebSocket.Server({
        server: server,
        path: '/api/sensordata'
    })
    wss.on('connection', sensorDataController.getSensorData)

    return server
}

// router.post('/api/login', (req, res, next) => {
//     var username = req.body['username']
//     var password = req.body['password']
//     var tk = generatorToken({
//         username
//     })
//     res.json({
//         token: tk
//     })
// })

// router.get('/demo', (req, res, next) => {
//     var tk = req.query['token'] || req.body['token']
//     var payload = verifyToken(tk)
//     if (payload) {
//         res.render('demo.art', {
//             title: 'demo页面'
//         })
//     }
//     else {
//         res.redirect('/login.html')
//     }
// })

module.exports = registerRoute
