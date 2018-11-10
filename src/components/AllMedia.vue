<template>
  <div class="ui raised container segment">
    <h2 class="ui header">{{msg}}</h2>
  </div>
</template>

<script>
export default {
  name: 'AllMedia',
  data () {
    return {
      msg: 'All media'
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
</style>
