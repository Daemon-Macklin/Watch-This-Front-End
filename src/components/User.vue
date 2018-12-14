<template>
  <div>
    <div class="ui center aligned raised container segment" id="app">
      <h2 class="ui header" id="title">{{msg}}</h2>
    </div>

  </div>
</template>

<script>
import WatchThisService from '@/services/watchthisservice'
import Cookies from 'vue-cookies'
import Vue from 'vue'

Vue.use(Cookies)
// import App from '@/App'
export default {
  name: 'User',
  data () {
    return {
      msg: 'User',
      signedIn: false
    }
  },
  created () {
    this.isSignedIn()
  },
  methods: {
    isSignedIn: function () {
      console.log('Here')
      let token = {
        token: this.$cookies.get('token')
      }
      WatchThisService.authToken(token)
        .then(response => {
          console.log('Here2')
          if (response.data === 'Invalid Token') {
            console.log(response.data)
          } else {
            console.log('Valid Token')
            this.getUserData()
          }
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    getUserData: function () {
      let id = this.$cookies.get('id')
      console.log(id)
      WatchThisService.getUser(id)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

  #app{
    width: 65%;
    margin: 0 auto;
    background-color: slategray;
    color: ghostwhite;
  }
  h2{
    color:ghostwhite;
  }
  i{
    color:black;
  }
</style>
