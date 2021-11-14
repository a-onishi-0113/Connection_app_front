<template>
    <div>   
        <v-dialog
            v-model='dialogstatus'
            @click:outside="close()"
        >
        <v-card elevation="2">
            <v-card-title class="white--text mt-8">
                <v-avatar size="56" @click="userPageMove(post)" >
                    <v-img :src="currentUser.avatar_url" />
                </v-avatar>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-card-title>
        <v-card-title>
        {{post.formatted_address}}<br>
        {{post.content}}<br>
        </v-card-title>
        <imagesView
          :images = 'this.post.images_url'
        />
        
        <googleMaps />
        <v-card-actions>
        
        <postOption
            v-if = 'currentUser.id = post.user_id'
          :post = 'post'
        />
        <comment
            :post = 'post'
        />
        <like 
            :post = 'post'
        />
        <v-btn @click="console()">ビューコンソール</v-btn>
        </v-card-actions>

        </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import postOption from '~/components/postOption.vue'
import comment from '~/components/comment.vue'
import like from '~/components/like.vue'
import imagesView from '~/components/imagesView.vue'
import googleMaps from '~/components/posts/googleMap.vue'
export default {
    props: {
        post: {
            type: Object,
            required: true,
        },
        dialog: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            dialogstatus: this.dialog,
            isLike: false
        }
    },

    components: {
        postOption: postOption,
        comment: comment,
        like: like,
        imagesView: imagesView,
        googleMaps: googleMaps,
    },

    created() {
        console.log(this.userPost)
        console.log(this.post)
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
        close() {
            this.$emit('closeDialog')
        },
        console() {
            console.log(this.post)
            console.log(this.$route.path)

        },
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
        moveUserPage() {
            this.$router.push('search')
        },
    },
}
</script>