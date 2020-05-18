<template>
  <div>
    <b-navbar type="dark" variant="primary">
      <b-navbar-brand href="#"><span>Wishlinking</span></b-navbar-brand>
      <b-button variant="secondary" class="ml-auto">Log In</b-button>
    </b-navbar>
    <nuxt />
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/bootstrap_config.scss';
nav button.btn-secondary:hover {
  color: $white;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
