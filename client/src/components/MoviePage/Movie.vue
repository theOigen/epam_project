<template>
  <b-container fluid class="movie-container" v-if="!isLoading">
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
            <b-link href="#" class="ticket-link">
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
        <div class="mt-3">
          <b-pagination
            v-model="currentPage"
            :total-rows="movieComments.length"
            :per-page="perPage"
            align="center"
          ></b-pagination>
        </div>
      </b-col>
    </b-row>
  </b-container>
  <b-container
    fluid
    class="spinner-container d-flex justify-content-center align-items-center"
    v-else
  >
    <b-spinner label="Loading..." class="loading-spinner"></b-spinner>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CommentsSection from './Comments'
export default {
  name: 'movie',
  props: {
    propMovie: {
      type: Object
    }
  },
  components: {
    CommentsSection
  },
  data() {
    return {
      movie: {},
      userComment: '',
      isLoading: true,
      currentPage: 1,
      perPage: 3
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
          this.$store.dispatch('getMovieById', id).then(movie => {
            this.movie = movie
            this.getComments()
          })
        }
      }
    },
    getComments() {
      const id = this.movie.id
      this.$store
        .dispatch('getMovieComments', id)
        .then((this.isLoading = false))
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
.loading-spinner {
  width: 100px;
  height: 100px;
  border-width: 7px;
}
.spinner-container {
  width: 100%;
  height: 100%;
}
.movie-container,
.spinner-container {
  padding: 50px 50px 40px 40px;
  font-size: 1.3rem;
}
.ticket-link {
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
// .comment-title {
//   font-size: 1.1rem;
// }
// .card-shadow {
//   margin-top: 0.5rem;
//   box-shadow: 0px 0px 1.5px black;
// }
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
// .comments {
//   font-size: 1rem;
// }
</style>
