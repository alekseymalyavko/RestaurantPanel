<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/main">Main</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
  body {
    height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input {
      width: 85%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #b9b9b9;
      margin: 10px 5px;
      height: 30px;
      border-radius:2px;
      background-color: #fff;

      &[type="submit"]{
        width: 200px;
        height: 45px;
        background: #4d90f5;
        cursor: pointer;
        margin-top: 20px;
        color: #fff;
        font-weight: 600;
      }
    }
  }
</style>
