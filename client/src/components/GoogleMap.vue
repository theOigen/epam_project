<template>
  <gmap-map :center="center" :zoom="15" class="gmap">
    <gmap-marker :position="center"></gmap-marker>
  </gmap-map>
</template>

<script>
export default {
  name: 'GoogleMap',
  data() {
    return {
      center: { lat: 50.4553823, lng: 30.6347832 }
    }
  }
}
</script>

<style lang="scss">
.gmap {
  width: 100%;
  height: 400px;
}
</style>