<template>
    <div>
    <ValidationObserver
      v-slot="{ invalid }"
    >
      <v-form>
        <p v-if="error" class="errors">{{ error }}</p>
        <TextFieldWithValidation
          v-model="password"
          label="パスワード"
          rules="required|min:6"
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          vid="password"
        />
        <TextFieldWithValidation
          v-model="passwordConfirm"
          label="パスワード(再入力)"
          rules="required|min:6|confirmed:パスワード"
          :type="show2 ? 'text' : 'password'"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show2 = !show2"
        />
        <v-row justify="center">
          <v-btn
            color="success"
            class="mx-auto white--text mt-4"
            :disabled="invalid"
            @click="changePassword"
          >パスワード変更
          </v-btn>
        </v-row>
      </v-form>
    </ValidationObserver>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import firebaseApp from "@/plugins/firebase"
import TextFieldWithValidation from '~/components/TextFieldWithValidation.vue'

export default {
    data() {
        return {
            password: null,
            passwordConfirm: null,
            show1: false,
            show2: false,
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
        async changePassword() {
            const user = await firebaseApp.auth().currentUser
            user.updatePassword(this.password)
            .then(() => {
                    this.flash(
                        {
                            message: "パスワードの変更に成功しました.",
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
                    message: "パスワードの変更に失敗しました。"
                })
                setTimeout(() => {
                    this.setFlash({
                    status: false,
                    message: ""
                    })
                }, 2000)
            })
        }
    }
}
</script>

