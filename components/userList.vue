<template>
    <div>
    <v-list>
    <v-list-item v-for="user in users" :key = 'user.id'>
        <v-list-item-title>
        <v-avatar>
        <img 
            :src="user.avatar_url"
        /> 
        </v-avatar>
        {{user.name}}<br>
        {{user.profile}}<br>
        <div @click="detail(user)"><v-btn>詳細</v-btn></div>
        </v-list-item-title>
    </v-list-item>
  </v-list>
    </div>
</template>

<script>
export default {
    props: {
        users: {
            
        }
    },
    data() {
        return {

        }
    },

    methods: {
        async detail(user) {
            console.log(user)
            const user_id = user.id
            this.$router.push(`${user_id}`)
        },

    }
}
</script>