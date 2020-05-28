<template>
  <div>
    <ListItem
      v-for="i in _items"
      :key="i"
      class="d-block w-100 listitem"
      :reserveFn="reserveFn"
    />
    <div class="listitem card my-2">
      <form class="form p-4" @submit.prevent="_addItemFn()">
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
        <button type="submit" class="btn btn-primary mx-auto col-5">Add Item</button>
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
    reserveFn: {
      type: Function,
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
      return this.addItemFn as (
        name: string,
        description: string | null,
        url: string | null,
        image: string | null
      ) => void
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
