<template>
<div>
  <v-container v-if="!this.$store.state.modules.user.data">
  <h1 id="welcome-title">Connection</h1>
      <p id="welcome-subtitle">
        Coonectionを使って地域を盛り上げよう！
      </p>
  <v-carousel>
  <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
      <p>{{this.$store.getters['modules/user/data']}}</p>
  </v-container>
  <v-container v-if="currentUser">
    <p>{{this.$store.getters['modules/user/data']}}</p>
    <v-btn fixed fab bottom right color="#F15B5B" style="bottom: 100px" @click="post()">
    <v-icon color="white">mdi-map-marker-outline</v-icon>
    </v-btn>
      <timeLine 
        :userposts = 'this.posts'
      />
  </v-container>
  <div @click="console()"><v-btn>コンソール</v-btn></div>
</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import timeLine from '~/components/timeLine.vue'
export default {
  components: {
        timeLine: timeLine,
    },

  data() {
    return {
      userdata: null,
      avatar_url: null,
      value: null,
      load: null,
      avatar_url: null,
      items: [
          {
            src: require("@/assets/ayato.jpeg")
          },
          {
            src: require("@/assets/cat.jpeg")
          },
          {
            src: require("@/assets/pazdora.png")
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
          }
      ],
      users: [],
      posts: [],
      content: "",
      loadFollowingUsers: '',
      value: ''
    }
  },
  watch: {
    currentUser(currentUser) {
      if (currentUser !== null && currentUser.avatar_url !== null) {
        this.avatar_url = currentUser.avatar_url
      }
    },
      deep: true, // => trueの場合、ネストされたオブジェクトも監視
      immediate: false // => trueの場合、初期読み込み時にも呼び出す
  },

  async mounted() {
    console.log(123412414)
  },
  created() {

    },
    computed: {
        ...mapGetters({
            userPosts: 'modules/post/posts',
            currentUser: 'modules/user/data',
            otherUser: 'modules/otherUser/data',
            isAuthenticated: 'modules/user/isAuthenticated'
        }),
    },
  methods: {
    signUp() {
      this.$router.push('sign/signUp')
    },

    signIn() {
      this.$router.push('sign/signIn')
    },


    console() {
      console.log(process.env.GUEST_EMAIL)
      // console.log(this.$config.baseURL)
      // console.log(this.isAuthenticated)
            // // console.dir(this.$store.getters['modules/user/data'])
            // console.dir(this.$store.state.modules.user.data)
            // console.log(this.$store.getters['modules/user/user'])
    },
    hoge() {
      console.log('hoge')
    },
      ...mapActions({
            getPosts: 'modules/post/getPosts',
            flash: 'modules/flash/showMessage',
            logout: 'modules/user/logout',
        }),
        
        async detail(post) {
            const user_id = post.user_id
            const post_id = post.id
            this.$router.push(`${user_id}/${post_id}`)
        },
        mypage() {
            const user_id = this.$store.state.modules.user.data.id
            this.$router.push(`${user_id}`)
        },
        post() {
         this.$router.push('/post')
        },

    
    
  }
}
</script>
<style scoped>
#welcome {
  background-color: #00ACC1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 250px;
  color: white;
  text-align: center;
}

#welcome-title {
  margin-top: 40px;
  font-size: 2.4em;
}
</style>
