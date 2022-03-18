const { Request, Response, NextFunction } = require('express')

const { generatorToken } = require('../utils/token')
const equipmentDAO = require('../dao/equipment-dao')
const Equipment = require('../modules/equipment')


/**
 * 获取装备信息
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
async function getEquipments(req, res, next) {
    var pageSize = req.body['pagesize']
    var pageIndex = req.body['pageindex']
    var countFlag = req.body['count']
    var resBody = {}
    if (pageSize > 0 && pageIndex >= 0) {
        resBody['data'] = await equipmentDAO.findManyEquipment(pageSize, pageIndex)
        resBody['data'].forEach((value, idx, array) => {
            array[idx] = value.withoutToken()
        })
        resBody['data'].reverse()
    }
    if (countFlag) {
        resBody['count'] = await equipmentDAO.countEquipment()
    }
    res.json(resBody)
}

/**
 * 获取指定区域内的装备信息
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next 
 */
async function getEquipmentsByPosition(req, res, next) {
    var lu = req.body['nw']
    var rd = req.body['se']
    var countFlag = req.body['count']
    // if (lu && lu.length === 2 && rd && rd.length === 2) {
    // }
    // else {
    //     logger.error(`findManyEquipmentByPostion 参数错误: ${lu}, ${rd}`)
    //     return []
    // }
    var resBody = {}
    resBody['data'] = await equipmentDAO.findManyEquipmentByPosition(lu, rd)
    resBody['data'].forEach((value, idx, array) => {
        array[idx] = value.withoutToken()
    })
    resBody['data'].reverse()
    if (countFlag) {
        resBody['count'] = await equipmentDAO.countEquipment()
    }
    res.json(resBody)
}


/**
 * 注册装备信息
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
async function postEquipment(req, res, next) {
    var equip = new Equipment({
        name: req.body['name'],
        image: req.body['image'],
        info: req.body['info'],
        position: req.body['position']
    })
    equip.id = await equipmentDAO.insertOneEquipment(equip)
    if (!equip.id) {
        res.status(400).json({
            msg: 'insert equip fail'
        })
        return
    }
    equip.token = generatorToken(equip.payload())
    var flag = await equipmentDAO.updateOneEquipment(equip.id, {
        token: equip.token
    })
    if (!flag) {
        res.status(400).json({
            msg: 'generator token fail'
        })
        return
    }
    res.json({
        id: equip.id,
        token: equip.token
    })
}


module.exports = {
    getEquipments,
    getEquipmentsByPosition,
    postEquipment
}
