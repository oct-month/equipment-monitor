const { ObjectId, Collection } = require('mongodb')
const to = require('await-to-js').default

const logger = require('../utils/logger')
const { getCollectionClient } = require('../utils/db')
const { Equipment } = require('../modules')


var collection = null

/**
 * 获取collection
 * @returns {Promise<Collection>}
 */
async function getCollection() {
    if (collection == null) {
        collection = await getCollectionClient('equipment')
    }
    return collection
}

/**
 * 添加一项Equipment
 * @param {Equipment} equipment 装备信息
 * @returns {Promise<?ObjectId>} 添加后的结果id
 */
async function insertOneEquipment(equipment) {
    let err, res
    [err, res] = await to((await getCollection()).insertOne(equipment.withoutId()))
    if (err) {
        logger.error(err)
        return null
    }
    else {
        logger.debug(res)
        return res.insertedId
    }
}

/**
 * 删除一项Equipment
 * @param {String} _id 
 * @returns {Promise<Boolean>} 是否成功删除
 */
async function deleteOneEquipment(_id) {
    let err, res
    [err, res] = await to((await getCollection()).deleteOne({
        _id: new ObjectId(_id)
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

/**
 * 更新一项Equipment
 * @param {String} _id
 * @param {Object} equipinfo 装备信息
 * @returns {Promise<Boolean>} 是否成功更新
 */
async function updateOneEquipment(_id, equipinfo) {
    let err, res
    [err, res] = await to((await getCollection()).updateOne({
        _id: new ObjectId(_id)
    }, {
        $set: equipinfo
    }, {
        upsert: false
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

/**
 * 查找一项Equipment
 * @param {String} _id 
 * @returns {Promise<?Equipment>} 一项Equipment
 */
async function findOneEquipment(_id) {
    let err, res
    [err, res] = await to((await getCollection()).findOne({
        _id: ObjectId(_id)
    }))
    if (err) {
        logger.error(err)
        return null
    }
    else {
        logger.debug(res)
        return new Equipment(res)
    }
}

/**
 * 获取Equpment的数量
 * @returns {Promise<Number>} Equipment的数量
 */
async function countEquipment() {
    let err, res
    [err, res] = await to((await getCollection()).countDocuments())
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
 * 获取多项Equipment
 * @param {Number} pageSize 页大小
 * @param {Number} pageIndex 页码
 * @returns {Promise<Equipment[]>} 多项Equipment
 */
async function findManyEquipment(pageSize, pageIndex) {
    var equipmentArray = []
    var cursor = (await getCollection()).find()
        .skip(pageIndex * pageSize)
        .limit(pageSize)
    let err, res
    [err, res] = await to(cursor.forEach((doc) => {
        equipmentArray.push(new Equipment(doc))
    }))
    if (err) {
        logger.error(err)
        return []
    }
    else {
        logger.debug(equipmentArray)
        return equipmentArray
    }
}

module.exports = {
    insertOneEquipment,
    deleteOneEquipment,
    updateOneEquipment,
    findOneEquipment,
    findManyEquipment,
    countEquipment
}
