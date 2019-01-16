<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
  body {
    height: 100vh;
    overflow: hidden;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #1E282C;
    font-weight: 500;
    line-height: normal;
    font-size: 18px;
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
        background: #39E27F;
        cursor: pointer;
        margin-top: 20px;
        border-radius: 2px;
        color: #fff;
        font-weight: 600;
        border:none;
      }
    }
  }
</style>
