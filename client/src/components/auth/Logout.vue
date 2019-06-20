<template>
  <div>Logging out...</div>
</template>

<script>
import firebase from 'firebase'
export default {
  mounted() {
    const self = this
    firebase
      .auth()
      .signOut()
      .then(() => {
        self.$store.dispatch('logout', {
          authenticated: false,
          currentUser: null
        })
        self.$router.push('/')
      })
  }
}
</script>
