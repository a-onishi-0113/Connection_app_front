<template>
    <v-app-bar
        elevation="4"
        app
    >
    <v-row>
    <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

    <v-toolbar-title>
      <n-link to="/"style="color:black; text-decoration:none">
        <h2 class="app-title">Connection</h2>
      </n-link>
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      to="/sign/signin"
      text
      :outlined="true"
    >
      <span>SIGNIN</span>
    </v-btn>
    <v-btn
      to="/sign/signup"
      text
      :outlined="true"
    >
      <span>SIGNUP</span>
    </v-btn>
    <v-menu offset-y v-if='currentUser'>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          fab
          dark
          small
          v-bind="attrs"
          v-on="on"
        >
         <v-avatar size="60">
      <img 
        v-if="currentUser.avatar_url"
        :src="currentUser.avatar_url"
      />
    </v-avatar>
        </v-btn>
      </template>
      <v-list>
      <v-list-item
          v-for="(menu, index) in menus"
          :key="index"
        >
          <v-list-item-title><button @click='menuOption(menu.title)'>{{ menu.title }}</button></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <signout 
      v-if = 'this.menus[0].dialog'
      :dialog = 'this.menus[0].dialog'
      @closeDialog = 'closeDialog'
    />
    <quit
      v-if = 'this.menus[1].dialog'
      :dialog = 'this.menus[1].dialog'
      @closeDialog = 'closeDialog'
    />
    <v-icon @click='moveSearch'>
        mdi-magnify
      </v-icon>
    </v-row>
    </v-app-bar>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import signout from '~/components/signout.vue'
import quit from '~/components/quit.vue'
export default {
  components: {
    signout: signout,
    quit: quit,
  },
  data () {
    return {
      avatar_url:null,
      menus: [
        {
          title:'サインアウト',
          dialog:false
        },
        {
          title:'退会',
          dialog: false
        },
        {
          title:'設定',
          dialog: false
        },
      ],
      }
    },
    watch:  {
      currentUser(currentUser) {
        if (currentUser !== null && currentUser.avatar_url !== null) {
          this.avatar_url = currentUser.avatar_url
        }
      },
        deep: true, // => trueの場合、ネストされたオブジェクトも監視
        immediate: false // => trueの場合、初期読み込み時にも呼び出す
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
      closeDialog(closeDialog) {
        this.menus[0].dialog = false
        this.menus[1].dialog = false
      },

      menuOption(value) {
        if (value == 'サインアウト') {
          this.menus[0].dialog = true
        }else if (value == '退会') {
          this.menus[1].dialog = true
        }else {
          this.$router.push('/edit')
        }
      },

      moveSearch() {
        this.$router.push('/search')
      },

      console(dialog) {
        console.log(dialog)
      }
    }

}
</script>