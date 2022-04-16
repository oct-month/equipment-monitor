const { WebSocket } = require('ws')

const ws = new WebSocket('ws://localhost:8081/api/sensordata')

ws.on('open', () =>{
    ws.send('ok')
})

ws.on('message', (msg) => {
    console.log('客户端：' + msg);
})

ws.on('close', () => {
    ws.close()
})

ws.on('error', (err) => {
    console.error(err)
})
