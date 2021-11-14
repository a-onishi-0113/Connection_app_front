<template>
    <div>
        <v-list>
            <v-list-item v-for="comment in post.post_comments" :key = 'comment.id'>
            {{comment.comment}}
            <v-icon>mdi-dots-horizontal</v-icon>
            </v-list-item>
        </v-list>
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

        }
    },
    
}
</script>