class Equipment {
    /**
     * 装备信息
     * @constructor
     * @param {String} _id 
     * @param {String} name 名称
     * @param {String} image 图片路径
     * @param {String} info 描述信息
     * @param {String} token 用于设备与平台通信的token
     */
    constructor(_id, name, image, info, token) {
        this._id = _id
        this.name = name
        this.image = image
        this.info = info
        this.token = token
    }

    withoutId() {
        return {
            name: this.name,
            image: this.image,
            info: this.info,
            token: this.token
        }
    }
}

module.exports = Equipment
