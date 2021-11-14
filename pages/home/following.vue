<template>
    <div>
    <p>フォロワーーユーザー</p>
    
    <Component
        :users = 'this.user.following'
    />
    </div>
</template>

<script>
import Component from '~/components/userList.vue'
export default {
    data() {
        return {
            user: this.$store.state.modules.user.data
        }
    },
    components: {
        Component: Component,
    },
    
    async created() {
        
    },

    methods: {
    }
}
</script>