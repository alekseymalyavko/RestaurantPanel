<template>
  <div class="">
    
    <div class="form">
      <h2 class="">Вход</h2>
      <form name="auth_form" @submit="autharization">
        <input type="text" placeholder="Логин" name="login" v-model="login" required>
        <input type="password" placeholder="Пароль" name="password" v-model="password" required>
        <input type="submit" value="Войти">
      </form>
    </div>

  </div>
</template>

<script>
export default {
  name: "Auth",
  data () {
    return {
      login: null,
      password: null,
    }
  },
  props: {

  },
  methods: {
    autharization: function(e){
      e.preventDefault();
      const login = this.login;
      const password = this.password;

      console.log(login, password)
    }
  }
};
</script>

<style scoped lang="less">
  .form {
    display: block;
    margin: auto;
    width: 400px;
    min-height: 200px;
    background: #ececec;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #b9b9b9;
  }
</style>
