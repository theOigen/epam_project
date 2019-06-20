<template>
  <b-container fluid class="movie-container">
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
            <!-- <b-button class="buy-ticket-btn" variant="outline-success"> -->
            <!-- </b-button> -->
          </div>
          <ul class="info-list">
            <li>
              Directed by:
              <span class="text-muted">{{movie.directedBy}}</span>
            </li>
            <li>
              Released:
              <span class="text-muted">{{movie.releaseDate}}</span>
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
        <div>
          <b>Comments about {{movie.title}}</b>
          <div>
            <b-form>
              <b-row>
                <b-col>
                  <b-form-textarea placeholder="Leave a comment" rows="3" max-rows="6"></b-form-textarea>
                  <b-button class="mt-1 float-right" variant="outline-dark">Send</b-button>
                </b-col>
              </b-row>
            </b-form>
          </div>
          <div class="comments">
            <b-card no-body class="card-shadow">
              <b-card-body class="p-3">
                <b-card-title class="comment-title text-muted">Eugene | March 26</b-card-title>
                <hr>
                <b-card-text>Amazing movie. Like.</b-card-text>
              </b-card-body>
            </b-card>
            <b-card no-body class="card-shadow">
              <b-card-body class="p-3">
                <b-card-title class="comment-title text-muted">Eugene | March 26</b-card-title>
                <hr>
                <b-card-text>Amazing movie. Like.</b-card-text>
              </b-card-body>
            </b-card>
            <b-card no-body class="card-shadow">
              <b-card-body class="p-3">
                <b-card-title class="comment-title text-muted">Eugene | March 26</b-card-title>
                <hr>
                <b-card-text>Amazing movie. Like.</b-card-text>
              </b-card-body>
            </b-card>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'movie',
  props: {
    propMovie: {
      type: Object
    }
  },
  mounted() {
    if (this.propMovie) {
      this.movie = this.propMovie
    } else {
      this.getMovie()
    }
  },
  data() {
    return {
      movie: {}
    }
  },
  methods: {
    getMovie() {
      const id = this.$route.params.id
      if (id.length) {
        this.movie = this.$store.dispatch('getMovieById', id).then(movie => {
          this.movie = movie
        })
      }
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
.movie-container {
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
.comment-title {
  font-size: 1.1rem;
}
.card-shadow {
  margin-top: 0.5rem;
  box-shadow: 0px 0px 1.5px black;
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
.comments {
  font-size: 1rem;
}
</style>
