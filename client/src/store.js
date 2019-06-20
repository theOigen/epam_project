/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import Vuex from 'vuex'
import db from './database/firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: JSON.parse(localStorage.getItem('authData')) || {
      authenticated: false,
      currentUser: null
    },
    movies: [],
    movieComments: []
  },
  getters: {
    isLoggedIn: state => state.userData.authenticated,
    userLogin: state => state.userData.currentUser.login,
    movies: state => state.movies,
    movieComments: state => state.movieComments
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
    },
    receiveComments(state, comments) {
      state.movieComments = comments
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
      return new Promise((resolve, reject) => {
        const docRef = db.collection('movies').doc(id)
        docRef
          .get()
          .then(doc => {
            if (doc.exists) {
              resolve({
                id: doc.id,
                ...doc.data(),
                releaseDate: doc.data().releaseDate.toDate()
              })
            } else {
              reject(new Error('Movie not founded..'))
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    addComment(context, { movieId, userComment }) {
      db.collection('movies')
        .doc(movieId)
        .collection('comments')
        .add({
          message: userComment,
          postedAt: new Date(),
          author: context.getters.userLogin
        })
    },
    getMovieComments(context, movieId) {
      db.collection('movies')
        .doc(movieId)
        .collection('comments')
        .orderBy('postedAt', 'desc')
        .onSnapshot(querySnapshot => {
          const comments = []
          querySnapshot.forEach(doc => {
            comments.push({
              id: doc.id,
              ...doc.data(),
              postedAt: doc.data().postedAt.toDate()
            })
          })
          context.commit('receiveComments', comments)
        })
    },
    requestMovies(context) {
      db.collection('movies')
        .get()
        .then(querySnapshot => {
          const mappedMovies = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            releaseDate: doc.data().releaseDate.toDate()
          }))
          context.commit('receiveMovies', mappedMovies)
        })
    }
  }
})
