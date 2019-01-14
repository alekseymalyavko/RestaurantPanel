<template>
  <div class="autharisation">
    
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
import { AUTH } from '@/request/http-common'
import axios from 'axios'

export default {
  name: "Auth",
  data () {
    return {
      login: "SkachkoDK",
      password: "87530952",
    }
  },
  props: {

  },
  methods: {
    autharization: function(e){
      e.preventDefault();
      
      const body = JSON.stringify({ login: this.login, password: this.password })

      AUTH.post('/restautant/manager/auth', body)
      .then(res => {
        document.cookie = `Authorization=${res.data.token};expires=86400 `;
      })
      .catch(e => {
        this.errors.push(e)
      })

      this.$router.options.routes[1].meta.authorized = true;
      this.$router.push("/main");
    }
  }
};
</script>

<style scoped lang="less">
  .autharisation {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
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
