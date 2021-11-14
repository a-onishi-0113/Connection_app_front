<template>
    <div>
    
    <v-icon @click="dialog = true">mdi-close</v-icon> 
    

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>
          <div>削除</div>
        </v-card-title>
        <v-card-text>
          <p>投稿を削除しますか？</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">閉じる</v-btn>
          <v-btn @click="destroy(); dialog = false">削除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            dialog: false,
        }
    },
    methods: {
        destroy() {
        const url = `http://localhost:3000/api/v1/posts/${this.post.id}`
        this.$axios.delete(url)
            .then((res) => {
            console.log(res)
            })
            .catch((err) => {
            console.log(res)
            console.log(this.params)
            })
      },
    }
}
</script>