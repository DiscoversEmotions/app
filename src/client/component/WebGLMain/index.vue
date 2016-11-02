<template>
  <div class="container" ref="render">

  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>


<script>
import WebGLMainApp from './WebGLMainApp';

export default  {
  data: () => ({
    webGLApp: null
  }),
  mounted() {
    this.webGLApp = new WebGLMainApp(this.$refs.render);
    this.webGLApp.boot();
  }
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
}
</style>
