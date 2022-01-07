const log4js = require('log4js')

log4js.configure({
    appenders: {
        monitor: {
            type: 'file',
            filename: 'logs/monitor.log'
        },
        console: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['monitor', 'console'],
            level: 'debug'
        }
    }
})

module.exports = log4js.getLogger('monitor')
