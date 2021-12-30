const { generatorToken, verifyToken } = require('../utils/login')

var tk = generatorToken({
    username: 'sun',
    date: new Date()
})

setTimeout(() => {
    var res = verifyToken(tk)
    console.log(res)
}, 700)
