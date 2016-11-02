<template>
  <div id="app">
    <p>
      Hello !
    </p>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
<style lang="scss">
  @import "../../../../node_modules/normalize.css/normalize.css";

  html, body {
    color: white;
  }

  #app {
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
