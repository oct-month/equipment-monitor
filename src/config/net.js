const net = {
    // 后端接口地址
    ApiURL: process.env.NODE_ENV === 'development'
        ? 'http://127.0.0.1:8080'
        : '',
    // 后端数据默认接收方式
    contentType: 'application/json;charset=UTF-8',
    // 请求超时
    requestTimeout: 5000,
    // 正常code
    successCode: 200,
    // 未登录或登录失效code
    invalidCode: 402,
    // 无权限code
    noPermissionCode: 401,
    // 其他错误
    errorCode: 404
}

module.exports = net
