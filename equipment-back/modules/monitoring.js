class Monitoring {
    /**
     * 装备监测信息
     * @constructor
     * @param {String} _id 
     * @param {String} equip_id 装备id
     * @param {Date} time 信息生成时间
     * @param {Object} content 监测信息
     */
    constructor(_id, equip_id, time, content) {
        this._id = _id
        this.equip_id = equip_id
        this.time = time
        this.content = content
    }
}

// content 示例
var content = {
    temperature: '34.6',    // 温度
    humidity: '67',         // 湿度
    voltage: '220',         // 电压
    current: '4',           // 电流
}

module.exports = Monitoring
