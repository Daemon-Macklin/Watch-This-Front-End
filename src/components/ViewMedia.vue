<template>
  <div>
    <div class="ui center aligned raised container segment" id="app">
      <h2 class="ui header" id="title">{{media.title}}
        <i id="titleIcon" class="fa white fa-film" style="padding: 5px" v-if="media.type === 'Movie'"></i>
        <i id="titleIcon" class="fa white fa-gamepad" style="padding: 5px" v-if="media.type === 'Game'"></i>
      </h2>
    </div>
    <h4 class="ui horizontal divider"></h4>
    <div class="ui center aligned raised container segment" id="app">
      <h2 class="ui header" id="title"> About {{media.title}} </h2>
      <div class="ui two cards">
      <div class="ui left fixed center aligned raised card">
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
                  {{username}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui right fixed center aligned raised card">
        <div class="ui left aligned raised container segment" style="width:100%; height:100%;">
            <youtube style="width:100%; height:100%;" :video-id="videoId" ref="youtube"></youtube>
        </div>
      </div>
    </div>
    </div>
    <h4 class="ui horizontal divider"></h4>
    <div class="ui center aligned raised container segment" id="app">
      <add-review/>
    </div>
      <h4 class="ui horizontal divider"></h4>
      <div class="ui center aligned raised container segment" id="app">
        <h2 class="ui header" id="title">Reviews </h2>
        <v-client-table :columns="columns" :data="media.reviews" :options="options">
          <template slot="upvotes" slot-scope="props">
            <b-link>
              <p>
                <i class="center aligned thumbs up icon" style="padding: 5px">{{props.row.upvotes}}</i>
              </p>
            </b-link>
          </template>
        </v-client-table>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import WatchThisService from '@/services/watchthisservice'
import AddReview from '@/components/AddReview'
import VueYoutube from 'vue-youtube'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})
Vue.use(VueYoutube)

// import Vue from 'vue'

export default {
  name: 'ViewMedia',
  data () {
    return {
      media: null,
      username: null,
      errors: [],
      rating: 'GOOD',
      videoId: '',
      columns: ['review', 'score', 'upvotes', 'userId'],
      options: {
        headings: {
          review: 'Review',
          userId: 'User',
          score: 'Rating',
          upvotes: 'Upvotes'
        }
      }
    }
  },
  components: {
    'add-review': AddReview
  },
  created () {
    this.getMedia()
    this.getUserName()
  },
  methods: {
    getMedia: function () {
      let id = this.$route.params.mediaId
      WatchThisService.getMediaById(id)
        .then(response => {
          this.media = response.data[0]
          console.log('------------------------')
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
          this.errors.push(error)
          // console.log(error)
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
  h2{
    color:ghostwhite;
  }
  i{
    color: black;
  }
  #titleIcon {
    color:ghostwhite;
  }
</style>
