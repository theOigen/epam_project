<template>
  <div class="custom-container" v-if="!error">
    <b-container fluid v-if="!isLoading">
      <b-row>
        <b-col cols="6" md="3" xl="2">
          <div class="poster-wrapper">
            <img :src="movie.posterUrl" class="movie-poster">
          </div>
        </b-col>
        <b-col cols="6" md="9" xl="10">
          <div class="movie-info">
            <div class="d-flex justify-content-start">
              <h1>{{movie.title}}</h1>
              <b-link class="ticket-link">
                <i class="fa fa-ticket" aria-hidden="true"></i>
              </b-link>
            </div>
            <ul class="info-list">
              <li>
                Directed by:
                <span class="text-muted">{{movie.directedBy}}</span>
              </li>
              <li>
                Released:
                <span class="text-muted">{{prettyDate(movie.releaseDate)}}</span>
              </li>
              <li>
                Genre:
                <span class="text-muted">{{movie.genre}}</span>
              </li>
              <li>
                Timekeeping:
                <span class="text-muted">{{movie.timekeeping}}</span>
              </li>
            </ul>
          </div>
          <div class="movie-synopsis">{{movie.synopsis}}</div>
          <CommentsSection
            :movieId="movie.id"
            :movieTitle="movie.title"
            :comments="paginatedComments"
            :prettyDate="prettyDate"
          ></CommentsSection>
          <div class="mt-3" v-if="movieComments.length > perPage">
            <b-pagination
              class="dark-pagination"
              v-model="currentPage"
              :total-rows="movieComments.length"
              :per-page="perPage"
              align="center"
            ></b-pagination>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="w-100 h-100 d-flex justify-content-center align-items-center" v-else>
      <b-spinner label="Loading..." class="loading-spinner"></b-spinner>
    </b-container>
  </div>
  <div class="w-100 h-100" v-else>
    <NotFound></NotFound>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommentsSection from './Comments'
import NotFound from '@/views/404'
export default {
  name: 'movie',
  props: {
    propMovie: {
      type: Object
    }
  },
  components: {
    CommentsSection,
    NotFound
  },
  data() {
    return {
      movie: {},
      userComment: '',
      isLoading: true,
      currentPage: 1,
      perPage: 3,
      error: null
    }
  },
  mounted() {
    this.getMovie()
  },
  computed: {
    paginatedComments() {
      return this.movieComments.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      )
    },
    ...mapGetters(['movieComments'])
  },
  methods: {
    getMovie() {
      this.isLoading = true
      if (this.propMovie) {
        this.movie = this.propMovie
        this.getComments()
      } else {
        const id = this.$route.params.id
        if (id.length) {
          this.$store
            .dispatch('getMovieById', id)
            .then(movie => {
              this.movie = movie
              this.getComments()
            })
            .catch(error => {
              this.error = error
            })
        }
      }
    },
    getComments() {
      const id = this.movie.id
      this.$store.dispatch('getMovieComments', id).then(() => {
        this.isLoading = false
      })
    },
    addComment() {
      this.$store.dispatch('addComment', {
        movieId: this.movie.id,
        userComment: this.userComment
      })
      this.userComment = ''
    },
    prettyDate(date) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  watch: {
    $route(to, from) {
      this.getMovie()
    }
  }
}
</script>

<style lang="scss" scoped>
.ticket-link {
  max-height: 30px;
  color: #343a40;
  &:hover {
    color: #656668;
  }
}
.buy-ticket-btn {
  border-radius: 50%;
  max-width: 50px;
  max-height: 50px;
}
.movie-poster {
  max-width: 100%;
  max-height: 400px;
}
.info-list {
  list-style: none;
  padding: 0;
  li {
    margin-bottom: 5px;
    font-weight: bold;
    line-height: 35px;
  }
}
</style>
