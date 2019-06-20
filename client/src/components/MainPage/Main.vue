<template>
  <div v-if="!isLoading">
    <b-carousel id="carousel-1" :interval="3500" controls indicators background="#ababab">
      <b-carousel-slide v-for="movie in movies" :key="movie.id" :caption="movie.title">
        <img slot="img" class="d-block fluid w-100 covered" height="650" :src="movie.shotUrl">
      </b-carousel-slide>
    </b-carousel>

    <b-container class="mt-4">
      <b-form>
        <b-row>
          <b-col>
            <b-input placeholder="Film title" v-model="searchString"></b-input>
          </b-col>
        </b-row>
      </b-form>
      <b-row class="mt-2">
        <b-col>
          <b-form-select :options="orderList" v-model="sortOrder" class="sort-selector"></b-form-select>
        </b-col>
        <b-col>
          <b-form-select :options="genres" v-model="genre" class="sort-selector float-right"></b-form-select>
        </b-col>
      </b-row>
      <div>
        <b-row class="mt-2">
          <b-col>
            <div v-if="!totalElements" class="not-found">Not found...</div>
            <MovieCard v-for="movie in filteredMovies" :key="movie.id" :movie="movie"></MovieCard>
          </b-col>
        </b-row>
        <b-pagination
          class="dark-pagination"
          v-model="currentPage"
          :total-rows="totalElements"
          :per-page="perPage"
          align="center"
          v-if="totalElements"
        ></b-pagination>
      </div>
    </b-container>
  </div>
  <b-container
    v-else
    fluid
    class="custom-container d-flex justify-content-center align-items-center"
  >
    <b-spinner label="Loading..." class="loading-spinner"></b-spinner>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import MovieCard from './MovieCard'
export default {
  components: {
    MovieCard
  },
  data() {
    return {
      orderList: ['Without sort', 'From newer to older', 'From older to newer'],
      sortOrder: 'Without sort',
      genres: ['All', 'Sci-Fi', 'Drama', 'Crime', 'Thriller'],
      genre: 'All',
      searchString: '',
      perPage: 3,
      currentPage: 1,
      isLoading: false
    }
  },
  created() {
    this.isLoading = true
    this.$store.dispatch('requestMovies').then(() => {
      this.isLoading = false
    })
  },
  methods: {
    sortMovies(movies) {
      const sortOrder = this.sortOrder
      const orderList = this.orderList
      movies.sort((a, b) => {
        const result = sortOrder === orderList[1] ? -1 : 1
        if (a.releaseDate > b.releaseDate) return result
        else if (a.releaseDate < b.releaseDate) return -result
        return 0
      })
    },
    filterMovies(movies) {
      const genre = this.genre
      return movies.filter(movie => movie.genre.includes(genre))
    },
    searchMovies(movies) {
      return movies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchString.toLowerCase())
      )
    }
  },
  computed: {
    filteredMovies() {
      let movies = this.movies.slice(0)
      if (this.sortOrder !== this.orderList[0]) {
        this.sortMovies(movies)
      }
      if (this.genre !== this.genres[0]) {
        movies = this.filterMovies(movies)
      }
      movies = this.searchMovies(movies)
      return movies.splice((this.currentPage - 1) * this.perPage, this.perPage)
    },
    totalElements() {
      const movies = this.searchMovies(this.movies)
      if (this.genre !== this.genres[0]) return this.filterMovies(movies).length
      else return movies.length
    },
    ...mapGetters(['movies'])
  }
}
</script>

<style lang="scss" scoped>
#carousel-1 {
  text-shadow: 1px 1px 2px #333;
}
.not-found {
  font-size: 2rem;
  text-align: center;
}
.covered {
  object-fit: cover;
}
.search-button {
  display: inline;
}
.sort-selector {
  max-width: 50%;
}
</style>
