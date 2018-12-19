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
  },
  authToken (token) {
    return Api().post('/user/auth', token,
      {headers: {'Content-type': 'application/json'}})
  },
  getUser (id) {
    return Api().get(`/user/${id}`)
  },
  addUser (user) {
    return Api().post('/user', user,
      {headers: {'Content-type': 'application/json'}})
  },
  fetchAllUserMedia (id) {
    return Api().get(`/media/findUserMedia/${id}`)
  },
  fetchAllUserReview (id) {
    return Api().get(`/media/findUserReview/${id}`)
  },
  removeMedia (id) {
    return Api().delete(`media/${id}/removeMedia`)
  }
}
