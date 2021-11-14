<template>
    <div>
    <ValidationObserver
      v-slot="{ invalid }"
    >
        <v-form>
            <p v-if="error" class="errors">{{ error }}</p>
        <TextFieldWithValidation
          v-model="email"
          label="メールアドレス"
          rules="max:255|required|email"
        />
        <v-row justify="center">
          <v-btn
            color="success"
            class="mx-auto white--text mt-4"
            :disabled="invalid"
            @click="changeEmail"
          >メールアドレス変更
          </v-btn>
        </v-row>
        </v-form>
    </ValidationObserver>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import firebaseApp from "@/plugins/firebase";
import TextFieldWithValidation from '~/components/TextFieldWithValidation.vue'

export default {
    props: {
        userId: null,
    },
    data() {
        return {
            email: null,
            error: null,
        }
    },

    components: {
        TextFieldWithValidation
    },

    methods: {
        ...mapActions({
            setLoading: 'modules/info/setLoading',
            setFlash: 'modules/info/setFlash',
            flash: 'modules/flash/showMessage',
        }),
        
        async changeEmail() {
            const user = await firebaseApp.auth().currentUser
            user.updateEmail(this.email)
            .then(() => {
            this.$axios.$patch(`/api/v1/users/${this.userId}`, {user:{email:this.email,uid:this.$store.state.modules.user.user.uid}})
                .then((res) => {
                    this.flash(
                        {
                            message: "メールアドレスの変更に成功しました.",
                            type: "sucess",
                            status: true,
                        },
                            { root: true } // 他のvuexモジュールから呼び出すときにつける
                        )
                })
                .catch((error) => {
                    console.log(error)
                this.setFlash({
                    status: true,
                    message: "メールアドレスの変更に失敗しました。"
                })
                setTimeout(() => {
                    this.setFlash({
                    status: false,
                    message: ""
                    })
                }, 2000)
                })

            })
        }

    }
}
</script>