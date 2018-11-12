<template>
  <div>
    <div class="ui center aligned raised container segment" id="app">
    <h2 class="header">{{msg}}</h2>
    </div>
    <h4 class="ui horizontal divider">
    </h4>
    <div class="ui raised container segment" id="app">
      <form @submit.prevent="submit" class="ui form">
        <div class="two fields">
          <div class="field" :class="{ 'form-group--error': $v.title.$error }">
            <label class="label">Title </label>
            <input class="form__input" v-model.trim="$v.title.$model"/>
          </div>
          <div class="field">
            <label class="label">Youtube Link </label>
            <input class="form__input" v-model.trim="youtubeLink"/>
          </div>
        </div>
        <div class="two fields">
          <div class="field">
            <label class="label">Genre </label>
            <select id="genre" name="genre" class="form-control" type="text" v-model="genre">
              <option value="null" selected disabled hidden>Genre</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Comedy">Comedy</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Animation">Animation</option>
            </select>
          </div>
          <div class="field">
            <label class="label">Type </label>
            <select id="type" name="type" class="form-control" type="text" v-model="type">
              <option value="null" selected disabled hidden>Genre</option>
              <option value="Movie">Movie</option>
              <option value="Game">Game</option>
            </select>
          </div>
        </div>
        <p>
          <button class="ui positive button" type="submit" :disabled="submitStatus === 'PENDING'">Submit</button>
        </p>
        <p class="typo__p" v-if="submitStatus === 'OK'">Media Submitted</p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Submitting</p>
      </form>
    </div>
  </div>
</template>

<script>
// import { required, minLength, between } from 'vuelidate/lib/validators'
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
  name: 'AddMedia',
  data () {
    return {
      errors: [],
      msg: 'Add Media',
      type: 'Undefined',
      title: '',
      genre: 'Undefined',
      youtubeLink: '',
      userId: '',
      reviews: [],
      submitStatus: null
    }
  },
  validations: {
    title: {
      required,
      minLength: minLength(3)
    }
  },
  methods: {
    submitMedia: function (media) {
      WatchThisService.postMedia(media)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    submit () {
      console.log('submiting...')
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          let media = {
            title: this.title,
            type: this.type,
            genre: this.genre,
            youtubeLink: this.youtubeLink,
            userId: '',
            reviews: []
          }
          this.media = media
          this.submitMedia(this.media)
        }, 500)
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
  }
  h2, label{
    color:ghostwhite;
  }
  button{
    color: darkblue;
  }
</style>
