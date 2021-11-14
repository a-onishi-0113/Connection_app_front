<template>
    <div>
    <v-btn @click="name_select = !name_select; map_select = false">
    名前を検索
    </v-btn>
    <v-btn @click="map_select = !map_select; name_select = false">
    マップを検索
    </v-btn>
    <div v-show='name_select'>
    <p>名前を入力してください</p>
    <input v-model="name" type="text"></input>
    </div>
    <div v-show='map_select'>
    <p>マップ名を入力してください</p>
    <input v-model="map" type="text"></input>
    </div>
    <button @click="search()">
    検索
    </button>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            name:'',
            map:'',
            name_select: false,
            map_select: false,
        }
    },
    methods: {
        ...mapActions({
            getUsersResult: 'modules/search/getUsersResult',
            getMapsResult: 'modules/search/getMapsResult'
        }),
        async search() {
            if (this.name_select) {
                
                const res = await this.$axios.post(`http://localhost:3000/api/v1/users/search`,{name: this.name})
                if (res.data.length) {
                    const data = JSON.parse(JSON.stringify(res.data))
                    console.log(data)
                    await this.getUsersResult(data)
                }else {
                    await this.getUsersResult(res)
                    console.log('検索結果なし')
                }
                this.$router.push({ name: 'result' , query: {q: this.name}})
            } else if (this.map_select) {
                const res = await this.$axios.post(`http://localhost:3000/api/v1/posts/search`,{formatted_address: this.map})
                if (res.data.length) {
                    console.log(res)
                    const data = JSON.parse(JSON.stringify(res.data))
                    await this.getMapsResult(data)
                }else {
                    console.log(res)
                    await this.getMapsResult(res)
                    console.log('検索結果なし')
                }
                this.$router.push({ name: 'result' , query: {q: this.map}})
            }
        },
    },

}
</script>