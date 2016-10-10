<template>
  <div class="container">
  </div>
</template>

<script>
import App from '../core/App.js';

export default {
  mounted() {
    console.log(this.$el);
    console.log('start three')
    this.app = App.begin(this.$el);
  },
}
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 500px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
