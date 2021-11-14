<template>
    <div>
    <v-dialog 
    v-model='dialogstatus'
    @click:outside="close()"
    >
        <v-card>
        <v-card-title>
          <div>退会</div>
        </v-card-title>
        <v-card-text>
          <p>退会しますか？</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="close()">閉じる</v-btn>
          <v-btn @click="confirm">確認</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
import firebaseApp from "@/plugins/firebase"
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    props: {
        dialog: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            dialogstatus: this.dialog
        }
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
        close() {
            this.$emit('closeDialog')
        },
        async confirm() {
         this.$emit('closeDialog',false)
        const user = await firebaseApp.auth().currentUser
        console.log(user)
        user.delete()
        const userInfo = {
            id: this.currentUser.id,
            uid: this.currentUser.uid
        }
        await this.$axios.delete(`api/v1/users/${this.currentUser.id}`,{ params: {uid: this.currentUser.uid} })
         .then((res) => {
             console.log(res)
         })
         .catch((error) => {
             console.log(error)
         })
         console.log(user)
        },
    },
}
</script>