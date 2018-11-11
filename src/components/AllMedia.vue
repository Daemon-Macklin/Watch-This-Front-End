<template>
  <div class="ui raised container segments">
  <div class="ui raised container segment" id=".vue-title">
    <h2 class="ui header">{{msg}}</h2>
  </div>
    <div class="ui raised container segment" id="data" >
      <v-client-table :columns="columns" :data="media" :options="options">
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
      columns: ['type', 'title', 'genre', 'rating'],
      options: {
        headings: {
          type: 'Type',
          title: 'Title',
          genre: 'Genre',
          rating: 'Rating'
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

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }

  #app1 {
    width: 60%;
    margin: 0 auto;
  }
</style>
