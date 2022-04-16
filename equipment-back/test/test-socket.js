const { WebSocket } = require('ws')

const ws = new WebSocket('ws://localhost:8081/api/sensordata', {
    timeout: 10
})

ws.on('open', () =>{
    console.log('客户端open')
})

ws.on('message', (msg) => {
    console.log('客户端：' + msg)
})

ws.on('close', (e) => {
    console.log(e)
    ws.close()
})

ws.on('error', (err) => {
    console.error(err)
})
