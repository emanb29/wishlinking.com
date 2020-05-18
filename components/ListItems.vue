<template>
  <div>
    <ListItem v-for="i in Array(9)" :key="i" class="d-block w-100"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ListItem from './ListItem.vue'
export default Vue.extend({
  components: {
    ListItem
  }
})
</script>

<style lang="scss">
.listitem {
  min-height: 100px;
}
</style>
