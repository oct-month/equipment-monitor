const log4js = require('log4js')

log4js.configure({
    appenders: {
        monitor: {
            type: 'file',
            filename: 'logs/monitor.log'
        }
    },
    categories: {
        default: {
            appenders: ['monitor'],
            level: 'debug'
        }
    }
})

module.exports = log4js.getLogger('monitor')
