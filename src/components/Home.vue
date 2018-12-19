<template>
  <div>
    <div class="ui center aligned raised container segment" id="app">
      <h2 class="ui header" id="title">{{msg}}</h2>
    </div>
    <h4 class="ui horizontal divider"></h4>
    <div class="ui center aligned raised container segment" id="app">
      <h2 class="ui header" id="title"> What's good?</h2>
       <div class="ui two cards">
         <div class="ui card">
           <div class="ui content">
           <div class="ui header">Best Media
             <div class="meta">The highest rated Media!</div>
           </div>
             <div class="ui two cards">
             <div class="ui left aligned raised card" id="displayCard">
               <p>Title: {{highestMovie.title}}</p>
               <p>Type: {{highestMovie.type}}</p>
               <p>Rating: {{highestMovie.rating}}</p>
             </div>
               <div class="ui centered aligned raised card">
                 <b-link :to="{ name: 'ViewMedia', params: {mediaId: highestMovie._id}}">
                   <i class="center aligned fa fa-search " style="padding: 5px"></i>
                   <a> More Details</a>
                 </b-link>
                 <b-link>
                   <i class="center aligned youtube icon" style="padding: 5px"></i>
                    <a target="_blank" v-bind:href="''+highestMovie.youtubeLink+''"> YoutubeLink</a>
                 </b-link>
               </div>
             </div>
           </div>
         </div>
         <div class="ui card">
           <div class="ui content">
             <div class="ui header">Best Review
               <div class="meta">The most upvoted Review!</div>
             </div>
             <div class="ui two cards">
               <div class="ui left aligned raised card" id="displayCard">
                  <p>{{highestReview.review.review}}</p>
                  <p>Score: {{highestReview.review.score}}</p>
                  <p>Upvotes: {{highestReview.review.upvotes}}</p>
                  </div>
               <div class="ui centered aligned raised card">
                 <p>User: {{highestReviewUser}}</p>
                 <b-link :to="{ name: 'ViewMedia', params: {mediaId: highestReview.mediaId}}">
                   <i class="center aligned fa fa-search " style="padding: 5px"></i>
                   <a> More Details</a>
                 </b-link>
               </div>
                </div>
              </div>
            </div>
           </div>
         </div>
       </div>
</template>

<script>
// import Vue from 'vue'
import WatchThisService from '@/services/watchthisservice'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Home Page',
      highestMovie: null,
      highestReview: null,
      highestReviewUser: '',
      errors: []
    }
  },
  created () {
    this.getHomeData()
  },
  methods: {
    getHomeData: function () {
      console.log('Getting data')
      WatchThisService.getHighestMedia()
        .then(response => {
          this.highestMovie = response.data
          console.log(this.highestMovie)
        })
        .catch(error => {
          this.errors.push(error)
        })
      WatchThisService.getHighestReview()
        .then(response => {
          this.highestReview = response.data
          console.log(this.highestReview)
          this.getReviewUserName()
        })
        .catch(error => {
          this.errors.push(error)
        })
    },
    getReviewUserName: function () {
      console.log('Here')
      let id = this.highestReview.review.userId
      if (id === '') {
        this.highestReviewUser = 'Anonymous'
      } else {
        console.log(id)
        WatchThisService.getUserName(id)
          .then(response => {
            console.log(response.data)
            this.highestReviewUser = response.data
          })
          .catch(errors => {
            this.errors.push(errors)
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #app{
    width: 65%;
    margin: 0 auto;
    background-color: slategray;
  }
  h2{
    color:ghostwhite;
  }
  i{
    color:black;
  }
</style>
