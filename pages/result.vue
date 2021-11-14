<template>
    <div>
    <div>
    <button @click='console()'>
    コンソール
    </button>
    <postList
        :posts = 'this.resultMaps'
        v-if="resultMaps"
    />
    </div>
    <div>
    <userList
        :users = 'this.resultUsers'
        v-if="resultUsers"
    />
    </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import userList from '~/components/userList.vue'
import postList from '~/components/postList.vue'
export default {
    data() {
        return{
            users: [],
            posts: [],
            flag: null
        }
    },
    components: {
        userList: userList,
        postlist: postList,
    },

    created() {
        console.log(this.$store.state.modules.search.data)
        this.users = this.$store.state.modules.search.data
        this.posts = this.$store.state.modules.search.data
        this.flag = this.$store.state.modules.search.flag
    },

    computed: {
        ...mapGetters({
            userPosts: 'modules/post/posts',
            currentUser: 'modules/user/data',
            otherUser: 'modules/otherUser/data',
            isAuthenticated: 'modules/user/isAuthenticated',
            resultUsers: 'modules/search/usersData',
            resultMaps: 'modules/search/mapsData',
        }),
    },

    methods: {
        console() {
            if (this.resultUsers) {
                console.log(this.resultUsers)
            }else if (this.resultMaps) {
                console.log(this.resultMaps)
            }else {
                console.log('検索結果なし')
            }            
        }
    }
}
</script>