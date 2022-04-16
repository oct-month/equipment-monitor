const { WebSocket } = require('ws')

const ws = new WebSocket('ws://localhost:8081/api/sensordata')

ws.on('open', () =>{
    // ws.send('你好')
})

ws.on('message', (msg) => {
    console.log('客户端：' + msg);
})
