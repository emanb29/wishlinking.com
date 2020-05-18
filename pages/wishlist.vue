<template>
  <div class="d-flex flex-wrap">
    <ListItems class="col-12 col-md-8 order-1 order-md-0" />
    <ListSummary class="col-12 col-md-4 order-0 order-md-1 align-self-start" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ListItems from '~/components/ListItems.vue'
import ListSummary from '~/components/ListSummary.vue'
export default Vue.extend({
  components: {
    ListItems,
    ListSummary
  }
})
</script>

<style></style>
