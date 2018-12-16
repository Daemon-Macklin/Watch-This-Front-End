<template>
  <div>
    <div class="ui center aligned raised container segment" id="app">
      <h2 class="ui header" id="title">{{msg}}</h2>
    </div>
    <h4 class="ui horizontal divider"></h4>
    <div v-if="signedIn === 'false'">
      <div class="ui center aligned raised container segment"  id="app">
        <h2 class="ui header" id="title"  >Please login or sign up</h2>
        <add-user/>
      </div>
    </div>
    <div v-if="signedIn === 'true'">
    <div class="ui center aligned raised container segment"  id="app">
      <h2 class="ui header" id="title"  > User Info </h2>
      <h2>{{userName}}</h2>
      <button class="ui negative button" value="logout" v-on:click="logout()">Logout</button>
    </div>
    <h4 class="ui horizontal divider"></h4>
      <div class="ui center aligned raised container segment" id="app">
        <h2 class="ui header" id="title"> Media Submitted </h2>
        <v-client-table :columns="mediaColumns" :data="media" :options="mediaOptions" v-if="hasMedia === 'true'">
          <template slot="_id" slot-scope="props">
            <b-link :to="{ name: 'ViewMedia', params: {mediaId: props.row._id}}">
              <i class="center aligned fa fa-search " style="padding: 5px"></i>
            </b-link>
          </template>
        </v-client-table>
        <h2 v-if="hasMedia === 'false'">No Media Submitted</h2>
      </div>
      <h4 class="ui horizontal divider"></h4>
      <div class="ui center aligned raised container segment" id="app">
        <h2 class="ui header" id="title"> My Reviews </h2>
        <v-client-table :columns="reviewColumns" :data="review" :options="reviewOptions" ref="reviews" v-if="hasReview === 'true'">
        </v-client-table>
        <h2 v-if="hasReview === 'false'">No Reviews Submitted</h2>
      </div>
  </div>
  </div>
</template>

<script>
import WatchThisService from '@/services/watchthisservice'
import Cookies from 'vue-cookies'
import Vue from 'vue'
import AddUser from '@/components/AddUser'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})
Vue.use(Cookies)

// import App from '@/App'
export default {
  name: 'User',
  data () {
    return {
      msg: 'User',
      signedIn: null,
      userName: null,
      email: null,
      id: null,
      media: null,
      review: null,
      errors: [],
      hasMedia: 'false',
      hasReview: 'false',
      mediaColumns: ['type', 'title', 'genre', 'rating', '_id'],
      mediaOptions: {
        headings: {
          type: 'Type',
          title: 'Title',
          genre: 'Genre',
          rating: 'Rating',
          _id: 'View'
        }
      },
      reviewColumns: ['review', 'score'],
      reviewOptions: {
        headings: {
          review: 'Review',
          score: 'Rating'
        }
      }
    }
  },
  created () {
    this.isSignedIn()
  },
  components: {
    'add-user': AddUser
  },
  methods: {
    isSignedIn: function () {
      let token = {
        token: this.$cookies.get('token')
      }
      if (token.token != null) {
        WatchThisService.authToken(token)
          .then(response => {
            console.log('Here2')
            if (response.data === 'Invalid Token') {
              console.log(response.data)
              this.logout()
            } else {
              console.log('Valid Token')
              this.getUserData()
            }
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      } else {
        this.signedIn = 'false'
      }
    },
    getUserData: function () {
      let id = this.$cookies.get('id')
      console.log(id)
      WatchThisService.getUser(id)
        .then(response => {
          console.log(response)
          if (response.data != null) {
            this.signedIn = 'true'
            this.id = response.data._id
            this.userName = response.data.userName
            this.email = response.data.email
            this.loadMedia()
            this.loadReview()
          } else {
            this.signedIn = 'false'
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    logout: function () {
      console.log('Logging out')
      this.$cookies.remove('token')
      this.$cookies.remove('id')
      this.$cookies.remove('userName')
      window.location = '/home'
    },
    loadMedia: function () {
      WatchThisService.fetchAllUserMedia(this.id)
        .then(response => {
          this.media = response.data
          if (this.media.length === 'No media found for user') {
            this.hasMedia = 'false'
          } else {
            this.hasMedia = 'true'
          }
          console.log(this.media)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    loadReview: function () {
      WatchThisService.fetchAllUserReview(this.id)
        .then(response => {
          this.review = response.data
          if (this.review === 'No reviews found for user') {
            this.hasReview = 'false'
          } else {
            this.hasReview = 'true'
          }
          console.log(this.review)
        })
        .catch(error => {
          this.errors.push(error)
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
