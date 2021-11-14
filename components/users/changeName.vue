<template>
    <div>
    <ValidationObserver
      v-slot="{ invalid }"
    >
      <v-form>
        <p v-if="error" class="errors">{{ error }}</p>
        <TextFieldWithValidation
          v-model="name"
          label="名前"
          rules="max:20|required"
        />
        <v-row justify="center">
          <v-btn
            color="success"
            class="mx-auto white--text mt-4"
            :disabled="invalid"
            @click="changeName"
          >名前変更
          </v-btn>
        </v-row>
          </v-form>
    </ValidationObserver>

    </div>
</template>

<script>
import TextFieldWithValidation from '~/components/TextFieldWithValidation.vue'
export default {
    data() {
        return {
            name: null,
            error: null,
        }
    },

    methods: {
        changeName() {
            
        }
    }
}
</script>