const { ObjectId, Collection } = require('mongodb')
const to = require('await-to-js').default

const logger = require('../utils/logger')
const { getCollectionClient } = require('../utils/db')
const Monitoring = require('../modules/monitoring')


var collection = null

/**
 * 获取collection
 * @returns {Promise<Collection>}
 */
async function getCollection() {
    if (collection == null) {
        collection = await getCollectionClient('monitoring')
    }
    return collection
}

/**
 * 添加一项Monitoring
 * @param {Monitoring} monitoring 监测信息
 * @returns {Promise<?String>} 添加后的结果id
 */
async function insertOneMonitoring(monitoring) {
    let err, res
    [err, res] = await to((await getCollection()).insertOne(monitoring.withoutId()))
    if (err) {
        logger.error(err)
        return null
    }
    else {
        logger.debug(res)
        return res.insertedId.toString()
    }
}

/**
 * 删除一项Monitoring
 * @param {String} id 
 * @returns {Promise<Boolean>} 是否成功删除
 */
 async function deleteOneMonitoring(id) {
    let err, res
    [err, res] = await to((await getCollection()).deleteOne({
        id: new ObjectId(id)
    }))
    if (err) {
        logger.error(err)
        return false
    }
    else {
        logger.debug(res)
        return true
    }
}

// /**
//  * 更新一项Monitoring
//  * @param {String} id
//  * @param {Object} monitoringInfo 定位信息
//  * @returns {Promise<Boolean>} 是否成功更新
//  */
// async function updateOneMonitoring(id, monitoringInfo) {
//     let err, res
//     [err, res] = await to((await getCollection()).updateOne({
//         id: new ObjectId(id)
//     }, {
//         $set: monitoringInfo
//     }, {
//         upsert: false
//     }))
//     if (err) {
//         logger.error(err)
//         return false
//     }
//     else {
//         logger.debug(res)
//         return true
//     }
// }

/**
 * 查找一项Monitoring
 * @param {String} id 
 * @returns {Promise<?Monitoring>} 一项Monitoring
 */
async function findOneMonitoring(id) {
    let err, res
    [err, res] = await to((await getCollection()).findOne({
        id: new ObjectId(id)
    }))
    if (err) {
        logger.error(err)
        return null
    }
    else {
        logger.debug(res)
        return new Monitoring(res)
    }
}

/**
 * 获取多项Monitoring
 * @param {String} equipId 装备id
 * @param {Number} pageSize 页大小
 * @param {Number} pageIndex 页码
 * @returns {Promise<Monitoring[]>} 多项Monitoring
 */
async function findManyMonitoring(equipId, pageSize, pageIndex) {
    var monitoringArray = []
    var cursor = (await getCollection()).find({
        equip_id: equipId
    })
        .sort({
            time: -1
        })
        .skip(pageIndex * pageSize)
        .limit(pageSize)
    let err, res
    [err, res] = await to(cursor.forEach((doc) => {
        monitoringArray.push(new Monitoring(doc))
    }))
    if (err) {
        logger.error(err)
        return []
    }
    else {
        logger.debug(monitoringArray)
        return monitoringArray
    }
}

/**
 * 获取指定装备的监测数据数量
 * @param {String} equipId 
 * @returns {Promise<Number>} 装备的监测数据量
 */
async function countMonitoring(equipId) {
    let err, res
    [err, res] = await to((await getCollection()).countDocuments({
            equip_id: {
                $eq: equipId
            }
    }))
    if (err) {
        logger.error(err)
        return 0
    }
    else {
        logger.debug(res)
        return res
    }
}

/**
 * 获取装备的最新监测信息
 * @param {String} equipId 装备id
 * @returns {Promise<?Monitoring>} 装备的最新monitoring
 */
async function findEquipmenMonitoring(equipId) {
    var cursor = (await getCollection()).find({
        equip_id: equipId
    })
        .sort({
            time: -1
        })
        .limit(1)
    let err, res
    [err, res] = await to(cursor.forEach((doc) => {
        logger.debug(doc)
        return new Monitoring(doc)
    }))
    logger.error(err)
    return null
}


module.exports = {
    insertOneMonitoring,
    deleteOneMonitoring,
    // updateOneMonitoring,
    findOneMonitoring,
    findManyMonitoring,
    countMonitoring,
    findEquipmenMonitoring
}
