<template>
  <div id="app">
    <h1>Vue js is working !</h1>
    <p>
      {{ sayHello() }}
    </p>
    <three-view />
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

</style>
