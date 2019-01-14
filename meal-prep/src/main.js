import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from 'axios'
import VueAxios from 'vue-axios'

import moment from 'moment'
moment.lang('ru');


Vue.use(VueAxios, axios)


// Vue.config.productionTip = false;
// router.beforeEach((to, from, next) => {
//   if(to.meta.authorized === false) {
//     next(from)
//   } else {
//     next()
//   }
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
