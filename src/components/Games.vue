<template>
  <div>
  <div class="ui center aligned raised container segment" id="app">
    <h2 class="header">{{msg}}</h2>
  </div>
    <h4 class="ui horizontal divider">
    </h4>
    <div class="ui center aligned raised container segment" id="app">
      <v-client-table :columns="columns" :data="games" :options="options">
        <a slot="uri" slot-scope="props" target="_blank" href=""><i class="center aligned fa fa-search " style="padding: 5px"></i></a>
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
      msg: 'Games',
      games: [],
      errors: [],
      columns: ['title', 'genre', 'rating', 'uri'],
      options: {
        headings: {
          title: 'Title',
          genre: 'Genre',
          rating: 'Rating',
          uri: 'View'
        }
      }
    }
  },
  created () {
    this.loadGames()
  },
  methods: {
    loadGames: function () {
      WatchThisService.fetchAllGames()
        .then(response => {
          this.games = response.data
          console.log(this.games)
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
</style>
