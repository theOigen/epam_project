/* eslint-disable space-before-function-paren */
import db from './firebaseInit'

export default {
  async requestMovies() {
    try {
      const querySnapshot = await db.collection('movies').get()
      const mappedMovies = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        releaseDate: doc.data().releaseDate.toDate()
      }))
      return mappedMovies
    } catch (error) {
      console.log(error)
    }
  },
  async getMovieComments(movieId) {
    try {
      const comments = []
      const querySnapshot = await db
        .collection('movies')
        .doc(movieId)
        .collection('comments')
        .orderBy('postedAt')
        .onSnapshot()
      querySnapshot.forEach(doc => {
        comments.push({ id: doc.id, ...doc.data() })
      })
      return comments
    } catch (error) {
      console.log(error)
    }
  },
  async getMovieById(id) {
    const docRef = db.collection('movies').doc(id)
    try {
      const doc = await docRef.get()
      if (doc.exists) {
        return {
          id: doc.id,
          ...doc.data(),
          releaseDate: doc.data().releaseDate.toDate()
        }
      } else {
        throw Error('No movie...')
      }
    } catch (error) {
      console.log(error)
    }
  }
}
