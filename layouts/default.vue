<template>
  <v-app>
    <flash />
    <Header />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import flash from '~/components/flash.vue'
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
export default {
       components: {
        flash: flash,
        Header: Header,
        Footer: Footer,
    },
  data () {
    return {
      
    }
  }
}
</script>

