import Vue from "vue";
import Vuex from "vuex";
import { HTTP } from '@/request/http-common'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    orders:[],
    currentOrder:{},
  },

  getters: {
    getOrders(state) {
      return state.orders
    },
    getCurrentOrder(state) {
      return state.currentOrder
    }
  },

  mutations: {
    updateOrders(state, orders) {
      state.orders = orders
    },
    updateCurrentOrder(state, currentOrder) {
      state.currentOrder = currentOrder
    }
  },

  actions: {
    loadData({commit}){
      HTTP.get('/system/restaurant/orders')
      .then(res => {
        commit('updateOrders', res.data)
      })
      .catch(e => {
        this.$router.push("/");
      })
    },

    getCurrentOrder({ commit }, id) {
      HTTP.get(`/system/restaurant/order/${id}`)
      .then(res => {
        commit('updateCurrentOrder', res.data)
      })
      .catch(e => {
        this.$router.push("/");
      })
    }
  }
});
