class Location {
    /**
     * 装备定位
     * @constructor
     * @param {{?_id: String, ?equip_id: String, ?time: Date, ?longitude: Number, ?latitude: Number}} obj 
     */
    constructor(obj = {}) {
        /**
         * @type {String}
         */
        this._id = (obj._id || '').toString()
        /**
         * @type {String} 装备id
         */
        this.equip_id = obj.equip_id || ''
        /**
         * @type {Date} 定位的时间
         */
        this.time = obj.time || new Date()
        /**
         * @type {Number} 经度
         */
        this.longitude = obj.longitude || 0
        /**
         * @type {Number} 纬度
         */
        this.latitude = obj.latitude || 0 
    }

    withoutId() {
        return {
            equip_id: this.equip_id,
            time: this.time,
            longitude: this.longitude,
            latitude: this.latitude
        }
    }
}

module.exports = Location
