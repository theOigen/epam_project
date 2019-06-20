<template>
  <b-form>
    <b-row>
      <b-col>
        <b-form-textarea
          placeholder="Leave a comment"
          rows="3"
          max-rows="6"
          v-model="userComment"
          @keydown.enter.shift.exact="addComment"
        ></b-form-textarea>
        <b-button class="mt-1 float-right" variant="outline-dark" @click.prevent="addComment">Send</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
export default {
  props: {
    movieId: {
      type: String
    }
  },
  data() {
    return {
      userComment: ''
    }
  },
  methods: {
    addComment() {
      this.$store.dispatch('addComment', {
        movieId: this.movieId,
        userComment: this.userComment
      })
      this.userComment = ''
    }
  }
}
</script>