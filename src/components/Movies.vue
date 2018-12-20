<template>
  <div>
    <div class="ui center aligned raised container segment" id="app">
      <h2 class="ui header" id="title">{{msg}}</h2>
    </div>
    <h4 class="ui horizontal divider">
    </h4>
    <div class="ui center aligned raised container segment" id="app">
      <v-client-table :columns="columns" :data="movies" :options="options">
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
  name: 'Home',
  data () {
    return {
      msg: 'Movies',
      movies: [],
      errors: [],
      columns: ['title', 'genre', 'rating', '_id'],
      options: {
        headings: {
          title: 'Title',
          genre: 'Genre',
          rating: 'Rating',
          _id: 'View'
        }
      }
    }
  },
  // When page loads do this
  created () {
    this.loadMovies()
  },
  methods: {
    // this page loads all of the movies
    loadMovies: function () {
      WatchThisService.fetchAllMovies()
        .then(response => {
          this.movies = response.data
          console.log(this.movies)
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
  h2{
    color:ghostwhite;
  }
  i{
    color:black;
  }
</style>
