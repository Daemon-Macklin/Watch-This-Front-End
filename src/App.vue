<template>
  <div>
    <b-navbar-nav class="ui left fixed vertical menu" id="menu">
    <div class="item">
        <img class="ui small image" src="https://media1.tenor.com/images/a79023c01372d18caedda850481aed68/tenor.gif?itemid=3532334">
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
          <b-nav-item id="about" to="/about" v-on:click="setActive('about')" class ="link item">
            <p id="menuItem">
              <i class="fa fa-question" style="padding: 5px"></i>About
            </p>
          </b-nav-item>
      </b-navbar-nav>
    <div class="ui right fixed vertical menu" id="menu">
      <div class="ui raised container segment">
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
          <button class="ui positive button" type="submit" :disabled="submitStatus === 'PENDING'">Login</button>
        </p>
        <p class="typo__p" v-if="submitStatus === 'EMAIL'">User Not Found</p>
        <p class="typo__p" v-if="submitStatus === 'PASSWORD'">Invalid Password</p>
        <p class="typo__p" v-if="submitStatus === 'SIGNIN'">Signed In</p>
      </form>
    </div>
    </div>
  <router-view/>
  </div>
</template>

<script>
import WatchThisService from '@/services/watchthisservice'
import Vue from 'vue'
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

export default {
  name: 'App',
  data () {
    return {
      activeItem: '',
      email: '',
      password: '',
      submitStatus: null
    }
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  methods: {
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
    login: function () {
      console.log('submiting...')
      console.log('submit!')
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
    submitUser: function (user) {
      WatchThisService.login(user)
        .then(response => {
          console.log(response.data)
          if (response.data === 'Invalid Password') {
            console.log('Invalid Password')
            this.submitStatus = 'PASSWORD'
          } else if (response.data === "Can't find user") {
            console.log('User not found')
            this.submitStatus = 'EMAIL'
          } else {
            this.submitStatus = 'SIGNIN'
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
