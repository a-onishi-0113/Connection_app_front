<template>
    <div>
      <postView
        :post = 'this.post'
        :avatarUrl = 'avatar_url'
        @select = 'getlist'
        v-show='view_select'
        v-if="this.post"
      />
      <postList
        :posts = 'this.posts'
        :avatarUrl = 'avatar_url'
        @postId = 'getPost'
        v-show='list_select'
        v-if="this.post"
      />
      <v-btn　@click="console()">コンソール</v-btn>
        
    </div>
</template>

<script>
import postList from '~/components/postList.vue'
import postView from '~/components/postView.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      post: {},
      posts: {},
      Id: "",
      avatar_url: this.$store.state.modules.user.data.avatar_url,
      list_select: true,
      view_select: false,
    }
  },

  computed: {
    ...mapGetters({
      currentUser: 'modules/user/data',
      otherUser: 'modules/otherUser/data',
    }),
  },
    async created() {
        console.log(this.$store.state.modules.user.data.id)
        const user_id = this.$store.state.modules.user.data.id
        const data = await this.$axios.$get(`http://localhost:3000/api/v1/posts?user_id=${user_id}`)
        console.log(data)
        this.posts = JSON.parse(JSON.stringify(data))
        console.log(typeof(this.posts))
        console.log(this.posts)
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
      console() {
        console.log(typeof(this.posts))
        console.log(this.$route.path)
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