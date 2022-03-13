const { Request, Response, NextFunction } = require('express')

const { verifyToken } = require('../utils/token')
const monitoringDao = require('../dao/monitoring-dao')
const Monitoring = require('../modules/monitoring')


/**
 * 获取监测信息
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
async function getMonitorings(req, res, next) {
    var equipId = req.body['equipid']
    var pageSize = req.body['pagesize']
    var pageIndex = req.body['pageindex']
    var countFlag = req.body['count']
    var resBody = {}
    if (pageSize > 0 && pageIndex >= 0) {
        resBody['data'] = await monitoringDao.findManyMonitoring(equipId, pageSize, pageIndex)
    }
    if (countFlag) {
        resBody['count'] = await monitoringDao.countMonitoring(equipId)
    }
    res.json(resBody)
}

/**
 * post装备监测信息
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
async function postMonitoring(req, res, next) {
    var payload = verifyToken(req.body['token'])
    var monit = new Monitoring({
        equip_id: payload['id'],
        time: new Date(req.body['time']),   // UTC时间
        content: req.body['content']
    })
    id = await monitoringDao.insertOneMonitoring(monit)
    res.json({
        id: id
    })
}


module.exports = {
    getMonitorings,
    postMonitoring
}
