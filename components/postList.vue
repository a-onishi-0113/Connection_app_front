<template>
    <div>
    <div v-show='select'>
    <v-list>
    <v-list-item v-for="post in posts" :key = 'post.id'>
    <v-card width="400">
        <v-list-item-title>
        <v-avatar @click="userPageMove(post)">
        <v-img 
            :src="currentUser.avatar_url" 
            :alt="'~/assets/pazdora.png'"
            
        />
        </v-avatar>
        {{post.formatted_address}}<br>
        {{post.content}}<br>    
        <imagesView
            :images = 'post.images_url'
        />    
        <v-btn @click="detail(post)">詳細</v-btn>
        </v-list-item-title>
    </v-card>
    </v-list-item>
    </v-list>
    <postView
      v-if = 'openDialog'
      :post = 'this.post'
      :dialog = 'this.openDialog'
      @closeDialog = 'closeDialog'
    />
    </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import postView from '~/components/postView2.vue'
import imagesView from '~/components/imagesView.vue'
export default {
    props: {
        posts: {},
        avatarUrl:{},
    },
    data() {
        return {
            select: true,
            openDialog: false,
            post: null,
            dialog: false,
        }
    },

    components: {
        postView,
        imagesView
    },

    computed: {
        ...mapGetters({
            userPost: 'modules/post/post',
            currentUser: 'modules/user/data',
            otherUser: 'modules/otherUser/data',
            isAuthenticated: 'modules/user/isAuthenticated'
        }),
    },

    methods: {
        ...mapActions({
            getPost: 'modules/post/getPost',
        }),
        userPageMove(post){
            if (this.$route.path == '/home') {
                this.$emit('select')
                this.$router.push({ path: `/home`})

            } else {
                console.log(post)
                const user_id = post.user_id
                this.$emit('select')
                this.$router.push({ path: `/${user_id}` })
            }
        },
        async detail(value) {
            await this.getPost(value)
            this.openDialog = true
            console.log(this.userPost)
            this.post = this.userPost
            // if (this.$route.path == '/home') {
            //    const url = this.$route.path
            //     console.log(url)
            //     this.$emit('postId',post.id,post)
            //     this.$router.push({ path: `/home`, query: { postId: post.id } })

            // } else {
            //     const url = post.user_id
            //     console.log(url)
            //     this.$emit('postId',post.id,post)
            //     this.$router.push({ path: `/${url}`, query: { postId: post.id } })
            // }
        },
        closeDialog(closeDialog) {
            this.openDialog = false
            this.post = null
        },

        console() {
            console.log(this.$route.path)
        }

    }
}
</script>