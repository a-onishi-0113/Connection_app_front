<template>
    <div>
    edit
    <input @change="selectedFile" type="file">
    <button @click="changeUserAvatar" type="submit">アップロード</button>
    <v-img :src="avatar_url" />

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            avatar_url: this.$store.state.modules.user.data.avatar_url,
            images: [],
            files: [],
            count: null,

        }
    },

    methods: {
        ...mapActions({
            setLoading: 'modules/info/setLoading',
            setFlash: 'modules/info/setFlash',
            flash: 'modules/flash/showMessage',
        }),
        
        selectedFile(e) {
            // 選択された File の情報を保存しておく
            e.preventDefault()
            let files = e.target.files
            this.avatar = files[0]
            console.log(files)
            console.log(this.avatar)
        },
        async changeUserAvatar() {
            console.log(1)
            const formData = new FormData()
            console.log(2)
            formData.append('avatar', this.avatar)
            formData.append('uid', this.$store.state.modules.user.user.uid)
            formData.append('id', this.$store.state.modules.user.data.id)
            console.log(3)
            for (let value of formData.entries()) { 
            console.log(value)
            }
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            console.log(4)
            this.$axios.$patch(`http://localhost:3000/api/v1/users/1/update_avatar`, formData, config)
                .then((res) => {
                    console.log(res)
                    console.log(5)
                    this.avatar_url = res.avatar_url
                    console.log(this.avatar_url)
                        this.flash(
            {
                message: "アイコンを変更しました.",
                type: "sucess",
                status: true,
            },
                { root: true } // 他のvuexモジュールから呼び出すときにつける
            )
                })
                .catch((error) => {
                    console.log(error)
                this.setFlash({
                    status: true,
                    message: "画像の更新に失敗しました。"
                })
                setTimeout(() => {
                    this.setFlash({
                    status: false,
                    message: ""
                    })
                }, 2000)
                })
            },
        },

        async changeUserProfile() {
            this.$axios.$patch(process.env.BROWSER_BASE_URL +　`/v1/users/${this.userId}`, {
            user: {
                name: this.name,
                profile: this.profile,
                uid: this.$store.state.modules.user.user.uid
            }
            })
            .then((res) => {
                this.name = res.name
                this.setFlash({
                    status: true,
                    message: "プロフィールを変更しました"
            })
            setTimeout(() => {
                this.setFlash({
                    status: false,
                    message: ""
                })
            }, 2000)
            })
        },
}
</script>

