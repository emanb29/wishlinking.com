<template>
  <div>
    <div v-if="!loaded">
      Loading...
    </div>
    <div v-if="loaded" class="d-flex flex-wrap">
      <ListItems class="col-12 col-md-8 order-1 order-md-0" />
      <div
        class="summary-wrapper col-12 col-md-4 order-0 order-md-1 align-self-start pl-md-0 sticky-top"
      >
        <ListSummary :description="listDescription" />
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
export default Vue.extend({
  data() {
    return {
      authedUser: undefined,
      listName: this.$route.params.name,
      listDescription: '',
      loaded: false
    } as {
      authedUser: any | undefined // TODO user model
      listName: string
      listDescription: string
      loaded: boolean
    }
  },
  components: {
    ListItems,
    ListSummary
  },
  async beforeMount() {
    const listUrl = env.API_URL + '/wishlist/at/' + this.listName
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
    let list: any // TODO add a wishlist model
    if (preflight.status === 404) {
      if (this.$cookies.get('authenticated') !== undefined) {
        this.authedUser = await this.$axios.$get(env.API_URL + '/me', {
          withCredentials: true
        })
      }
      if (
        this.authedUser &&
        this.authedUser.preferred_username === this.listName
      ) {
        console.debug('No list found. Going to try to make it.')
        list = await this.$axios.$post(
          env.API_URL + '/wishlist',
          {
            id: uuid.v4(),
            name: `${this.authedUser.preferred_username}'s wishlist`,
            shortname: this.listName,
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
      list = await this.$axios.$get(listUrl, {
        withCredentials: true
      })
    }
    let { id, name, shortname, description, owner, imageUrl, items } = list
    if (this.listName === shortname) {
      this.listDescription = description
    }

    this.loaded = true
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
