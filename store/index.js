import firebase from '~/plugins/firebase'
import {getUserFromCookie, getUserFromSession} from '@/helpers'

export const state = () => ({

})

export const getters = {

}

export const mutations = {

}
export const actions = {
    async nuxtClientInit ({ commit, state, dispatch }, { app }) {
        const user = getUserFromCookie(app)
        console.log(user)
            if (user) {
            await dispatch('modules/user/setUser', { email: user.email, uid: user.user_id })
            await dispatch('modules/user/loadData', user.user_id )
            console.log("Cookieでログインしました。")
        }
    },
}