<template>
  <div id="app">
    <h2 class="ui header" id="title">Submit a Review</h2>
    <form @submit.prevent="submit" class="ui form">
      <div class="two fields">
        <div class="field" :class="{ 'form-group--error': $v.reviewText.$error }">
          <label class="label">Review </label>
          <input class="form__input" v-model.trim="reviewText"/>
        </div>
        <div class="field" :class="{ 'form-group--error': $v.score.$error }">
          <label class="label">Score </label>
          <input class="form__input" v-model.trim="score"/>
          <p> Between 0 and 5</p>
        </div>
      </div>
      <p>
        <button class="ui positive button" type="submit" :disabled="submitStatus === 'PENDING'">Submit</button>
      </p>
      <p class="typo__p" v-if="submitStatus === 'OK'">Review Submitted</p>
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
import { required, minLength, maxLength, between } from 'vuelidate/lib/validators'

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
      score: 2.5,
      submitStatus: null
    }
  },
  validations: {
    reviewText: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(60)
    },
    score: {
      required,
      between: between(0, 5)
    }
  },
  methods: {
    submitReview: function (review) {
      WatchThisService.postReview(review, this.$route.params.mediaId)
        .then(response => {
          console.log(response)
          location.reload()
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    submit () {
      console.log('submiting...')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          let id = ''
          if (this.$cookies.get('id') != null) {
            id = this.$cookies.get('id')
          }
          let review = {
            reviewText: this.reviewText,
            score: this.score,
            upvotes: 0,
            userId: id
          }
          console.log(review.score)
          console.log(review.reviewText)
          this.submitReview(review)
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
