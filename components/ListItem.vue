<template>
  <div class="card my-2 item-card">
    <div class="card-body">
      <div class="card-title d-flex align-items-baseline">
        <div class="item-name d-inline-block">
          <a v-if="_itemData.url" :href="_itemData.url">{{ _itemData.name }}</a>
          <span v-if="!_itemData.url">{{ _itemData.name }}</span>
        </div>

        <div class="controls ml-auto">
          <div
            v-if="showReservations"
            class="custom-control custom-checkbox custom-control-inline d-inline-block"
          >
            <input
              type="checkbox"
              class="custom-control-input"
              :id="'reserved-' + _itemData.id"
              v-model="_itemData.reservedBy"
              true-value="someone"
              :false-value="null"
              @change="_reserveFn(_itemData.id, _itemData.reservedBy)"
            />
            <label
              class="custom-control-label"
              :for="'reserved-' + _itemData.id"
            >
              Reserved
            </label>
          </div>
          <button
            v-if="isListOwner"
            class="btn btn-outline-primary btn-sm"
            @click="_removeFn(_itemData.id)"
          >
            X
          </button>
        </div>
      </div>
      <div class="card-text">
        <div class="row">
          <div v-if="!_itemData.imageUrl" class="col-8 col-lg-11">
            {{ _itemData.description }}
          </div>
          <div v-if="_itemData.imageUrl" class="row col-8 col-lg-11">
            <div class="col">
              <img
                class="item-preview bg-light border-0 mx-auto mw-100"
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
    removeFn: {
      type: Function,
      required: true
    },
    itemData: {
      type: Object,
      required: true
    },
    showReservations: {
      type: Boolean,
      required: true
    },
    isListOwner: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    _itemData(): Item {
      return this.itemData as Item
    },
    _reserveFn(): (itemId: string, reservedBy: string | null) => void {
      return this.reserveFn as (
        itemId: string,
        reservedBy: string | null
      ) => void
    },
    _removeFn(): (itemId: string) => void {
      return this.removeFn as (itemId: string) => void
    }
  }
})
</script>
<style lang="scss">
.item-card .card-text {
  img.item-preview {
    clip-path: circle(50% at 50% 50%);
  }
}
</style>
