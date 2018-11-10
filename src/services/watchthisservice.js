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
  }
}
