<template>
  <div class="ui center aligned raised container segments">
    <div class="ui raised container segment" id="app">
      <h2 class="header">{{msg}}</h2>
    </div>
    <div class="ui raised container segment" id="app">
      <v-client-table :columns="columns" :data="movies" :options="options">
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
      columns: ['title', 'genre', 'rating'],
      options: {
        headings: {
          title: 'Title',
          genre: 'Genre',
          rating: 'Rating'
        }
      }
    }
  },
  created () {
    this.loadMovies()
  },
  methods: {
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

<style>
  #app{
    width: 65%;
    margin: 0 auto;
    background-color: slategray;
  }
  h2{
    color:ghostwhite;
  }
</style>
