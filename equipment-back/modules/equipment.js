const { ObjectId } = require("mongodb")

class Equipment {
    /**
     * 装备信息
     * @constructor
     * @param {{?id: String, ?_id: ObjectId, ?name: String, ?image: String, ?info: String, ?position: Array[Number], ?positionLn: Number, ?positionLa: Number, ?token: String}} obj 
     */
    constructor(obj = {}) {
        /**
         * @type {String}
         */
        this.id = (obj.id || obj._id || '').toString()
        /**
         * @type {String} 名称
         */
        this.name = obj.name || ''
        /**
         * @type {String} 图片路径
         */
        this.image = obj.image || ''
        /**
         * @type {String} 描述信息
         */
        this.info = obj.info || ''
        /**
         * @type {Array[Number]} 定位
         */
        if (obj.position && obj.position.length === 2) {
            this.position = obj.position
        }
        else {
            this.position = [obj.positionLn, obj.positionLa]
        }
        /**
         * @type {String} 用于设备与平台通信的token
         */
        this.token = obj.token || ''
    }

    withoutToken() {
        return {
            id: this.id,
            name: this.name,
            image: this.image,
            info: this.info,
            position: this.position
        }
    }

    withoutId() {
        return {
            name: this.name,
            image: this.image,
            info: this.info,
            position: this.position,
            token: this.token
        }
    }

    dbData() {
        return {
            name: this.name,
            image: this.image,
            info: this.info,            
            positionLn: this.position[0],
            positionLa: this.position[1],
            token: this.token
        }
    }

    payload() {
        return {
            id: this.id,
            name: this.name
        }
    }
}

module.exports = Equipment
