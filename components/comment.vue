<template>
    <div>
    <commentView
        :post = 'this.post'
    />
    <ValidationObserver
      v-slot="{ invalid }"
    >
      <v-form>
        <p v-if="error" class="errors">{{ error }}</p>
        <TextFieldWithValidation
          v-model="comment"
          label="コメント"
          rules="max:20|required"
        />
        <v-row justify="center">
          <v-btn
            color="success"
            class="mx-auto white--text mt-4"
            :disabled="invalid"
            @click="createComments"
          >コメントする
          </v-btn>
        </v-row>
          </v-form>
    </ValidationObserver>
        <v-btn @click="console()">コメントコンソール</v-btn>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import TextFieldWithValidation from '~/components/posts/TextFieldWithValidation.vue'
import commentView from '~/components/commentView.vue'
export default {
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            comment: null,
            error: null,
        }
    },

    components: {
        TextFieldWithValidation,
        commentView: commentView,
    },

    computed: {
        ...mapGetters({
        currentUser: 'modules/user/data',
        otherUser: 'modules/otherUser/data',
        }),
    },


    methods: {
        ...mapActions({
            createComment: 'modules/post/createComment',
            deleteComment: 'modules/post/deleteComment',
        }),
        async createComments() {
            if (this.comment !== null) {
                var formData = new FormData()
                formData.append('post_comment[comment]',this.comment)
                formData.append('post_comment[post_id]',this.post.id)
                formData.append('post_comment[user_id]',this.currentUser.id)
                formData.append('post_comment[uid]',this.currentUser.uid)
                const config = {
                    headers: {
                    'content-type': 'multipart/form-data'
                    }
                } 
                await this.$axios.post(`http://localhost:3000/api/v1/post_comments`, formData,config)
                .then((res) => {
                    console.log(res)
                    this.createComment(res)
                })
                .catch((error) => {
                    console.log(error)
                })
            }else if (this.comment == null) {
                console.log("コメントを入力してください。")
            }
        },
        console() {
            console.log(this.$store.state.modules.user.data)
        }
    }
}
</script>