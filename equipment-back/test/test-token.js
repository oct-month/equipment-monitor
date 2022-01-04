const { generatorToken, verifyToken } = require('../utils/token')

var tk = generatorToken({
    username: 'sun',
    date: new Date()
})

setTimeout(() => {
    var res = verifyToken(tk)
    console.log(res)
}, 700)
