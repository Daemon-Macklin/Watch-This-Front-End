<template>
  <div class="ui raised container segment" id="app">
    <form @submit.prevent="submit" class="ui form">
        <div class="field" :class="{ 'form-group--error': $v.reviewText.$error }">
          <label class="label">Review </label>
          <input class="form__input" v-model.trim="reviewText"/>
        </div>
        <div class="field">
          <label class="label">Score </label>
          <input class="form__input" v-model.trim="score"/>
        </div>
      <p>
        <button class="ui positive button" type="submit" :disabled="submitStatus === 'PENDING'">Submit</button>
      </p>
      <p class="typo__p" v-if="submitStatus === 'OK'">Media Submitted</p>
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
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})
Vue.use(Vuelidate)
Vue.use(VueSweetalert)

export default {
  name: 'AddReview',
  data () {
    return {
      reviewText: '',
      score: 0,
      submitStatus: null
    }
  },
  validations: {
    reviewText: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    }
  },
  methods: {
    submitMedia: function (review) {
      WatchThisService.postMedia(review)
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
          let review = {
            reviewText: this.reviewText,
            score: this.score,
            upvotes: 0,
            userId: ''
          }
          this.review = review
          this.submitMedia(this.review)
        }, 500)
      }
    }
  }
}
</script>

<style scoped>

</style>
