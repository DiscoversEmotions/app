<template>
  <div class="container">
  </div>
</template>

<script>
import WebGLMainApp from './WebGLMainApp';

export default {
  mounted() {
    this.app = new WebGLMainApp(this.$el);
    this.app.boot();
  }
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
