<template>
  <div class="listsummary card my-2">
    <div class="card-body">
      <div class="card-title text-center">
        <img
          v-if="image"
          :src="image"
          alt=""
          class="list-image mw-100 d-none d-md-inline-block"
        />
        <h4>{{ name }}</h4>
        <button class="btn btn-sm btn-primary" @click="toggleReservations">
          Toggle Reservations
        </button>
      </div>
      <div class="card-text">
        {{ description }}
      </div>
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
    },
    toggleReservations: {
      type: Function,
      required: true
    }
  }
})
</script>

<style lang="scss">
.listsummary {
  .list-image {
    max-height: 250px;
  }
}
</style>
