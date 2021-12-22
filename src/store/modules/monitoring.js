function Monitoring(id, equip_id, time, tempera, humi, volta, curr) { 
    this.id = id
    this.equip_id = equip_id
    this.time = time
    this.temperature = tempera
    this.humidity = humi
    this.voltage = volta
    this.current = curr
}

// 示例
// monitorings = {
//     0: [
//         { id: 0, equip_id: 0, time: '2021-12-12 08:40:26.445', temperature: 36.5, humidity: 46.5, voltage: 220.0, current: 1.2},
//         { id: 1, equip_id: 0, time: '2021-12-12 08:40:26.445', temperature: 36.5, humidity: 46.5, voltage: 220.0, current: 1.2},
//         { id: 2, equip_id: 0, time: '2021-12-12 08:40:26.445', temperature: 36.5, humidity: 46.5, voltage: 220.0, current: 1.2},
//         { id: 3, equip_id: 0, time: '2021-12-12 08:40:26.445', temperature: 36.5, humidity: 46.5, voltage: 220.0, current: 1.2}
//     ],
//     1: [
//         { id: 4, equip_id: 1, time: '2021-12-12 08:40:26.445', temperature: 36.5, humidity: 46.5, voltage: 220.0, current: 1.2},
//         { id: 5, equip_id: 1, time: '2021-12-12 08:40:26.445', temperature: 36.5, humidity: 46.5, voltage: 220.0, current: 1.2},
//         { id: 6, equip_id: 1, time: '2021-12-12 08:40:26.445', temperature: 36.5, humidity: 46.5, voltage: 220.0, current: 1.2},
//         { id: 7, equip_id: 1, time: '2021-12-12 08:40:26.445', temperature: 36.5, humidity: 46.5, voltage: 220.0, current: 1.2}
//     ]
// }

export default {
    state: {
        monitorings: {}
    },
    getters: {
        monitorings(state, equip_id) {
            return state.monitorings[equip_id]
        }
    },
    mutations: {
        addMonitoring(state, { id, equip_id, time, temperature, humidity, voltage, current }) {
            state.monitorings[equip_id].push(new Monitoring(id, equip_id, time, temperature || 0, humidity || 0, voltage || 0, current || 0))
        }
    },
    actions: {
        addMonitoring({ commit }, monitoring) {
            commit('addMonitoring', monitoring)
        }
    }
}
