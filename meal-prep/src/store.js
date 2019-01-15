import Vue from "vue";
import Vuex from "vuex";
// import { HTTP } from '@/request/http-common'

Vue.use(Vuex);

export default new Vuex.Store({
//   state: {
//     orders:[],
//     currentOrder:{},
//   },
//   getters: {
//     getOrders(state) {
//       return state.orders
//     },
//     getCurrentOrder(state) {
//       return state.currentOrder
//     }
//   },
//   mutations: {
//     updateOrders(state, orders) {
//       state.orders = orders
//     },
//     updateCurrentOrder(state, CurrentOrder) {
//       state.CurrentOrder = CurrentOrder
//     }
//   },
//   actions: {
//     loadData({commit}){
//       HTTP.get('/system/restaurant/orders')
//       .then(res => {
//         commit('updateOrders', res.data)
//       })
//       .catch(e => {
//         this.errors.push(e)
//       })
//     }
//   }
});
