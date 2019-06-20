/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import db from './firebaseInit'
import * as GoogleMaps from 'vue2-google-maps'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(GoogleMaps, {
  load: {
    key: 'AIzaSyB2AWqsBw6NLLz6j36GNkaUt2HYBH3Citw',
    libraries: 'places'
  }
})

// Vue.prototype.$db = db

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// created() {
// firebase.initializeApp(config)
// },
