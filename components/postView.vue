<template>
    <div>
        <v-card elevation="2" width="500">
         <v-img
          height="200px"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        >
        <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

            <v-toolbar-title class="text-h6 white--text pl-0">
              Messages
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
              color="white"
              icon
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>
             <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img
                alt="user"
                src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
              >
            </v-avatar>
            <p class="ml-3">
              John Doe
            </p>
          </v-card-title>
        </v-img>
        <v-card-title>
        <v-avatar @click="userPageMove(post)" style=""  size="56">
        <v-img :src="avatarUrl" />
        </v-avatar>
        {{post.formatted_address}}<br>
        {{post.content}}<br>
        </v-card-title>
        <v-card-actions>
        <imagesView
          :images = 'this.post.images_url'
        />
        <postOption
          :postId = 'post.id'
        />
        <comment
          :postId = 'post.id'
        />
        <like 
          :postId = 'post.id'
        />
        <v-btn @click="userPageMove(post)">ユーザーページに移動</v-btn>
        <v-btn @click="console()">ビューコンソール</v-btn>
        </v-card-actions>

        </v-card>
    </div>
</template>

<script>
import postOption from '~/components/postOption.vue'
import comment from '~/components/comment.vue'
import like from '~/components/like.vue'
import imagesView from '~/components/imagesView.vue'
export default {
    props: {
        post: {
    
        },
        avatarUrl: {

        },
    },
    components: {
        postOption: postOption,
        comment: comment,
        like: like,
        imagesView: imagesView,
    },
    data() {
        return {

        }
    },

    // computed: {
    //     post_id: this.$route.query.postId
    // },
    methods: {
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
        }
    },
}
</script>