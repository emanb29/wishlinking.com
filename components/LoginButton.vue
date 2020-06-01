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
  async mounted() {
    if (this.$cookies.get('logout') !== undefined) {
      // just got back from logging out
    } else if (!this.loggedIn) {
      console.log('Checking if logged in...')
      try {
        const user = await this.$axios.$get(env.API_URL + '/me', {
          withCredentials: true
        })
        this.$cookies.set('authenticated', user.preferred_username as string)
        this.loggedIn = true
      } catch (err) {
        console.debug(err)
        // This probably just means the user wasn't logged in
      }
    }
  },
  methods: {
    login(): void {
      this.$cookies.remove('logout')
      window.location.href = env.API_URL + '/login'
    },
    logout(): void {
      this.$cookies.set('logout', true)
      // we don't need to actually render the call to logout
      this.$axios.$get(env.API_URL + '/logout').then(_ => {
        this.$cookies.remove('authenticated')
        this.loggedIn = false
        location.reload()
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
