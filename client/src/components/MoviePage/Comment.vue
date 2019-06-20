<template>
  <b-card no-body class="card-shadow">
    <b-card-body class="p-3">
      <b-card-title
        class="comment-title text-muted"
      >{{comment.author}} | {{prettyDate(comment.postedAt)}}</b-card-title>
      <hr>
      <b-card-text>{{comment.message}}</b-card-text>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object
    },
    prettyDate: {
      type: Function
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-title {
  font-size: 1.1rem;
}
.card-shadow {
  margin-top: 0.5rem;
  box-shadow: 0px 0px 1.5px black;
}
</style>

