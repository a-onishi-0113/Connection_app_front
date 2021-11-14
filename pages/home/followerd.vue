<template>
    <div>
    <p>フォロワーユーザー</p>
    
    <Component
        :users = 'this.user.followers'
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