const { ObjectId } = require("mongodb")

class Monitoring {
    /**
     * 装备监测信息
     * @constructor
     * @param {{?id: String, ?_id: ObjectId, equip_id: String, ?time: Date, ?content: Object}} obj 
     */
    constructor(obj = {}) {
        /**
         * @type {String}
         */
        this.id = (obj._id || obj.id || '').toString()
        /**
         * @type {String} 装备id
         */
        this.equip_id = obj.equip_id
        /**
         * @type {Date} 信息生成时间
         */
        this.time = obj.time || new Date()
        /**
         * @type {Object} 监测信息
         */
        this.content = obj.content || {}
    }

    withoutId() {
        return {
            equip_id: this.equip_id,
            time: this.time,
            content: this.content
        }
    }
}

// content 示例
var content = {
    temperature: 34.6,      // 温度
    humidity: 0.67,         // 湿度
    voltage: 220,           // 电压
    current: 4,             // 电流
}

module.exports = Monitoring
