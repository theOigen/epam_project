<template>
  <b-card :img-src="movie.posterUrl" img-alt="Image" img-left no-body tag="article" class="mb-3">
    <b-card-body>
      <b-card-title>
        <router-link
          class="title-link"
          :to="{name: 'movie', params: {propMovie: movie, id:movie.id}, query: movie.id}"
        >{{movie.title}}</router-link>
      </b-card-title>
      <b-card-text>{{movie.synopsis}}</b-card-text>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.title-link {
  color: inherit;
  &:hover {
    text-decoration: none;
    color: #537094;
  }
}
.card-img-left {
  max-width: 300px;
  max-height: 300px;
}
</style>
