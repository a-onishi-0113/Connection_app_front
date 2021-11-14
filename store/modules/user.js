import firebaseApp from "@/plugins/firebase"
import firebase from '~/plugins/firebase'
import UniversalCookie from 'universal-cookie'

function getDefaultState() {
  
  return {
    user:null,
    data:null,
  }
}

export const state = () => ({
    user:null,
    data:null,
})

export const getters = {
  user (state) {
    return state.user
  },

  data (state) {
    return state.data
  },

  isAuthenticated(state) {
    return !!state.user && !!state.user.uid
  },
}

export const mutations = {
    setUser (state, user) {
        state.user = user
    },
      
    setData (state, payload) {
        state.data = payload
    },
    
    setAdmin (state, payload) {
        state.data.admin = payload
    },
    clearAuthData(state) {
      Object.assign(state, getDefaultState())
    },
    
}

export const actions = {

  async login({ dispatch }, user) {
    const cookie = new UniversalCookie()
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isLogin = true;
          this.userData = user;
        } else {
          this.isLogin = false;
          this.userData = null;
        }
    })
    await firebaseApp.auth().currentUser.getIdToken(true)
      .then ((res) => {
        cookie.set('access_token', res)
      })
      .catch ((err) => {
        console.log(err)
      })
        
    const userInfo = {
      email: user.email,
      uid: user.uid
    }
    await dispatch('setUser', userInfo)
    await dispatch('loadData', userInfo.uid)
  },

  logout({commit}, payload) {
    const cookie = new UniversalCookie()
    cookie.remove('access_token')
    commit('clearAuthData')
  },

  setUser({commit}, user) {
    commit('setUser', user)     
  },

  async guestLogin({ dispatch }) {
    // ユーザーが故意にCookieを削除した場合の例外対策
    // 前回ログインしていたFirebaseAuthenticationのログイン情報をブラウザから削除
    console.log(111111)
    firebaseApp.auth().signOut()

    const userInfo = {
      email: process.env.GUEST_EMAIL,
      uid: process.env.GUEST_UID
    }
    console.log(userInfo.email)
    await dispatch('setUser', userInfo)
    await dispatch('loadData', userInfo.uid)
  },

  async loadData ({ commit }, payload) {
    try {   
      let data = await this.$axios.$get(`/api/v1/users?uid=${payload}`)
      console.log(data)
      data = await this.$axios.$get(`/api/v1/users/${data.id}`)
      console.log(data)
      commit('setData', data)
    } catch (e) {
      console.log(e)
    }
  },
}