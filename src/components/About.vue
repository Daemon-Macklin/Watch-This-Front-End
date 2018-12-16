<template>
  <div>
  <div class="ui center aligned raised container segment" id="app">
    <h2 class="ui header" id="title">{{msg}}</h2>
  </div>
    <h4 class="ui horizontal divider"></h4>
    <div class="ui center aligned raised container segment" id="app">
      <h2> What is Watch This? </h2>
      <p>
        Watch this a media sharing application that allows users to signup, submit and review Movies and Games.
        This project was made for my Web Application Development Class as a front end to the
        <a href="https://github.com/Daemon-Macklin/Watch-ThisV1">back end</a> we developed.
        More details about this project is on <a href="https://github.com/Daemon-Macklin/Watch-This-Front-End">github</a>
      </p>
    </div>
  </div>
</template>

<script>
// import App from '@/App'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'About'
    }
  }
}
</script>

<style scoped>
  #app{
    width: 65%;
    margin: 0 auto;
    background-color: slategray;
    color: ghostwhite;
  }
  h2{
    color:ghostwhite;
  }
  i{
    color:black;
  }
  a{
    color: white;
  }
</style>
