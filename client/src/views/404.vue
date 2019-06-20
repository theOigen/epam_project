<template>
  <b-container fluid class="custom-container d-flex align-items-center justify-content-center">
    <b-row>
      <b-col cols="12" class="text-center">Oopsie.. page not found</b-col>
      <b-col cols="12" class="text-center">
        <b-link @click.prevent="handleClick">
          <b>Return back?</b>
        </b-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  -webkit-animation: pulseColor 1500ms linear 1000ms forwards;
  animation: pulseColor 1500ms linear 1000ms forwards;
  font-weight: 500;
}
a:hover b,
a:focus b {
  color: #f04f54;
  text-decoration: none;
}
a:active b {
  color: inherit;
}
@-webkit-keyframes pulseColor {
  0% {
    color: inherit;
  }
  25% {
    color: #f04f54;
  }
  50% {
    color: inherit;
  }
  75% {
    color: #f04f54;
  }
  100% {
    color: inherit;
  }
}
@keyframes pulseColor {
  0% {
    color: inherit;
  }
  25% {
    color: #f04f54;
  }
  50% {
    color: inherit;
  }
  75% {
    color: #f04f54;
  }
  100% {
    color: inherit;
  }
}
.custom-container {
  font-size: 3.5rem;
}
</style>
