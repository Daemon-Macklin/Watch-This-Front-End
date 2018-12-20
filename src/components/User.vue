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
      <h2 v-if="update === 'false'">{{userName}}</h2>
      <div v-if="update === 'true'">
        <form @submit.prevent="submitUpdate" class="ui form">
          <div class="ui field">
            <label class="label"> Username
              <div class="ui action input">
                <input type="text" placeholder="New User Name" v-model.trim="$v.newUserName.$model">
                <button class="ui positive button" value="submit" type="submit" :disabled="submitStatus === 'PENDING'">Update</button>
              </div>
            </label>
          </div>
          <p class="typo__p" v-if="submitStatus === 'ERROR'">UserName Invalid</p>
        </form>
      </div>
      <div class="ui buttons">
      <button class="ui negative button" value="logout" v-on:click="logout()">Logout</button>
      <button class="ui primary button" value="updateName" v-if="update === 'false'" v-on:click="showUpdateUserName()">Update</button>
        <button class="ui primary button" value="updateName" v-if="update === 'true'" v-on:click="cancelUpdateUserName()">Cancel</button>
      </div>
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
          <template slot="remove" slot-scope="props">
            <b-link>
              <i class="center aligned trash icon" v-on:click="removeMedia(props.row._id)"></i>
            </b-link>
          </template>
        </v-client-table>
        <h2 v-if="hasMedia === 'false'">No Media Submitted</h2>
      </div>
      <h4 class="ui horizontal divider"></h4>
      <div class="ui center aligned raised container segment" id="app">
        <h2 class="ui header" id="title"> My Reviews </h2>
        <v-client-table :columns="reviewColumns" :data="review" :options="reviewOptions" ref="reviews" v-if="hasReview === 'true'">
          <template slot="view" slot-scope="props">
            <b-link :to="{ name: 'ViewMedia', params: {mediaId: props.row.mediaData}}">
              <i class="center aligned fa fa-search " style="padding: 5px"></i>
            </b-link>
          </template>
          <template slot="remove" slot-scope="props">
            <b-link>
              <i class="center aligned trash icon" v-on:click="removeReview(props.row.mediaData, props.row.review._id)"></i>
            </b-link>
          </template>
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
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import VueSweetalert from 'vue-sweetalert'
import { required } from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})
Vue.use(Vuelidate)
Vue.use(VueSweetalert)

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
      submitStatus: null,
      update: 'false',
      newUserName: '',
      errors: [],
      hasMedia: 'false',
      hasReview: 'false',
      mediaColumns: ['type', 'title', 'genre', 'rating', '_id', 'remove'],
      mediaOptions: {
        headings: {
          type: 'Type',
          title: 'Title',
          genre: 'Genre',
          rating: 'Rating',
          _id: 'View',
          remove: 'Remove'
        }
      },
      reviewColumns: ['review.review', 'review.score', 'review.upvotes', 'view', 'remove'],
      reviewOptions: {
        headings: {
          review: 'Review',
          score: 'Rating',
          view: 'View',
          upvotes: 'UpVotes',
          remove: 'Remove'
        }
      }
    }
  },
  validations: {
    newUserName: {
      required
    }
  },
  // When page loads do this
  created () {
    this.isSignedIn()
  },
  // Other components used in this components
  components: {
    'add-user': AddUser
  },
  methods: {
    // Method to check if user is signedin
    // and check token
    isSignedIn: function () {
      // Create an object called token and insert the
      // token stored in vue cookies
      let token = {
        token: this.$cookies.get('token')
      }
      // If the token is not null
      if (token.token != null) {
        // Send the token to the backend for authentication
        WatchThisService.authToken(token)
          .then(response => {
            // If the response is "Invalid Token" the token
            if (response.data === 'Invalid Token') {
              // Log out the user
              this.logout()
            } else {
              // Else the user has a valid token and we
              // can get the data
              this.getUserData()
            }
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
        // If the token is null
      } else {
        // Don't sign in the user
        this.signedIn = 'false'
      }
    },
    // Method to get the users data
    getUserData: function () {
      // Get the user id stored in the cookies
      let id = this.$cookies.get('id')
      console.log(id)
      // Get the user with the id
      WatchThisService.getUser(id)
        .then(response => {
          console.log(response)
          // If the response.data is not null
          if (response.data != null) {
            // Set all of the relevant data
            this.signedIn = 'true'
            this.id = response.data._id
            this.userName = response.data.userName
            this.email = response.data.email
            // Load the user data
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
    // Method to log out the user
    logout: function () {
      console.log('Logging out')
      // Remove the cookies we set
      this.$cookies.remove('token')
      this.$cookies.remove('id')
      this.$cookies.remove('userName')
      // Send the user to the home page
      window.location = '/home'
    },
    // Method to get the users media
    loadMedia: function () {
      WatchThisService.fetchAllUserMedia(this.id)
        .then(response => {
          this.media = response.data
          if (this.media === 'No media found for user') {
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
    // Method to get the users reviews
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
    },
    // Method to remove a users media
    removeMedia: function (id) {
      console.log(id)
      // Get the token and ensure it is valid
      let token = {
        token: this.$cookies.get('token')
      }
      console.log(token.token)
      if (token.token != null) {
        WatchThisService.authToken(token)
          .then(response => {
            // If the token is valid
            if (response.data !== 'Invalid Token') {
              // Remove the media
              WatchThisService.removeMedia(id)
                .then(response => {
                  console.log(response.data)
                  this.loadMedia()
                })
                .catch(error => {
                  console.log(error)
                })
            } else {
              console.log('Invalid Token')
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        console.log('Invalid Token')
      }
    },
    // Method to remove a review
    removeReview: function (mediaId, id) {
      // get the token and validate it
      let token = {
        token: this.$cookies.get('token')
      }
      console.log(token.token)
      if (token.token != null) {
        WatchThisService.authToken(token)
          .then(response => {
            // If the token is valid
            if (response.data !== 'Invalid Token') {
              // Remove the review
              WatchThisService.removeReview(mediaId, id)
                .then(response => {
                  console.log(response.data)
                  this.loadReview()
                })
                .catch(error => {
                  console.log(error)
                })
            } else {
              console.log('Invalid Token')
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        console.log('Invalid Token')
      }
    },
    // Method to show the update username form
    showUpdateUserName: function () {
      this.update = 'true'
    },
    // Method to hide the username form
    cancelUpdateUserName: function () {
      this.update = 'false'
      this.newUserName = ''
    },
    // Method to get update username
    submitUpdate: function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          let newUserObject = {
            newUserName: this.newUserName
          }
          WatchThisService.updateUserName(this.$cookies.get('id'), newUserObject)
            .then(response => {
              console.log(response)
              this.$cookies.set('userName', this.newUserName)
              location.reload()
            })
            .catch(error => {
              this.errors.push(error)
            })
          this.update = 'false'
        })
      }
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
