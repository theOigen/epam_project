<template>
  <b-container>
    <b-row align-h="center" align-v="center" class="login-row">
      <b-col cols="5">
        <b-card>
          <h1 align="center">Social login</h1>
          <div id="firebaseui-auth-container"></div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import '../../../node_modules/firebaseui/dist/firebaseui.css'
import { config } from '../../config'
export default {
  mounted() {
    const self = this
    const uiConfig = {
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
        }
      ],
      callbacks: {
        signInSuccessWithAuthResult() {
          self.$store.dispatch('receiveUser', {
            authenticated: true,
            currentUser: {
              login: firebase.auth().currentUser.displayName
            }
          })
          self.$router.push('/')
        }
      }
    }
    this.ui = new firebaseui.auth.AuthUI(firebase.auth())
    this.ui.start('#firebaseui-auth-container', uiConfig)
  },
  beforeDestroy() {
    this.ui.delete()
  },
  data() {
    return {
      ui: null
    }
  }
}
</script>

<style lang="scss" scoped>
.container,
.login-row {
  height: 90%;
}
</style>
