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
    <h4 class="ui horizontal divider"></h4>
    <div class="ui center aligned raised container segment" id="app">
      <h2 class="ui header" id="title"> Statistics </h2>
      <div class="ui inverted tiny six statistics">
        <div class="statistic">
          <div class="value">
            {{stats.totalMedia}}
          </div>
          <div class="label">
            Total Media
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{stats.totalGames}}
          </div>
          <div class="label">
            Total Games
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{stats.totalMovies}}
          </div>
          <div class="label">
            Total Movies
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{stats.totalVotes}}
          </div>
          <div class="label">
            Total UpVotes
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{stats.totalReviews}}
          </div>
          <div class="label">
            Total Reviews
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{stats.averageRating}}
          </div>
          <div class="label">
            Average Rating
          </div>
        </div>
      </div>
    </div>
    <h4 class="ui horizontal divider"></h4>
    <div class="ui center aligned raised container segment" id="app">
      <h2 class="ui header" id="title"> About {{media.title}} </h2>
      <div class="ui two cards">
        <div class="ui left aligned center aligned raised card">
          <div class="ui left aligned raised container segment">
            <div class="ui relaxed divided items">
              <div class="item">
                <i class="fa Large middle aligned fa-film" v-if="media.type === 'Movie'"> </i>
                <i class="fa Large middle aligned fa-gamepad" v-if="media.type === 'Game'"> </i>
                <div class="content">
                  <p class="header">  Type </p>
                  <div class="description">
                    {{media.type}}
                  </div>
                </div>
              </div>
              <div class="item">
                <i class="Large cog middle aligned icon"></i>
                <div class="content">
                  <p class="header">Genre</p>
                  <div class="description">
                    {{media.genre}}
                  </div>
                </div>
              </div>
              <div class="item">
                <i class="Large thumbs up outline middle aligned icon" v-if="rating === 'GOOD'"></i>
                <i class="Large thumbs down outline middle aligned icon" v-if="rating === 'BAD'"></i>
                <div class="content">
                  <p class="header">Rating</p>
                  <div class="description">
                    {{media.rating}}
                  </div>
                </div>
              </div>
              <div class="item">
                <i class="Large user middle aligned icon"></i>
                <div class="content">
                  <p class="header">Submitted by</p>
                  <div class="description">
                    {{userName}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ui right aligned center aligned raised card">
          <div class="ui left aligned raised container segment" style="width:100%; height:100%;">
             <youtube style="width:100%; height:100%;" :video-id="videoId" ref="youtube"></youtube>
          </div>
        </div>
      </div>
      <h4 class="ui horizontal divider"></h4>
      <div class="ui center aligned raised container segment">
        <div class="form group">
          <button class="ui positive button" v-on:click="getRandomMedia"> Random Media</button>
          <select class="ui selection dropdown" id="type" name="type" type="text" v-model="type">
            <option value="null" selected disabled hidden>Genre</option>
            <option value="Movie">Movie</option>
            <option value="Game">Game</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import WatchThisService from '@/services/watchthisservice'
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Home Page',
      rating: 'GOOD',
      highestMovie: null,
      highestReview: null,
      highestReviewUser: '',
      type: 'Movie',
      media: null,
      userName: 'Anonymous',
      videoId: '',
      stats: null,
      errors: []
    }
  },
  // When page is loaded do this
  created () {
    this.getStats()
    this.getRandomMedia()
    this.getHomeData()
  },
  methods: {
    // Method to get the statistics to display
    getStats: function () {
      WatchThisService.getStats()
        .then(response => {
          this.stats = response.data
          console.log(this.stats)
        })
        .catch(error => {
          this.errors.push(error)
        })
    },
    // Method that gets a randomly selected media from the backend
    getRandomMedia: function () {
      WatchThisService.getRandomMedia(this.type)
        .then(response => {
          this.media = response.data
          if (this.media.rating < 2.5) {
            this.rating = 'BAD'
          }
          if (this.media.youtubeLink === '') {
            this.videoId = 'dQw4w9WgXcQ'
            console.log('A')
          } else {
            if (this.media.youtubeLink.substring(0, 5) === 'https') {
              this.videoId = this.media.youtubeLink.substring(32)
              console.log('B')
            } else {
              this.videoId = this.media.youtubeLink
              console.log('C')
            }
          }
        })
        .catch(error => {
          this.error.push(error)
        })
    },
    // Method that gets the username for the random media
    getUserName: function (id) {
      console.log('Getting username')
      if (id === '') {
        this.userName = 'Anonymous'
      } else {
        WatchThisService.getUserName(id)
          .then(response => {
            this.userName = response.data
          })
          .catch(error => {
            this.errors.push(error)
            this.userName = 'Anonymous'
          })
      }
    },
    // Method that gets the best media and best review
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
    // Method that gets username for the best review
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
