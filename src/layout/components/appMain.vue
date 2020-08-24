<template>
  <div id="app">
    <router-view :key='key' />
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      key: this.$route.path
    }
  }
}
</script>
<style>
</style>
