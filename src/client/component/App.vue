<template>
  <div class="app-container">
    <!-- <web-gl-main /> -->
    <web-gl-room />
    <hello />
  </div>
</template>

<script>
import WegGLMain from '~/component/WebGLMain';
import WegGLRoom from '~/component/WebGLRoom';
import Hello from '~/component/Hello';

export default {
  name: 'app',
  components: {
    'web-gl-main': WegGLMain,
    'web-gl-room': WegGLRoom,
    Hello
  }
};
</script>

<style scoped lang="scss">
  .app-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
<style lang="scss">
  @import "../../../node_modules/normalize.css/normalize.css";

  html, body {
    color: white;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>
