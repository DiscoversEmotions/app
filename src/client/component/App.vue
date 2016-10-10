<template>
  <div id="app">
    <h1>Vue js is working !</h1>
    <p>
      {{ sayHello() }}
    </p>
  </div>
</template>

<script>

export default {
  methods: {
    sayHello() {
      return 'Hello !!'
    }
  }
}
</script>

<style>

</style>
