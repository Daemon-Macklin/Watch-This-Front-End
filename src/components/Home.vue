<template>
  <div>
    <div class="ui center aligned raised container segment" id="app">
      <h2 class="ui header" id="title">{{msg}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Home Page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
