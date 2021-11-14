<template>
    <div>
    <v-btn @click="like()">
    <v-icon>{{thumbUp}}</v-icon>
    </v-btn>
    <br>
    <v-btn @click="transe()">いいね切り替え</v-btn>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            thumbUp: null,
            id: 1
        }
    },

    created() {
        if (this.post.isliked = true) {
            this.thumbUp =  "mdi-thumb-up"
        }else {
            this.thumbUp = "mdi-thumb-up-outline"
        }
    },

    methods: {
        ...mapActions({
            createLike: 'modules/post/createLike',
            deleteLike: 'modules/post/deleteLike',
        }),
        async like() {
            if (this.thumbUp == "mdi-thumb-up-outline") {
                this.thumbUp = "mdi-thumb-up"
                const like = {
                    user_id: this.$store.state.modules.user.data.id, 
                    post_id: this.post.id, 
                    uid: this.$store.state.modules.user.data.uid,
                }
                const res = await this.$axios.post(`/api/v1/likes`, {like})
                this.createLike
                console.log(res)
            }else if (this.thumbUp == "mdi-thumb-up") {
                this.thumbUp = "mdi-thumb-up-outline"
                const like = {
                    user_id: this.$store.state.modules.user.data.id, 
                    post_id: this.post.id, 
                    uid: this.$store.state.modules.user.data.uid,
                }
                const res = await this.$axios.delete(`/api/v1/likes/${this.post.id}`, {params: like})
                this.deleteLike
                console.log(res)
            }
        },

        console() {
            console.log(this.postId)
        },

        transe() {
            if (this.thumbUp == "mdi-thumb-up") {
                this.thumbUp = "mdi-thumb-up-outline"
            }else if  (this.thumbUp == "mdi-thumb-up-outline") {
                this.thumbUp = "mdi-thumb-up"
            }
        }
    }
}
</script>