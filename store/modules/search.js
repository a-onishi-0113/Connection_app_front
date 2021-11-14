export const state = () => ({
    mapsData: {},
    usersData: {},
    flag: false
})

export const getters = {
    mapsData (state) {
        return state.mapsData
    },

    usersData (state) {
        return state.usersData
    }
}

export const mutations = {
    setFlag (state, payload) {
        state.flag = payload
    },
    setMapsData (state, payload){
        state.mapsData = payload
    },
    setUsersData (state, payload) {
        state.usersData = payload
    } 
}

export const actions = {

    async getMapsResult({commit}, data) {
        var toString = Object.prototype.toString
        console.log(toString.call(data));
        console.log(data)
        if (data.length) {
            commit('setFlag',true)
            commit('setMapsData',data)
        }else {
            commit('setFlag',false)
            commit('setMapsData',data)
        }
    },

    async getUsersResult ({commit}, data) {
        if (data.length) {
            commit('setFlag',true)
            commit('setUsersData',data)
        }else {
            commit('setFlag',false)
            commit('setUsersData',data)
        }
    }
}