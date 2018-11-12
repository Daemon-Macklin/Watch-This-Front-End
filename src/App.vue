<template>
  <div>
    <b-navbar-nav class="ui left fixed vertical menu" id="menu">
    <div class="item">
        <img class="ui small image" src="https://media1.tenor.com/images/a79023c01372d18caedda850481aed68/tenor.gif?itemid=3532334">
    </div>
          <b-nav-item id="home" to="/#" v-on:click="setActive('home')" class="link item">
            <i class="fa fa-home" style="padding: 5px"> Home </i>
          </b-nav-item>
          <b-nav-item id="allmedia" to="/allmedia" v-on:click="setActive('allmedia')" class ="link item">
          <i class="fa fa-book" style="padding: 5px">All Media</i>
          </b-nav-item>
          <b-nav-item id="movies" to="/movies" v-on:click="setActive('movies')" class ="link item">
            <i class="fa fa-film" style="padding: 5px"> Movies </i>
          </b-nav-item>
          <b-nav-item id="games" to="/games" v-on:click="setActive('games')" class ="link item">
            <i class="fa fa-gamepad" style="padding: 5px"> Games </i>
          </b-nav-item>
          <b-nav-item id="addmedia" to="/addmedia" v-on:click="setActive('addmedia')" class ="link item">
            <i class="fa fa-plus-square" style="padding: 5px"> Add Media </i>
          </b-nav-item>
          <b-nav-item id="about" to="/about" v-on:click="setActive('about')" class ="link item">
            <i class="fa fa-question" style="padding: 5px"> About </i>
          </b-nav-item>
      </b-navbar-nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return { activeItem: '' }
  },
  methods: {
    setActive: function (menuItem) {
      console.log(menuItem)
      try {
        document.getElementById(this.activeItem).setAttribute('class', 'link item')
      } catch (e) {
        console.log(e)
      }
      document.getElementById(menuItem).setAttribute('class', 'active link item')
      this.activeItem = menuItem
    }
  }
}
</script>

<style>
  #menu{
    background-color: slategrey;
  }
  i{
    color: #122034;
  }
</style>
