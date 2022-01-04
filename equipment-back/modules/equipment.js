class Equipment {
    /**
     * 装备信息
     * @constructor
     * @param {{?_id: String, ?name: String, ?image: String, ?info: String, ?token: String}} obj 
     */
    constructor(obj = {}) {
        /**
         * @type {String}
         */
        this._id = (obj._id || '').toString()
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
         * @type {String} 用于设备与平台通信的token
         */
        this.token = obj.token || ''
    }

    withoutId() {
        return {
            name: this.name,
            image: this.image,
            info: this.info,
            token: this.token
        }
    }

    payload() {
        return {
            _id: this._id,
            name: this.name
        }
    }
}

module.exports = Equipment
