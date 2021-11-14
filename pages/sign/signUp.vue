<template>
    <div>
    <ValidationObserver
      v-slot="{ invalid }"
    >
      <v-form>
        <p v-if="error" class="errors">{{ error }}</p>
        <TextFieldWithValidation
          v-model="name"
          label="名前"
          rules="max:20|required"
        />
        <TextFieldWithValidation
          v-model="email"
          label="メールアドレス"
          rules="max:255|required|email"
        />
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
            block
            class="mx-auto white--text mt-4"
            :disabled="invalid"
            @click="signUp"
          >新規登録
          </v-btn>
        </v-row>
      </v-form>
    </ValidationObserver>
    </div>
</template>

<script>
import firebaseApp from '@/plugins/firebase';
import firebase from '~/plugins/firebase'
import { mapState, mapMutations, mapActions } from 'vuex'
import TextFieldWithValidation from '~/components/TextFieldWithValidation.vue'

export default {
  layout: 'welcome',

  components: {
    TextFieldWithValidation
  },
  data() {
    return {
      name:'',
      email:'',
      password:'',
      passwordConfirm:'',
      show1: false,
      show2: false,
      error: null,
    }
  },

  methods: {
    ...mapActions({
      login: 'modules/user/login',
      loadData: 'modules/user/loadData',
      flash: 'modules/flash/showMessage',
    }),

    async signUp() {
      await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(res => {
          const user = {
            name: this.name,
            email: res.user.email,
            uid: res.user.uid
          }
          this.login(res.user)
            .then(() => {
              this.$axios.$post("http://localhost:3000/api/v1/users", { user })
                .then(res => {
                  this.loadData(user.uid)
                  this.$router.push('/')
                })
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
   
    async taikai() {
      const user = firebaseApp.auth().currentUser
      user.delete()
      .then((res)  => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
       console.log(user)
      await firebase.auth().delete("guest@example.com", "password")
       .then((res) => {
         console.log(res)
       })
       .catch((err) => {
         console.log(err)
       })
    },
    console() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.isLogin = true;
        this.userData = user;
      } else {
        this.isLogin = false;
        this.userData = null;
      };
    });
    }
  },

    
}
    
</script>