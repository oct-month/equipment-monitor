const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'equipment-back',
    brokers: ['equipment-kafka:9092']
})

const consumer = kafka.consumer({
    groupId: 'foo'
})

async function main() {
    await consumer.connect()
    await consumer.subscribe({
        topic: 'sensor',
        fromBeginning: false
    })
    await consumer.run({
        eachMessage: async ({ topic, partition, message}) => {
            msg = message.value.toString()
            sensorData = JSON.parse(msg)
            console.log(sensorData)
        }
    })
}

main()
