<template>
  <div class="about mt-2">
    <h1 align="center">Where to find us</h1>
    <GoogleMap/>
    <div class="text-center desc-section">
      <h2 class="text-muted muted-header">Contacts us</h2>
      <p class="text-muted description">
        <strong>Address</strong> ТРЦ Проспект, Hnata Khotkevycha St, 1В, Kyiv, 02000
        <br>
        <strong>Tel:</strong>
        <i>+380-96-052-01-98</i>
      </p>
    </div>
  </div>
</template>

<script>
import GoogleMap from '@/components/GoogleMap'
export default {
  components: {
    GoogleMap
  }
}
</script>

<style lang="scss" scoped>
.desc-section {
  margin-top: 1%;
  font-family: sans-serif;
  font-style: italic;
}
.muted-header {
  font-size: 1.5rem;
  display: block;
}
.description {
  display: block;
}
</style>

