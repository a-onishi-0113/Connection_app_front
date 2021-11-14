<template>
    <div>
     <flash />
      <ValidationObserver v-slot="{ invalid }">
        <v-form>
          <p v-if="error" class="errors">{{ error }}</p>
          <TextFieldWithValidation
            v-model="email"
            label="メールアドレス"
            rules="max:255|required|email"
            fieldname="お名前"
          />
          <TextFieldWithValidation
            v-model="password"
            label="パスワード"
            rules="required|min:6"
            :type="show1 ? 'text' : 'password'"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show1 = !show1"
            vid="password"
            fieldname="メールアドレス"
          />
          <v-row justify="center">
            <v-btn
              color="success"
              class="mx-auto white--text mt-4"
              :disabled="invalid"
              @click="signIn"
            >
              ログイン
            </v-btn>
          </v-row>
          <v-row justify="center">
            <v-btn
              color="green"
              class="mx-auto white--text mt-4"
              @click="guestSignIn"
            >
              ゲストユーザーとしてログイン
            </v-btn>
          </v-row>
        </v-form>
      </ValidationObserver>
  </div>
    </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapState, mapMutations, mapActions } from 'vuex'
import flash from '~/components/flash.vue'
import TextFieldWithValidation from '~/components/TextFieldWithValidation.vue'

export default {
  layout: 'welcome',
  components: {
      flash: flash,
      TextFieldWithValidation
  },
  data() {
    return {
      email:'',
      password:'',
      userdata:'',
      show1: false,
      error: null
    }
  },

  methods: {
    ...mapActions({
      login: 'modules/user/login',
      loadData: 'modules/user/loadData',
      flash: 'modules/flash/showMessage',
      guestLogin: "modules/user/guestLogin",
    }),

    async signIn() {
      await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then (res => {
          console.log(res)
          this.login(res.user)
            .then(() => {
              this.$router.push('/')
              this.flash(
                {
                  message: "ログインに成功しました.",
                  type: "sucess",
                  status: true,
                },
                  { root: true } // 他のvuexモジュールから呼び出すときにつける
              )
            })
        })
        .catch(err => {
            console.log(err)
            switch (err.code) {
              case "auth/invalid-email":
                this.setError("メールアドレスが間違っています。")
                return
              case "auth/email-already-in-use":
                this.setError("そのメールアドレスは使われています。")
                return
              case "auth/wrong-password":
                this.setError("パスワードが間違っています。")
                return
              case "auth/weak-password":
                this.setError("パスワードは最低6文字以上にしてください")
                return
              default:
                this.setError("メールアドレスとパスワードを確認してください。")
                return
              }
        })     
      },

      setError(errmsg) {
        console.log(errmsg)
        this.flash(
          {
            message: errmsg,
            type: "warn",
            status: true,
          },
            { root: true } // 他のvuexモジュールから呼び出すときにつける
        )
      },
      async guestSignIn() {
        this.guestLogin()
        .then (() => {
          console.log('ゲストログイン')
              this.$router.push('/')
              this.flash(
                {
                  message: "ログインに成功しました.",
                  type: "sucess",
                  status: true,
                },
                  { root: true } // 他のvuexモジュールから呼び出すときにつける
                )
            })
            .catch(err => {
              console.log(err)
              if (err.code = 'auth/invalid-email') {
                this.flash(
                {
                  message: "メールアドレスが間違っています。",
                  type: "warn",
                  status: true,
                },
                  { root: true } // 他のvuexモジュールから呼び出すときにつける
                )
              }else if (err.code = 'auth/wrong-password') {
                this.flash(
                {
                  message: "パスワードが間違っています。",
                  type: "warn",
                  status: true,
                },
                  { root: true } // 他のvuexモジュールから呼び出すときにつける
                )
              } 
            })     

      }
    }
}
</script>