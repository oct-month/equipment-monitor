const { MongoClient, Collection } = require('mongodb')
const to = require('await-to-js').default

const logger = require('./logger')
const { dbUrl, dbName } = require('../config')


const client = new MongoClient(dbUrl)
var db = null
var connected = false
// client.connect()
//     .then((cli) => {
//         logger.debug('Connected successfully to mongodb')
//         connected = true
//         db = cli.db(dbName)
//     })
//     .catch(logger.error)

/**
 * 数据库是否连接
 * @returns {Boolean}
 */
function isClientConnected() {
    return connected
}

/**
 * 获取collection的操作对象
 * @param {String} collectionName collection名
 * @returns {Collection} collection的操作对象
 */
async function getCollectionClient(collectionName) {
    if (connected) {
        return db.collection(collectionName)
    }
    else {
        let err, cli
        [ err, cli ] = await to(client.connect())
        if (err) {
            logger.error(err)
            throw err
        }
        else {
            connected = true
            db = cli.db(dbName)
            logger.debug('Connected successfully to mongodb')
            return db.collection(collectionName)
        }
    }
}

/**
 * 关闭数据库连接
 */
function closeClientConnect() {
    client.close()
        .then(() => {
            logger.debug('Disconnected to mongodb')
        })
}

module.exports = {
    isClientConnected,
    getCollectionClient,
    closeClientConnect
}
