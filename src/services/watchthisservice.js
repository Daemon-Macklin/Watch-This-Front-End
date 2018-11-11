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
  }
}
