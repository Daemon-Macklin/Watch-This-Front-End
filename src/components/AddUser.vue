<template>
  <div id="app">
    <h2 class="ui header" id="title">Sign Up</h2>
    <form @submit.prevent="submit" class="ui form">
      <div class="three fields">
        <div class="field" :class="{ 'form-group--error': $v.userName.$error }">
          <label class="label">User Name </label>
          <input class="form__input" v-model.trim="userName"/>
        </div>
        <div class="field" :class="{ 'form-group--error': $v.email.$error }">
          <label class="label">Email </label>
          <input class="form__input" v-model.trim="email"/>
        </div>
        <div class="field" :class="{ 'form-group--error': $v.password.$error }">
          <label class="label">Password </label>
          <input class="form__input" type="password" v-model.trim="password"/>
        </div>
      </div>
      <p>
        <button class="ui positive button" type="submit" :disabled="submitStatus === 'PENDING'">Sign Up</button>
      </p>
      <p class="typo__p" v-if="submitStatus === 'OK'">User Added</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Submitting</p>
    </form>
  </div>
</template>

<script>
import WatchThisService from '@/services/watchthisservice'
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import VueSweetalert from 'vue-sweetalert'
import { required, minLength } from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})
Vue.use(Vuelidate)
Vue.use(VueSweetalert)

export default {
  name: 'AddUser',
  data () {
    return {
      submitStatus: null,
      userName: '',
      email: '',
      password: ''
    }
  },
  validations: {
    userName: {
      required,
      minLength: minLength(3)
    },
    email: {
      required,
      minLength: minLength(3)
    },
    password: {
      required,
      minLength: minLength(5)
    }
  },
  methods: {
    submit: function () {
      console.log('submiting...')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          let user = {
            userName: this.userName,
            email: this.email,
            password: this.password
          }
          this.submitUser(user)
        }, 500)
      }
    },
    submitUser: function (user) {
      WatchThisService.addUser(user)
        .then(response => {
          console.log(response)
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
  }
  h2, label{
    color:ghostwhite;
  }
  button{
    color: darkblue;
  }
</style>
