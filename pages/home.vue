<template>
    <div>
    <v-btn fixed fab bottom right color="#F15B5B" style="bottom: 100px" @click="post()">
    <v-icon color="white">mdi-map-marker-outline</v-icon>
    </v-btn>
    <nuxt-child />
    <NuxtLink to="/search">検索</NuxtLink>
    <NuxtLink to="/">インデックスに移動</NuxtLink>
    <NuxtLink to="/home/edit">エディット</NuxtLink>
    <v-avatar size="80">
            <img 
                v-if="avatar_url"
                :src="avatar_url"
             />
    </v-avatar>
    <div @click="console()"><v-btn>コンソール</v-btn></div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            userdata: null,
            posts: '',
            value: null,
            load: null,
            avatar_url: null,
            
        }
    },
    async fetch({ $axios, params, store }) {

    },
    

    created() {
        console.log(store.state.modules.user.data)
        this.userdata = store.state.modules.user.data
        this.avatar_url = store.state.modules.user.data.avatar_url
        this.followerscount = this.userdata.followers.length
        this.followingcount = this.userdata.following.length
        console.log(this.userdata)
        console.log(this.avatar_url)

    },
    watch: {
        
    },
    computed: {
        ...mapGetters({
            userPosts: 'modules/post/posts',
            currentUser: 'modules/user/data',
            otherUser: 'modules/otherUser/data',
            isAuthenticated: 'modules/user/isAuthenticated'
        }),
    },

    async created() {
        
    },

    methods: {
        
        ...mapActions({
            getPosts: 'modules/post/getPosts',
            flash: 'modules/flash/showMessage',
            logout: 'modules/user/logout',
        }),
        
        post() {
         this.$router.push('/post')
        },
        console() {
            console.log(this.$router)
            console.log(this.isAuthenticated)
            this.flash(
            {
                message: "ログインしました.",
                type: "sucess",
                status: true,
            },
                { root: true } // 他のvuexモジュールから呼び出すときにつける
            )
                    console.log(typeof(this.posts))

        },
    }
}


</script>

