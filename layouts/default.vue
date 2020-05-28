<template>
  <div>
    <b-navbar type="dark" variant="primary" sticky>
      <b-navbar-brand href="#" @click="gotoHome"
        ><span>Wishlinking</span></b-navbar-brand
      >
      <login-button class="ml-auto"></login-button>
    </b-navbar>
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LoginButton from '../components/LoginButton.vue'
export default Vue.extend({
  components: {
    LoginButton
  },
  methods: {
    gotoHome(): void {
      this.$router.push('/')
    }
  }
})
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
