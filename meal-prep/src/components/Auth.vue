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
import { HTTP } from '@/request/http-common'

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
  // mounted() {
  //   axios
  //     .get('https://api.coindesk.com/v1/bpi/currentprice.json')
  //     .then(response => (console.log(response.data.bpi)));
  // },
  methods: {
    autharization: function(e){
      e.preventDefault();
       
      HTTP.post('/restautant/manager/auth', {
        body: { login:this.login, password:this.password }
      })
      .then(res => {
        console.log(res.data)
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
