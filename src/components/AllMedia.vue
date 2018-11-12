<template>
  <div class="ui raised container segments">
  <div class="ui raised container segment" id=".vue-title">
    <h2 class="ui header">{{msg}}</h2>
  </div>
    <div class="ui raised container segment" id="app" >
      <v-client-table :columns="columns" :data="media" :options="options">
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
  name: 'AllMedia',
  data () {
    return {
      msg: 'All media',
      media: [],
      errors: [],
      columns: ['type', 'title', 'genre', 'rating', 'uri'],
      options: {
        headings: {
          type: 'Type',
          title: 'Title',
          genre: 'Genre',
          rating: 'Rating',
          uri: 'View'
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
    }
  }
}
</script>

<style>
</style>
