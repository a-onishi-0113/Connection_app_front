<template>
    <div>
    <!--v-carousel 
        class="flex-container"
    >
        <v-carousel-item
            class=" image-wrap image-wrap img flex-item"
            v-for="(image,i) in this.images"
            :key="i"
            :src="image"
        ></v-carousel-item>
    </v-carousel-->

    <v-flex xs12 style="width:100%; max-width:400px; margin: auto 0">
        <v-carousel cycle hide-delimiters style="width:100%; max-height:400px" class="white">
          <v-carousel-item v-for="(item,i) in images" :src="item" :key="i"></v-carousel-item>
        </v-carousel>
    </v-flex>

    <!--v-carousel>
        <v-carousel-item v-for="(image,i) in this.images" :key="i">
            <img :src="image" style="width:200px height:auto"/>
        </v-carousel-item>
    </v-carousel-->

    </div>
</template>

<script>
export default {
    props: {
        images: null
    },
    data() {
        return {

        }
    },

    methods: {

    }
}
</script>
<style scoped>
.flex-container {
    display: flex;
}

.image-wrap{
    margin: 10px 5px;
}

.image-wrap img {
    width: 100%;
    height: 300px;
}

.flex-item {
    flex-basis: 100%;
}
</style>