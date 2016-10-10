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
}
</style>
