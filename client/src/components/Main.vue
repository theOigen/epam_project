<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide v-for="movie in movies" :key="movie.id" :caption="movie.title">
        <img slot="img" class="d-block fluid w-100 covered" height="650" :src="movie.shotUrl">
      </b-carousel-slide>
    </b-carousel>

    <b-container class="mt-4">
      <b-form>
        <b-row>
          <b-col lg="11" md="10" sm="9" cols="9">
            <b-input placeholder="Film title" id="searchBar"></b-input>
          </b-col>
          <b-col lg="1" md="2" sm="3" cols="3">
            <b-button variant="outline-dark" class="search-button float-right">Search</b-button>
          </b-col>
        </b-row>
      </b-form>
      <b-row class="mt-2">
        <b-col>
          <b-form-select :options="dates" v-model="sort" class="sort-selector"></b-form-select>
        </b-col>
        <b-col>
          <b-form-select :options="genres" v-model="genre" class="sort-selector float-right"></b-form-select>
        </b-col>
      </b-row>
      <div>
        <b-card-group deck class="mt-2">
          <b-row>
            <b-col v-for="movie in filteredMovies" :key="movie.id">
              <b-card
                :img-src="movie.posterUrl"
                img-alt="Image"
                img-left
                no-body
                tag="article"
                class="mb-3"
              >
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
            </b-col>
          </b-row>
        </b-card-group>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" align="center"></b-pagination>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      dates: ['Without sort', 'From newer to older', 'From older to newer'],
      sort: 'Without sort',
      genres: ['All', 'Sci-Fi', 'Drama', 'Comedy'],
      genre: 'All',
      perPage: 3,
      currentPage: 1
    }
  },
  mounted() {},
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  },
  watch: {
    currentPage() {
      console.log('currentPage changes...', this.currentPage)
    }
  },
  computed: {
    filteredMovies() {
      /** @TODO
       * filter and sort movies by dates and genres
       * paginate movies
       */
      if (this.genre !== this.genres[0])
        return this.$store.getters.movies.filter(movie =>
          movie.genre.includes(this.genre)
        )
      else return this.movies
      // }
    },
    ...mapGetters(['movies']),
    rows() {
      return 30
    }
  }
}
</script>

<style lang="scss" scoped>
.covered {
  object-fit: cover;
}
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
#searchBar {
  // max-width: 92%;
  display: inline;
}
.search-button {
  display: inline;
}
.sort-selector {
  max-width: 50%;
}
</style>
