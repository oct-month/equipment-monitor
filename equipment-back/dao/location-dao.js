const { ObjectId, Collection } = require('mongodb')
const to = require('await-to-js').default

const logger = require('../utils/logger')
const { getCollectionClient } = require('../utils/db')
const { Location } = require('../modules')


var collection = null

/**
 * 获取collection
 * @returns {Promise<Collection>}
 */
async function getCollection() {
    if (collection == null) {
        collection = await getCollectionClient('location')
    }
    return collection
}

/**
 * 添加一项Location
 * @param {Location} location 定位信息
 * @returns {Promise<?ObjectId>} 添加后的结果id
 */
async function insertOneLocation(location) {
    let err, res
    [err, res] = await to((await getCollection()).insertOne(location.withoutId()))
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
 * 删除一项Location
 * @param {String} _id 
 * @returns {Promise<Boolean>} 是否成功删除
 */
 async function deleteOneLocation(_id) {
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
 * 更新一项Location
 * @param {String} _id
 * @param {Object} locationInfo 定位信息
 * @returns {Promise<Boolean>} 是否成功更新
 */
async function updateOneLocation(_id, locationInfo) {
    let err, res
    [err, res] = await to((await getCollection()).updateOne({
        _id: new ObjectId(_id)
    }, {
        $set: locationInfo
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
 * 查找一项Location
 * @param {String} _id 
 * @returns {Promise<?Location>} 一项Location
 */
async function findOneLocation(_id) {
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
        return new Location(res)
    }
}

/**
 * 获取多项Location
 * @param {String} equipId 装备id
 * @param {Number} pageSize 页大小
 * @param {Number} pageIndex 页码
 * @returns {Promise<Location[]>} 多项Location
 */
async function findManyLocation(equipId, pageSize, pageIndex) {
    var locationArray = []
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
        locationArray.push(new Location(doc))
    }))
    if (err) {
        logger.error(err)
        return []
    }
    else {
        logger.debug(locationArray)
        return locationArray
    }
}

/**
 * 获取装备的最新位置
 * @param {String} equipId 装备id
 * @returns {Promise<?Location>} 装备的最新location
 */
async function findEquipmenLocation(equipId) {
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
        return new Location(doc)
    }))
    logger.error(err)
    return null
}

module.exports = {
    insertOneLocation,
    deleteOneLocation,
    updateOneLocation,
    findOneLocation,
    findManyLocation,
    findEquipmenLocation
}
