export default {
    state: {
        errorLogs: []
    },
    getters: {
        errorLogs(state) {
            return state.errorLogs
        }
    },
    mutations: {
        addErrorLog(state, errorLog) {
            state.errorLogs.push(errorLog)
        },
        clearErrorLog(state) {
            state.errorLogs.splice(0)
        }
    },
    actions: {
        addErrorLog({ commit }, errorLog) {
            commit('addErrorLog', errorLog)
        },
        clearErrorLog({ commit }, errorLog) {
            commit('clearErrorLog', errorLog)
        }
    }
}
