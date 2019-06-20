<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  },
  created() {
    this.$store.dispatch('requestMovies')
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  width: 100%;
}
body {
  padding-top: 56px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
