<template>
  <div id="app">
    <three-view />
    <div class="content">
      <h1>Vue js is working !</h1>
      <p>
        {{ sayHello() }}
      </p>
    </div>
  </div>
</template>

<script>
import ThreeView from '~/ThreeView';

export default {
  components: {
    'three-view': ThreeView
  },
  methods: {
    sayHello() {
      return 'Hello !!'
    }
  }
}
</script>

<style lang="scss">
@import "../../../node_modules/normalize.css/normalize.css";

html, body {
  color: white;
}

#app {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>
