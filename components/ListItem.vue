<template>
  <div class="card my-2 item-card">
    <div class="card-body">
      <div class="card-title">
        <a v-if="_itemData.url" :href="_itemData.url">{{ _itemData.name }}</a>
        <span v-if="!_itemData.url">{{ _itemData.name }}</span>
      </div>
      <div class="card-text">
        <div>
          <div v-if="!_itemData.imageUrl">
            {{ _itemData.description }}
          </div>
          <div v-if="_itemData.imageUrl" class="row">
            <div class="col">
              <img
                class="item-preview bg-light border-0 mx-auto"
                :src="_itemData.imageUrl"
                :alt="'A preview of ' + _itemData.name"
              />
            </div>
            <div class="col-8 col-md-10">{{ _itemData.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Item } from '@/assets/models'
export default Vue.extend({
  props: {
    reserveFn: {
      type: Function,
      required: true
    },
    itemData: {
      type: Object,
      required: true
    }
  },
  computed: {
    _itemData(): Item {
      return this.itemData as Item
    }
  }
})
</script>
<style lang="scss">
.item-card .card-text {
  img.item-preview {
    max-width: 100%;
    clip-path: circle(50% at 50% 50%);
  }
}
</style>
