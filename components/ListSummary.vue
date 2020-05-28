<template>
  <div class="listsummary card my-2">
    <div class="card-body">
      <div class="card-title text-center">
        <img v-if="image" :src="image" alt="">
        <h4>{{ name }}</h4>
      </div>
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    description: {
      type: String,
      required: false,
      default: null
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false,
      default: null
    }
  }
})
</script>

<style></style>
