<template>
  <div id="q-app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  created () {
    this.$store.dispatch('wallet/loadWallets')
  }
}
</script>
<style>
</style>
