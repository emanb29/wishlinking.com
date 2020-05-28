<template>
  <div class="listsummary card my-2">
    <div class="card-body">
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
    }
  }
})
</script>

<style></style>
