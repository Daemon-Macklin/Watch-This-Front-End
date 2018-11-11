<template>
  <div class="ui raised container segments">
    <div class="ui raised container segment" id=".vue-title">
    <h2 class="ui header">{{msg}}</h2>
    </div>
    <div class="ui raised container segment" id="data">
      <form @submit.prevent="submit">
        <div class="form-group">
          <label class="form-label">Select Payment Type</label>
          <select id="paymenttype" name="paymenttype" class="form-control" type="text" v-model="paymenttype">
            <option value="null" selected disabled hidden>Choose Payment Type</option>
            <option value="Direct">Direct</option>
            <option value="PayPal">PayPal</option>
            <option value="Visa">Visa</option>
          </select>
        </div>
        <div class="form-group" :class="{ 'form-group--error': $v.amount.$error }">
          <label class="form-control-label" name="amount">Amount (Enter a number between 1 and 1000)</label>
          <input class="form__input" type="number" v-model.trim="amount"/>
        </div>
        <div class="error" v-if="!$v.amount.between">Amount must be between 1 and 1000</div>
        <div class="form-group" :class="{ 'form-group--error': $v.message.$error }">
          <label class="form__label">Personal Message</label>
          <input class="form__input" v-model.trim="$v.message.$model"/>
        </div>
        <div class="error" v-if="!$v.message.required">Message is Required</div>
        <div class="error" v-if="!$v.message.minLength">Message must have at least {{$v.message.$params.minLength.min}} letters.</div>
        <p>
          <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Make Donation</button>
        </p>
        <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your Donation!</p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Donating...</p>
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
      type: '',
      title: '',
      youtubeLink: '',
      rating: 0,
      userId: '',
      reviews: []
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
            rating: this.rating,
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

</style>
