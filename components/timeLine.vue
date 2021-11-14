<template>
    <div>
        <v-container>
        <postList
            :posts = 'this.posts'
            :avatarUrl = 'this.avatar_url'
            @postId = 'getPost'
            v-show='list_select'
        />        
        </v-container>
        <v-btn @click='console()'>コンソール</v-btn>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import postList from '~/components/postList.vue'
export default {
    props: {
        userposts: null,
    },
    components: {
        postList: postList,
    },
    data() {
        return {
            post: null,
            posts: null,
            avatar_url: null,
            list_select: true,
        }
    },

    async mounted() {
        console.log(this.$store.state.modules.user.data.id)
        const user_id = this.$store.state.modules.user.data.id
        const data = await this.$axios.$get(`http://localhost:3000/api/v1/posts?user_id=${user_id}`)
        console.log(data)
        this.posts = data
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

    methods: {
        ...mapActions({
            getPosts: 'modules/post/getPosts',
            flash: 'modules/flash/showMessage',
            logout: 'modules/user/logout',
        }),

        async getPost(...value) {
            this.getPosts()

        },

        console() {
            this.getPosts()
        }

    }
}
</script>