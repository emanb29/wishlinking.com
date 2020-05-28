<template>
  <div>
    <div v-if="!loaded">
      Loading...
    </div>
    <div v-if="loaded" class="d-flex flex-wrap">
      <ListItems
        class="col-12 col-md-8 order-1 order-md-0"
        :items="list && list.items"
        :addItemFn="addItem"
        :removeItemFn="removeItem"
        :reserveFn="reserve"
        :showReservations="showReservations"
        :isListOwner="isListOwner"
      />
      <div
        class="summary-wrapper col-12 col-md-4 order-0 order-md-1 align-self-start pl-md-0 sticky-top bg-white"
      >
        <ListSummary
          :description="list && list.description"
          :name="list && list.name"
          :toggleReservations="toggleReservations"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import env from '@/assets/util/env'
import ListItems from '~/components/ListItems.vue'
import ListSummary from '~/components/ListSummary.vue'
import * as uuid from 'uuid'
import { Wishlist as List, Item } from '@/assets/models'
export default Vue.extend({
  data() {
    return {
      authedUser: undefined,
      loaded: false,
      shortname: this.$route.params.name,
      list: null,
      showReservations: false
    } as {
      authedUser: any | undefined // TODO user model
      loaded: boolean
      shortname: string
      list: List | null
      showReservations: boolean
    }
  },
  components: {
    ListItems,
    ListSummary
  },
  methods: {
    todo(...xs: any[]): void {
      console.log(xs)
      // TODO
    },
    async addItem(
      name: string,
      description: string | null,
      url: string | null,
      image: string | null
    ): Promise<void> {
      this.list!.items.push(
        new Item(uuid.v4(), name, description, url, image, null)
      )
      this.list = await this.$axios.$put<List>(
        env.API_URL + '/wishlist/' + this.list!.id,
        this.list!,
        {
          withCredentials: true
        }
      )
    },
    async removeItem(itemId: string) {
      this.list!.items = this.list!.items.filter(i => i.id != itemId)
      this.list = await this.$axios.$put<List>(
        env.API_URL + '/wishlist/' + this.list!.id,
        this.list!,
        {
          withCredentials: true
        }
      )
    },
    async reserve(itemId: string, reservedBy: string | null) {
      this.list = await this.$axios.$put<List>(
        `${env.API_URL}/wishlist/${this.list!.id}/${itemId}/reservation`,
        {
          reservedBy
        },
        { withCredentials: true }
      )
    },
    toggleReservations(): void {
      this.showReservations = !this.showReservations
    }
  },
  async beforeMount() {
    const listUrl = env.API_URL + '/wishlist/at/' + this.shortname
    const preflight = await this.$axios
      .head(listUrl, {
        withCredentials: true
      })
      .catch(err => {
        if (err.response) {
          console.debug(`got an HTTP error ${err.response.status}, continuing`)
          return err.response
        } else throw err
      })
    if (this.$cookies.get('authenticated') !== undefined) {
      this.authedUser = await this.$axios.$get(env.API_URL + '/me', {
        withCredentials: true
      })
    }
    if (preflight.status === 404) {
      if (
        this.authedUser &&
        this.authedUser.preferred_username === this.shortname
      ) {
        console.debug('No list found. Going to try to make it.')
        this.list = await this.$axios.$post<List>(
          env.API_URL + '/wishlist',
          {
            id: uuid.v4(),
            name: `${this.authedUser.preferred_username}'s wishlist`,
            shortname: this.shortname,
            description: null,
            owner: this.authedUser.sub,
            items: []
          },
          {
            withCredentials: true
          }
        )
      } else {
        this.$router.push('/')
      }
    } else {
      this.list = await this.$axios.$get<List>(listUrl, {
        withCredentials: true
      })
    }

    this.loaded = true
  },
  computed: {
    isListOwner(): boolean {
      return (
        (this.authedUser && this.authedUser.sub) ===
        (this.list && this.list.owner)
      )
    }
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
