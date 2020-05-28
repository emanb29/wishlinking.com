<template>
  <div>
    <ListItem
      v-for="(item, i) in _items"
      :key="i"
      class="d-block w-100 listitem"
      :reserveFn="reserveFn"
      :removeFn="removeItemFn"
      :itemData="item"
      :showReservations="showReservations"
      :isListOwner="isListOwner"
    />
    <div v-if="isListOwner" class="listitem card my-2">
      <form
        class="form p-4"
        @submit.prevent="
          _addItemFn(
            newItem.name,
            newItem.description || null,
            newItem.url || null,
            newItem.image || null
          )
        "
      >
        <div class="form-group row">
          <label for="name" class="col-form-label col required">Name</label>
          <input
            class="form-control col-12 col-lg-9 form-control-sm"
            id="name"
            type="text"
            v-model="newItem.name"
            required
          />
        </div>
        <div class="form-group row">
          <label for="desc" class="col-form-label col">Description</label>
          <textarea
            class="form-control col-12 col-lg-9 form-control-sm"
            id="desc"
            type="text"
            v-model="newItem.description"
          />
        </div>
        <div class="form-group row">
          <label for="url" class="col-form-label col">URL</label>
          <input
            class="form-control col-12 col-lg-9 form-control-sm"
            id="url"
            type="text"
            placeholder="https://..."
            v-model="newItem.url"
          />
        </div>
        <div class="form-group row">
          <label for="image" class="col-form-label col">Image</label>
          <input
            class="form-control col-12 col-lg-9 form-control-sm"
            id="image"
            type="text"
            placeholder="https://..."
            v-model="newItem.image"
          />
        </div>
        <div class="row">
          <button type="submit" class="btn btn-primary mx-auto col-5">
            Add Item
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ListItem from './ListItem.vue'
import * as uuid from 'uuid'
import env from '@/assets/util/env'
import { Item } from '@/assets/models'
export default Vue.extend({
  data() {
    return {
      newItem: {
        name: '',
        description: null,
        url: null,
        image: null
      }
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    addItemFn: {
      type: Function,
      required: true
    },
    removeItemFn: {
      type: Function,
      required: true
    },
    reserveFn: {
      type: Function,
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
    _items(): Array<Item> {
      return this.items as Array<Item>
    },
    _addItemFn(): (
      name: string,
      description: string | null,
      url: string | null,
      image: string | null
    ) => void {
      return (
        name: string,
        description: string | null,
        url: string | null,
        image: string | null
      ) => {
        this.addItemFn(name, description, url, image)
        // reset input
        this.newItem = {
          name: '',
          description: null,
          url: null,
          image: null
        }
      }
    }
  },
  components: {
    ListItem
  }
})
</script>

<style lang="scss">
label.required {
  &::after {
    content: ' *';
    color: red;
  }
}
.listitem {
  min-height: 100px;
}
</style>
