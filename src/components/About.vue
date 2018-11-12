<template>
  <div>
  <div class="ui center aligned raised container segment" id="app">
    <h2 class="header">{{msg}}</h2>
  </div>
  </div>
</template>

<script>
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
  }
  h2{
    color:ghostwhite;
  }
</style>
