import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: 'https://watch-thisv1.herokuapp.com'
  })
}
