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
.dark-pagination li.page-item {
  &.active {
    a.page-link {
      color: rgb(255, 255, 255);
      background-color: #3a3a3a;
      border-color: #3a3a3a;
    }
  }
  a.page-link {
    &:focus {
      box-shadow: none;
    }
    color: #3a3a3a;
  }
  &:focus {
    outline: none;
  }
}
.spinner-border.loading-spinner {
  width: 100px;
  height: 100px;
  border-width: 7px;
}
.custom-container {
  padding: 50px 50px 40px 40px;
  font-size: 1.3rem;
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
