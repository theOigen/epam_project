<template>
  <div class="home">
    <Main></Main>
  </div>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/MainPage/Main'

export default {
  name: 'home',
  components: {
    Main
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>

