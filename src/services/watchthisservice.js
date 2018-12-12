import Api from '@/services/api'

export default {
  fetchAllMedia () {
    return Api().get('/media')
  },
  fetchAllMovies () {
    return Api().get('/media/movies')
  },
  fetchAllGames () {
    return Api().get('/media/games')
  },
  postMedia (media) {
    return Api().post('/media', media,
      {headers: {'Content-type': 'application/json'}})
  },
  postReview (review, id) {
    return Api().post(`/media/${id}/addReview`, review,
      {headers: {'Content-type': 'application/json'}})
  },
  login (user) {
    return Api().post('/user/signin', user,
      {headers: {'Content-type': 'application/json'}})
  },
  getMediaById (id) {
    return Api().get(`/media/${id}`)
  },
  getUserName (id) {
    return Api().get(`/user/findUserName/${id}`)
  },
  upvote (id, reviewId) {
    return Api().put(`/media/${id}/upvoteReview/${reviewId}`)
  }
}
