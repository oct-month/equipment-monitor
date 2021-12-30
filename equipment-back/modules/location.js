class Location {
    /**
     * 装备定位
     * @constructor
     * @param {String} _id 
     * @param {String} equip_id 装备id
     * @param {Date} time 定位的时间
     * @param {Number} longitude 经度
     * @param {Number} latitude 纬度
     */
    constructor(_id, equip_id, time, longitude, latitude) {
        this._id = _id
        this.equip_id = equip_id
        this.time = time
        this.longitude = longitude
        this.latitude = latitude
    }
}

module.exports = Location
