<template>
  <div class="login-btn">
    <b-button-group>
      <b-button v-if="!loggedIn" variant="secondary" @click="login">
        Log In
      </b-button>

      <b-button v-if="loggedIn" variant="secondary" @click="gotoList(username)"
        >Your List</b-button
      >
      <b-button v-if="loggedIn" variant="secondary" @click="logout">
        Log Out
      </b-button>
    </b-button-group>
  </div>
</template>

<script lang="ts">
import env from '@/assets/util/env'
import Vue from 'vue'
import _1 from 'cookie-universal-nuxt/types'
import _2 from '@nuxtjs/axios/types'
export default Vue.extend({
  data() {
    return {
      loggedIn: this.$cookies.get<string>('authenticated') !== undefined
    }
  },
  computed: {
    username(): string | undefined {
      if (!this.loggedIn) return undefined
      else return this.$cookies.get<string>('authenticated')
    }
  },
  methods: {
    login(): void {
      window.location.href = env.API_URL + '/login'
    },
    logout(): void {
      // we don't need to actually render the call to logout
      this.$axios.$get(env.API_URL + '/logout', {
          withCredentials: true
        }).then(_ => {
        this.$cookies.remove('authenticated')
        this.loggedIn = false
      })
    },
    gotoList(username: string): void {
      this.$router.push('/' + username)
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/scss/bootstrap_config.scss';
.login-btn button.btn-secondary:hover {
  color: $white;
}
</style>
