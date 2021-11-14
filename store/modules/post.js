
export const state = () => ({
    posts: {},
    post: {},
    data: {}
})

export const getters = {
    data (state) {
        return state.data
    },

    posts (state) {
        return state.posts
    },

    post (state) {
        return state.post
    }
    
}

export const mutations = {
    setData (state, payload) {
        state.data = payload
    },
    setPosts(state, payload) {
        state.posts = payload
    },
    setPost(state, payload) {
        state.post = payload
    },
    addComment(state,payload) {
        console.log(state.post)
        console.log(state.post.post_comments)
        state.post.post_comments.push(payload.data)
        console.log(state.post.post_comments)
    },
    deleteComment(state,payload) {
        state.post.post_comments.filter(payload.data)
    }
}

export const actions = {
    async getPosts({ rootState,state,commit }) {
        console.log(state.posts)
        console.log(rootState)
        const user_id = rootState.modules.user.data.id
        const postdata = await this.$axios.$get(`http://localhost:3000/api/v1/posts?user_id=${user_id}`)
        console.log(postdata)
        commit('setPosts', postdata)
    },

    async getPost ({rootState,commit}, data) {
        const post_id = data.id
        const postdata = await this.$axios.$get(`http://localhost:3000/api/v1/posts/${post_id}`)
        console.log(postdata)
        postdata.isLiked = false
        postdata.liked_users.forEach (function( value )  {
            if (rootState.modules.user.data.id = value.id ) {
                postdata.isLiked = true
            }
        })
        commit('setPost',postdata)
    },

    createLike({state,commit}) {
        state.post.isLiked = true
        commit('setPost',postdata)
    },

    deleteLike({state,commit}) {
        state.post.isLiked = false
        commit('setPost',postdata)
    },

    createComment({rootState,state,commit},comment) {
        console.log(comment)

        commit('addComment',comment)
    },

    deleteComment({commit,state},comment) {
        state.post.comments.filter
        commit('celeteComment', comment)
    },

    

}