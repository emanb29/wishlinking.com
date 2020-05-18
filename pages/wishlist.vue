<template>
  <div class="d-flex flex-wrap">
    <ListItems class="col-12 col-md-8 order-1 order-md-0" />
    <div
      class="summary-wrapper col-12 col-md-4 order-0 order-md-1 align-self-start pl-md-0 sticky-top"
    >
      <ListSummary />
    </div>
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

<style lang="scss">
@import '@/assets/scss/bootstrap_config.scss';

.summary-wrapper.sticky-top {
  @supports (position: sticky) {
    top: 56px; // This is the magic value for header height in bootstrap
  }
}

@include media-breakpoint-up(xs) {
  .summary-wrapper {
    border-bottom: $border-width solid $border-color; // This is a copy-paste from bootstrap since @extend doesn't work here
  }
}
@include media-breakpoint-up(md) {
  .summary-wrapper {
    border-bottom: 0;
  }
}
</style>
