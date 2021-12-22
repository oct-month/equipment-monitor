import Vue from 'vue'
import axios from 'axios'

import config from '@/config'

function handleCode(code, msg) {
    switch(code) {
        case config.successCode:
            break
        case config.invalidCode:
            Vue.prototype.$baseMessage(msg || '未登录或登录失效', 'error')
            // 跳转到login
            break
        case config.noPermissionCode:
            Vue.prototype.$baseMessage(msg || '无权限', 'error')
            // 跳转401
            break
        case config.errorCode:
            Vue.prototype.$baseMessage(msg || `后端接口${code}异常`, 'error')
            // 跳转404
            break
        default:
            Vue.prototype.$baseMessage(msg || `未知${code}异常`, 'error')
            break
    }
}

const instance = axios.create({
    baseURL: config.ApiURL,
    headers: {
        'Content-Type': config.contentType
    }
})

instance.interceptors.request.use(
    (req) => {
        // TODO
    },
    (error) => {}
)

instance.interceptors.response.use(
    (rep) => {},
    (error) => {}
)

export default instance
