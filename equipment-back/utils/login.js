const jwt = require('jsonwebtoken')

const { privateKey, publicKey } = require('../config')
const logger = require('./logger')

/**
 * 生成Token
 * @param {Object} payload
 * @returns {String} token
 */
function generatorToken(payload) {
    return jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '7d'     // 7天过期
    })
}

/**
 * 验证Token
 * @param {String} token 
 * @returns {Object|null} 原payload
 */
function verifyToken(token) {
    if (token) {
        try {
            return jwt.verify(token, publicKey)
        }
        catch (err) {
            logger.error(err)
        }
    }
    return null
}

module.exports = {
    generatorToken,
    verifyToken
}
