<template>
    <div>
      <postList
        :posts = 'this.posts'
        :avatarUrl = 'this.$store.state.modules.otherUser.data.avatar_url'
        @postId = 'getPost'
        v-show='list_select'
      />
      <v-btn　@click="follow()">フォロー</v-btn>
      <v-btn　@click="unFollow()">フォロー解除</v-btn>
      <v-btn　@click="console()">コンソール</v-btn>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import postList from '~/components/postList.vue'
import postView from '~/components/postView.vue'

export default {
  data() {
    return {
      post: {},
      posts: {},
      Id: "",
      list_select: false,
      view_select: false,
    }
  },
  components: {
    postList: postList,
    postView: postView,
  },

  async fetch({ $axios, params, store }) {
    await $axios.$get(`http://localhost:3000/api/v1/users/${params.id}`)
      .then(res => {
        console.log(res)
        store.dispatch('modules/otherUser/setData', res)
        // store.commit('modules/info/setError', false)
        console.log('ok')
      })
      .catch(error => {
        console.log('err')
        // store.commit('modules/info/setError', true)
      })
  },

  computed: {
    ...mapGetters({
      currentUser: 'modules/user/data',
      // isAuthenticated: 'modules/user/isAuthenticated',
      otherUser: 'modules/otherUser/data',
      // error: 'modules/info/error'
    }),
    params() {
      return {
        
        // post: {
        //   content: this.content
        // }
      }
    }
  },
    async created() {
      // if (typeof(this.$route.query.length) = 'undefinend') {

      // }
      console.log(this.$store.state.modules.otherUser.data.id)
      const otherUser_id = this.$store.state.modules.otherUser.data.id
      const data = await this.$axios.$get(`http://localhost:3000/api/v1/posts?otherUser_id=${otherUser_id}`)
      console.log(data)
      this.posts = JSON.parse(JSON.stringify(data))
      console.log(typeof(this.posts))
      console.log(typeof(this.$route.query.length))
      if (typeof(this.$route.query.length) !== 'undefined') {
        console.log('呼び出されてるよ！')
        this.view_select = true
        this.getPost(this.$route.query.postId)
      } else {
        this.list_select = true
      }
    },
    methods: {
      ...mapActions({
        setData: 'modules/otherUser/setData',
      }),
      destroy() {
      const url = `http://localhost:3000/api/v1/posts/${this.$route.params.id}`
      this.$axios.delete(url)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(res)
          console.log(this.params)
        })
      
      },
      back() {
        this.$router.push('/')
      },
      following() {
        this.$router.push({name:'id-following'})
      },
      followerd() {
        this.$router.push({name:'id-followerd'})
      },
      async follow() {
        console.log(this.otherUser.id)
        await this.$axios.$post('http://localhost:3000/api/v1/relationships', {
          user_id: this.currentUser.id,
          follow_id: this.otherUser.id,
          uid: this.$store.state.modules.user.user.uid
        })
        await this.$axios.$get(`http://localhost:3000/api/v1/users/${this.$route.params.id}`)
          .then(res => {
            console.log(res)
            this.setData(res)
        })
      },
      async unFollow() {
        console.log(this.otherUser.id)
        await this.$axios.$delete('http://localhost:3000/api/v1/relationships/delete', {
          params:{
          user_id: this.currentUser.id,
          follow_id: this.otherUser.id,
          uid: this.$store.state.modules.user.user.uid
          }
        })
        await this.$axios.$get(`http://localhost:3000/api/v1/users/${this.$route.params.id}`)
          .then(res => {
            console.log(res)
            this.setData(res)
        })
      },
      console() {
        console.log(this.$store.state.modules.otherUser.data)
        console.log(this.otherUser)
        // console.log()(this.otherUser.following.length)
        console.log(this.$route.query.postId)
        console.log(this.$route.query)
        if (typeof(this.$route.query.length) != 'undefinend') {
          console.log(this.$route.query)
        }
      },
      async getPost(...value) {
        console.log(value)
        this.view_select = true
        this.list_select = false
        const post = await this.$axios.$get(`http://localhost:3000/api/v1/posts/${value}`)
        console.log(post)
        this.post = post  
      },
      getlist() {
        console.log('リスト表示')
        this.view_select = false
        this.list_select = true

      },
    }
}
</script>