const { WebSocket } = require('ws')
const { Kafka, logLevel, Consumer } = require('kafkajs')

const config = require('../config')
const logger = require('../utils/logger')

const kafka = new Kafka({
    clientId: 'equipment-back',
    brokers: config.kafkaServers,
    logLevel: logLevel.INFO
})

const consumer = kafka.consumer({
    groupId: 'foo'
})
var consumerConnected = false

// TODO init 吧，避免重入
/**
 * 获取消费者
 * @returns {Promise<Consumer>}
 */
async function getConsumer() {
    if (!consumerConnected) {
        await consumer.connect()
        await consumer.subscribe({
            topic: config.kafkaTopic,
            fromBeginning: false
        })
        consumerConnected = true
    }
    return consumer
}

/**
 * 断开消费者
 */
async function stopConsumer() {
    if (consumerConnected) {
        await consumer.stop()
        await consumer.disconnect()
    }
}

/**
 * 获取传感器信息
 * @param {Set<WebSocket>} wsClients
 */
async function getSensorData(wsClients) {
    consumer = await getConsumer()
    await consumer.run({
        autoCommitInterval: 5000,
        eachMessage: async ({ topic, partition, message}) => {
            msg = message.value.toString()
            // sensorData = JSON.parse(msg)
            // console.log(sensorData)
            wsClients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(msg, (err) => {
                        if (err) {
                            logger.error(err)
                        }
                    })
                }
            })
        }
    })
}


module.exports = {
    getSensorData,
    stopConsumer
}
