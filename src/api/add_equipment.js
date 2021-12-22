// 添加装备信息api
import request from '@/utils/request'

export function addEquipment(data) {
    return request({
        url: '/api/equip',
        method: 'POST',
        data: data
    })
}
