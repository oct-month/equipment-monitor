const path = require('path')
const express = require('express')

const equipmentController = require('../controller/equipment-controller')
const monitoringController = require('../controller/monitoring-controller')
// const logger = require('../utils/logger')


var router = express.Router()

router.get('/api/equipment', equipmentController.getEquipments)
router.post('/api/equipment', equipmentController.postEquipment)

router.get('/api/monitoring', monitoringController.getMonitorings)
router.post('/api/monitoring', monitoringController.postMonitoring)

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

module.exports = router
