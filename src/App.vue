<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: 300;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 25px 10px;
  text-align: right;
  a {
    background-color: #fcfcfc;
    border: 1px solid #ccc;
    border-radius: 10px;
    color: #2c3e50;
    margin: 0 10px;
    padding: 8px 24px;
    text-decoration: none;
    &:hover {
      background-color: #f6f6f6;
      border: 1px solid #aaa;      
    }
    &.router-link-exact-active {
      color: #555;
    }
  }
}
</style>
