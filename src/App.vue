<template>
  <div>
    <b-navbar-nav class="ui left fixed vertical menu" id="menu">
    <div class="item">
        <img class="ui large avatar centered image" src="https://media1.tenor.com/images/a79023c01372d18caedda850481aed68/tenor.gif?itemid=3532334">
    </div>
          <b-nav-item id="home" to="/#" v-on:click="setActive('home')" class="link item">
            <p id="menuItem">
              <i class="fa fa-home" style="padding: 5px"></i>Home
            </p>
          </b-nav-item>
          <b-nav-item id="allmedia" to="/allmedia" v-on:click="setActive('allmedia')" class ="link item">
            <p id="menuItem">
              <i class="fa fa-book" style="padding: 5px"></i>All Media
            </p>
          </b-nav-item>
          <b-nav-item id="movies" to="/movies" v-on:click="setActive('movies')" class ="link item">
            <p id="menuItem">
              <i class="fa fa-film" style="padding: 5px"></i>Movies
            </p>
          </b-nav-item>
          <b-nav-item id="games" to="/games" v-on:click="setActive('games')" class ="link item">
            <p id="menuItem">
              <i class="fa fa-gamepad" style="padding: 5px"></i>Games
            </p>
          </b-nav-item>
          <b-nav-item id="addmedia" to="/addmedia" v-on:click="setActive('addmedia')" class ="link item">
            <p id="menuItem">
              <i class="fa fa-plus-square" style="padding: 5px"></i>Add Media
            </p>
          </b-nav-item>
          <b-nav-item id="user" to="/user" v-on:click="setActive('user')" class ="link item">
            <p id="menuItem">
              <i class="fa fa-user" style="padding: 5px"></i>User
            </p>
          </b-nav-item>
          <b-nav-item id="about" to="/about" v-on:click="setActive('about')" class ="link item">
            <p id="menuItem">
              <i class="fa fa-question" style="padding: 5px"></i>About
            </p>
          </b-nav-item>
      </b-navbar-nav>
    <div class="ui right fixed vertical menu" id="menu">
      <div v-if="this.$cookies.get('id') === null" class="ui raised container segment">
      <form @submit.prevent="login" class="ui form">
          <label>Login</label>
          <div class="ui small field">
            <label class="label"> Email
            <input class="form__input" v-model.trim="$v.email.$model"/>
            </label>
          </div>
          <div class="ui small field">
            <label class="label"> Password
            <input class="form__input" type="password" v-model.trim="$v.password.$model"/>
            </label>
          </div>
        <p>
          <button class="ui positive button" value="submit" type="submit" :disabled="submitStatus === 'PENDING'">Login</button>
        </p>
        <p class="typo__p" v-if="submitStatus === 'EMAIL'">User Not Found</p>
        <p class="typo__p" v-if="submitStatus === 'PASSWORD'">Invalid Password</p>
        <p class="typo__p" v-if="submitStatus === 'SIGNIN'">Signed In</p>
      </form>
    </div>
      <div v-if="this.$cookies.get('id') !== null" class="ui raised container segment">
        <h6>Hello {{this.$cookies.get('userName')}}</h6>

      </div>
    </div>
  <router-view/>
  </div>
</template>

<script>
import WatchThisService from '@/services/watchthisservice'
import Vue from 'vue'
import VueForm from 'vueform'
import Cookies from 'vue-cookies'
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
Vue.use(Cookies)

export default {
  name: 'App',
  data () {
    return {
      activeItem: '',
      email: '',
      password: '',
      errors: [],
      submitStatus: null
    }
  },
  // Validations enforced on form
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    // Method to set selected nav item as the active one
    setActive: function (menuItem) {
      console.log(menuItem)
      try {
        document.getElementById(this.activeItem).setAttribute('class', 'link item')
      } catch (e) {
        console.log(e)
      }
      document.getElementById(menuItem).setAttribute('class', 'active link item')
      this.activeItem = menuItem
    },
    // Method to get user data from signin form
    login: function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          let user = {
            email: this.email,
            password: this.password
          }
          this.user = user
          this.submitUser(this.user)
        }, 500)
      }
    },
    // Method to signin
    submitUser: function (user) {
      // Send user data to backend
      WatchThisService.login(user)
        .then(response => {
          // If the password is invalid
          if (response.data === 'Invalid Password') {
            // Inform the user
            console.log('Invalid Password')
            this.submitStatus = 'PASSWORD'
            // If the email is invalid
          } else if (response.data === "Can't find user") {
            // Infrom the user
            console.log('User not found')
            this.submitStatus = 'EMAIL'
            // else signin
          } else {
            this.submitStatus = 'SIGNIN'
            console.log(response.data.userData)
            // Save the returned userdata to cookies
            this.$cookies.set('id', response.data.userData._id)
            this.$cookies.set('token', response.data.token.toString())
            this.$cookies.set('userName', response.data.userData.userName.toString())
            // Send the user to the home page
            window.location = '/home'
          }
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>

<style>
  #menu{
    background-color: slategrey;
  }
  #menuItem{
    color: ghostwhite;
    font-family: "Comic Sans MS", cursive, sans-serif;
  }
  #title{
    color: ghostwhite;
  }
  i{
    color: ghostwhite;
  }
  label{
    color: black;
  }
  p{
    color: black;
    font-family: 'Open Sans', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  }
  #home{
    font-family: 'Open Sans', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  }
</style>
