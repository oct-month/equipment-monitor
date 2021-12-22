function Location(id, equip_id, time, longi, lati) {
    this.id = id
    this.equip_id = equip_id
    this.time = time
    this.longitude = longi
    this.latitude = lati
}

// 示例
// locations = {
//     0: {
//         id: 0,
//         equip_id: 0,
//         time: '2020-12-12 08:45:24.445',
//         longitude: 108.90838600225533,
//         latitude: 34.28705836870169
//     },
//     1: {
//         id: 2,
//         equip_id: 1,
//         time: '2020-12-12 08:45:24.445',
//         longitude: 108.90838600225533,
//         latitude: 34.28705836870169
//     }
// }

export default {
    state: {
        locations: {}
    },
    getters: {
        locations(state, equip_id) {
            return state.locations[equip_id]
        }
    },
    mutations: {
        setLocation(state, { id, equip_id, time, longitude, latitude }) {
            state.locations[equip_id] = new Location(id, equip_id, time, longitude, latitude)
        }
    },
    actions: {
        setLocation({ commit }, location) {
            commit('setLocation', location)
        }
    }
}
