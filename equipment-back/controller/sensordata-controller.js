const { WebSocket } = require('ws')
const { Kafka } = require('kafkajs')

const config = require('../config')
const logger = require('../utils/logger')

const kafka = new Kafka({
    clientId: 'equipment-back',
    brokers: config.kafkaServers
})

const consumer = kafka.consumer({
    groupId: 'foo'
})

var initFlag = false

async function init() {
    if (!initFlag) {
        initFlag = true
        await consumer.connect()
        await consumer.subscribe({
            topic: config.kafkaTopic,
            fromBeginning: false
        })
    }
}

/**
 * 获取传感器信息
 * @param {WebSocket} ws 
 */
async function getSensorData(ws) {
    await init()
    ws.on('open', async () => {
        await consumer.run({
            eachMessage: async ({ topic, partition, message}) => {
                msg = message.value.toString()
                // sensorData = JSON.parse(msg)
                // console.log(sensorData)
                ws.send(msg, (err) => {
                    if (err) {
                        logger.error(err)
                    }
                })
            }
        })
    })
}


module.exports = {
    getSensorData
}
