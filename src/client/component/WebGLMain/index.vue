<template>
  <div class="container">

  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>


<script>
export default  {
  mounted() {
    console.log('mounted');
  }
};
// import { Component, ConnectToStore } from '~/core/interface';
// import WebGLMainApp from './WebGLMainApp';
// import dominus from 'dominus';
// import styles from './WebGLMain';
//
// class WebGLMain extends Component {
//
//   constructor ($parent) {
//     super($parent);
//     this.$el.addClass(styles.container);
//
//     this.webGLApp = new WebGLMainApp(this.$el[0]);
//     this.webGLApp.boot();
//   }
//
//   update () {
//   }
//
// }
//
// export default ConnectToStore()(WebGLMain);
</script>

<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgb(38, 38, 38);
  }
</style>
