function Equipment(id, name, image, info) {
    this.id = id
    this.name = name
    this.image = image
    this.info = info
}

// 示例
// equipments = [
//     { id: 0, name: 'test1', image: '/api/image/test1.jpg', info: '测试'},
//     { id: 1, name: 'test2', image: '/api/image/test2.jpg', info: '测试'},
//     { id: 2, name: 'test3', image: '/api/image/test3.jpg', info: '测试'}
// ]

export default {
    state: {
        equipments: []
    },
    getters: {
        equipments(state) {
            return state.equipments
        }
    },
    mutations: {
        addEquipment(state, { id, name, image, info }) {
            state.equipments.push(new Equipment(id, name, image, info))
        }
    },
    actions: {
        addEquipment({ commit }, equipment) {
            commit('addEquipment', equipment)
        }
    }
}
