const { ObjectId, Collection } = require('mongodb')
const to = require('await-to-js').default

const logger = require('../utils/logger')
const { getCollectionClient } = require('../utils/db')
const Equipment = require('../modules/equipment')


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
 * @returns {Promise<?String>} 添加后的结果id
 */
async function insertOneEquipment(equipment) {
    if (equipment.position && equipment.position[0] >= -180 && equipment.position[0] <= 180 && equipment.position[1] >= -90 && equipment.position[1] <= 90) {
    }
    else {
        return null
    }
    let err, res
    [err, res] = await to((await getCollection()).insertOne(equipment.dbData()))
    if (err) {
        logger.error(err)
        return null
    }
    else {
        return res.insertedId.toString()
    }
}

/**
 * 删除一项Equipment
 * @param {String} id 
 * @returns {Promise<Boolean>} 是否成功删除
 */
async function deleteOneEquipment(id) {
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

/**
 * 更新一项Equipment
 * @param {String} id
 * @param {Object} equipinfo 装备信息
 * @returns {Promise<Boolean>} 是否成功更新
 */
async function updateOneEquipment(id, equipinfo) {
    let err, res
    [err, res] = await to((await getCollection()).updateOne({
        id: new ObjectId(id)
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
 * @param {String} id 
 * @returns {Promise<?Equipment>} 一项Equipment
 */
async function findOneEquipment(id) {
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

/**
 * 根据范围获取多项Equipment
 * @param {Array[Number]} lu 左上角坐标(longitude, latitude)
 * @param {Array[Number]} rd 右下角坐标(longitude, latitude)
 * @returns {Promise<Equipment[]>} 多项Equipment
 */
async function findManyEquipmentByPosition(lu, rd) {
    if (lu && lu.length === 2 && rd && rd.length === 2) {
    }
    else {
        logger.error(`findManyEquipmentByPostion 参数错误: ${lu}, ${rd}`)
        return []
    }
    var a = lu[0]
    var b = lu[1]
    var c = rd[0]
    var d = rd[1]
    var collection = await getCollection()
    var cursor = null
    if (c < a) {
        // d~b
        // a~180 -180~c
        cursor = collection.find({
            positionLa: {
                $gte: d,
                $lte: b
            },
            $or: [
                {
                    positionLn: {
                        $gte: a,
                        $lte: 180
                    }
                },
                {
                    positionLn: {
                        $gte: -180,
                        $lte: c
                    }
                }
            ]
        })
    }
    else {
        // d~b
        // a~c
        cursor = collection.find({
            positionLa: {
                $gte: d,
                $lte: b
            },
            positionLn: {
                $gte: a,
                $lte: c
            }
        })
    }
    var equipmentArray = []
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
    findManyEquipmentByPosition,
    countEquipment
}
