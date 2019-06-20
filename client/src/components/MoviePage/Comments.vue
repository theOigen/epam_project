<template>
  <div>
    <b>Comments about {{movieTitle}}</b>
    <div>
      <CommentForm :movieId="movieId"></CommentForm>
    </div>
    <div class="comments">
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :prettyDate="prettyDate"
      ></Comment>
    </div>
  </div>
</template>

<script>
import Comment from './Comment'
import CommentForm from './CommentForm'
export default {
  props: {
    movieId: {
      type: String
    },
    movieTitle: {
      type: String
    },
    comments: {
      type: Array
    },
    prettyDate: {
      type: Function
    }
  },
  components: {
    Comment,
    CommentForm
  }
}
</script>

<style lang="scss" scoped>
.comments {
  font-size: 1rem;
}
</style>
