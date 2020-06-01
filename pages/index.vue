<template>
  <div class="container">
    <b-jumbotron
      class="mt-4"
      header="Wishlinking"
      lead="The handiest-dandiest wishlist web application"
    >
      <dl>
        <dt>To create a wishlist:</dt>
        <dd>
          Simply log in! The first time you open your wishlist it may take a
          moment as we set up the list for you.
        </dd>
        <dt>To access someone else's list:</dt>
        <dd>Visit the list URL.</dd>
        <dt>To reserve an item:</dt>
        <dd>
          On someone's list, first enable viewing reservations by pressing the
          "Toggle reservations" button, then check the "Reserved" box
        </dd>
      </dl>
    </b-jumbotron>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/Logo.vue'

export default Vue.extend({
  components: {
    Logo
  }
})
</script>

<style></style>
