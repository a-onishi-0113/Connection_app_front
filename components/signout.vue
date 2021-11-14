<template>
    <div>
    <v-dialog 
    v-model='dialogstatus'
    @click:outside="close()"
    >
        <v-card>
        <v-card-title>
          <div>サインアウト</div>
        </v-card-title>
        <v-card-text>
          <p>サインアウトしますか？</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="close()">閉じる</v-btn>
          <v-btn @click="signOut()">確認</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
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
    methods: {
        ...mapActions({
            flash: 'modules/flash/showMessage',
            logout: 'modules/user/logout',
        }),
        close() {
            this.$emit('closeDialog')
        },
        confirm() {
        alert('確認しました')
         this.$emit('closeDialog',false)
        },
        async signOut() {
            this.$emit('closeDialog',false)
            await this.logout()
            this.$router.push('/')
        }
    },
}
</script>