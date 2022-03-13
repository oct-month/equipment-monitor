class Equipment {
    /**
     * 装备信息
     * @constructor
     * @param {{?id: String, ?name: String, ?image: String, ?info: String, ?position: Array[Number], ?token: String}} obj 
     */
    constructor(obj = {}) {
        /**
         * @type {String}
         */
        this.id = (obj.id || '').toString()
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
        this.position = obj.position || null
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

    payload() {
        return {
            id: this.id,
            name: this.name
        }
    }
}

module.exports = Equipment
