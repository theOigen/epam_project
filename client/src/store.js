/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import Vuex from 'vuex'
import db from './firebaseInit'
import utils from './utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: JSON.parse(localStorage.getItem('authData')),
    movies: []
  },
  getters: {
    isLoggedIn: state => state.userData.authenticated,
    userLogin: state => state.userData.currentUser.login,
    movies: state => state.movies
  },
  mutations: {
    receiveUser(state, userData) {
      state.userData = userData
    },
    logout(state, userData) {
      state.userData = userData
    },
    receiveMovies(state, movies) {
      state.movies = movies
    }
  },
  actions: {
    receiveUser(context, userData) {
      localStorage.setItem('authData', JSON.stringify(userData))
      context.commit('receiveUser', userData)
    },
    logout(context, userData) {
      localStorage.setItem('authData', JSON.stringify(userData))
      context.commit('logout', userData)
    },
    getMovieById(context, id) {
      return new Promise(async (resolve, reject) => {
        const docRef = db.collection('movies').doc(id)
        try {
          const doc = await docRef.get()
          if (doc.exists) {
            resolve({
              id: doc.id,
              ...doc.data(),
              releaseDate: utils.getDateFromSeconds(
                doc.data().releaseDate.seconds
              )
            })
          } else {
            throw Error('No movie...')
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    requestMovies(context) {
      db.collection('movies')
        .get()
        .then(querySnapshot => {
          context.commit(
            'receiveMovies',
            querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              releaseDate: utils.getDateFromSeconds(
                doc.data().releaseDate.seconds
              )
            }))
          )
        })
    }
  }
})
