<template>
  <div>
  <div class="ui center aligned raised container segment" id="app">
    <h2 class="ui header" id="title">{{msg}}</h2>
  </div>
    <h4 class="ui horizontal divider">
    </h4>
    <div class="ui center aligned raised container segment" id="app">
      <v-client-table :columns="columns" :data="media" :options="options">
        <template slot="_id" slot-scope="props">
          <b-link :to="{ name: 'ViewMedia', params: {mediaId: props.row._id}}">
          <i class="center aligned fa fa-search " style="padding: 5px"></i>
          </b-link>
        </template>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import WatchThisService from '@/services/watchthisservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'
Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'AllMedia',
  data () {
    return {
      msg: 'All media',
      media: [],
      errors: [],
      columns: ['type', 'title', 'genre', 'rating', '_id'],
      options: {
        headings: {
          type: 'Type',
          title: 'Title',
          genre: 'Genre',
          rating: 'Rating',
          _id: 'View'
        }
      }
    }
  },
  created () {
    this.loadMedia()
  },
  methods: {
    loadMedia: function () {
      WatchThisService.fetchAllMedia()
        .then(response => {
          this.media = response.data
          console.log(this.media)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    viewItem: function (media) {
      console.log('Item')
      console.log(media)
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
    color:black;
  }
</style>
