<template>
  <div id="app">
    <nav class="ui left fixed vertical menu">
      <div class="item">
        <img class="ui mini image" src="../src/assets/home-tv.png">
      </div>
      <b-navbar-nav>
        <div class="items">
          <b-nav-item to="/#">
            <a class ="item" id="Home"><i class="fa fa-home" style="padding: 5px"></i> Home </a>
          </b-nav-item>
          <b-nav-item to="/allmedia">
          <a class ="item" id="all-media"><i class="fa fa-book" style="padding: 5px"></i> All Media </a>
          </b-nav-item>
          <b-nav-item to="/movies">
            <a class ="item" id="movies"><i class="fa fa-film" style="padding: 5px"></i> Movies  </a>
          </b-nav-item>
          <b-nav-item to="/games">
            <a class ="item" id="games"><i class="fa fa-gamepad" style="padding: 5px"></i> Games  </a>
          </b-nav-item>
          <b-nav-item to="/about">
            <a class ="item" id="about"><i class="fa fa-question" style="padding: 5px"></i> About  </a>
          </b-nav-item>
        </div>
      </b-navbar-nav>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family:  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
