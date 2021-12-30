const { ObjectId } = require('mongodb')
const to = require('await-to-js').default

const logger = require('../utils/logger')
const { getCollectionClient } = require('../utils/db')
const Equipment = require('../modules/equipment')


const collection = await getCollectionClient('equipment')

/**
 * 添加一项Equipment
 * @param {Equipment} equipment 装备信息
 * @returns {Boolean} 是否成功添加
 */
async function insertOneEquipment(equipment) {
    let err, res
    [ err, res ] = await to(collection.insertOne(equipment.withoutId()))
    if (err) {
        logger.error(err)
        return False
    }
    else {
        logger.debug(res)
        return True
    }
}

/**
 * 删除一项Equipment
 * @param {String} _id 
 * @returns {Boolean} 是否成功删除
 */
async function deleteOneEquipment(_id) {
    let err, res
    [ err, res ] = await to(collection.deleteOne({
        _id: new ObjectId(_id)
    }))
    if (err) {
        logger.error(err)
        return False
    }
    else {
        logger.debug(res)
        return True
    }
}

/**
 * 更新一项Equipment
 * @param {String} _id
 * @param {Object} equipinfo 装备信息
 * @returns 是否成功更新
 */
async function updateOneEquipment(_id, equipinfo) {
    let err, res
    [err, res] = await to(collection.updateOne({
        _id: new ObjectId(_id)
    }, equipinfo))
    if (err) {
        logger.error(err)
        return False
    }
    else {
        logger.debug(res)
        return True
    }
}

/**
 * 查找一项Equipment
 * @param {String} _id 
 * @returns 一项Equipment
 */
async function findOneEquipment(_id) {
    let err, res
    [err, res] = await to(collection.findOne({
        _id: ObjectId(_id)
    }))
    if (err) {
        logger.error(err)
        return null
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
 * @returns 多项Equipment
 */
async function findManyEquipment(pageSize, pageIndex) {
    var equipmentArray = []
    var cursor = collection.find()
        .skip(pageIndex * pageSize)
        .limit(pageSize)
    let err, res
    [err, res] = await to(cursor.forEach((doc) => {
        var equipment = Object.assign({}, doc)
        equipment._id = doc._id.toString()
        equipmentArray.push(equipment)
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
    findManyEquipment
}
