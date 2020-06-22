<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Krub');
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab');
@import 'styles/colors.css';

body {
  box-sizing: border-box;
  height: 100vh;
  margin: 0;
}

#app {
  background-color: #bbb;
  color: #2c3e50;
  font-family: 'Krub', Helvetica, Arial, sans-serif;
  font-weight: 300;
  font-size: 14px;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  h1 {
    font-family: 'Roboto Slab', serif;
  }
}
</style>
