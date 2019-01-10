<template>
  <div class="orders_panel">
    <div>
      
      <div class="orders_type" @click="showlist">
        <div class="orders_type_header">Новый <span>{{ newOrders.length }}</span></div>
        
        <div class="orders_type_list">
          <div :key="order.id" v-for="order in newOrders">
            <div class="order_info" @click="openOrder">
              <span>Номер: {{order.id}}</span>
              <span>Стоимость: {{order.order_cost}}</span>
              <span>Сделан заказ: {{new Date(order.registration_time).toLocaleDateString()}}</span>
            </div>
          </div>
        </div>

      </div>
      
      <div class="orders_type" @click="showlist">
        <div class="orders_type_header">Принят <span>{{ acceptedOrders.length }}</span></div>
        
        <div class="orders_type_list">
          <div :key="order.id" v-for="order in acceptedOrders">
            <div class="order_info" >
              <span>Номер: {{order.id}}</span>
              <span>Стоимость: {{order.order_cost}}</span>
              <span>Сделан заказ: {{new Date(order.registration_time).toLocaleDateString()}}</span>
            </div>
          </div>
        </div>

      </div>

      <div class="orders_type" @click="showlist">
        <div class="orders_type_header">Готов к выдаче <span>{{ readyOrders.length }}</span></div>
        
        <div class="orders_type_list">
          <div :key="order.id" v-for="order in readyOrders">
            <div class="order_info" >
              <span>Номер: {{order.id}}</span>
              <span>Стоимость: {{order.order_cost}}</span>
              <span>Сделан заказ: {{new Date(order.registration_time).toLocaleDateString()}}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
    

  </div>
</template>

<script>
export default {
  name: "Orders",
  data () {
    return {
      orders: [
          {
              id: 1,
              order_status: 0,
              order_cost: 12.5,
              special_preferences: "",
              cutlery: 1,
              registration_time: "2018-12-30T22:20:32.170Z",
              restaurant_arrival_time: "2018-12-30T22:49:15.110Z"
          },
          {
              id: 3,
              order_status: 2,
              order_cost: "12.5",
              special_preferences: "",
              cutlery: 1,
              registration_time: "2018-12-30T22:20:32.170Z",
              restaurant_arrival_time: "2018-12-30T22:49:15.110Z"
          },
          {
              id: 4,
              order_status: 1,
              order_cost: 12.5,
              special_preferences: "",
              cutlery: 1,
              registration_time: "2018-12-30T22:20:32.170Z",
              restaurant_arrival_time: "2018-12-30T22:49:15.110Z"
          },
          {
              id: 5,
              order_status: 2,
              order_cost: 12.5,
              special_preferences: "",
              cutlery: 1,
              registration_time: "2018-12-30T22:20:32.170Z",
              restaurant_arrival_time: "2018-12-30T22:49:15.110Z"
          },
          {
              id: 0,
              order_status: 3,
              order_cost: 12.5,
              special_preferences: "",
              cutlery: 1,
              registration_time: "2018-12-30T22:20:32.170Z",
              restaurant_arrival_time: "2018-12-30T22:49:15.110Z"
          },
      ],

      newOrders: [],
      acceptedOrders: [],
      readyOrders: [],
    }
  },
  mounted () {
    // this.orders = this.orders.sort((a, b) => a.order_status - b.order_status);
    
    this.newOrders = this.orders.filter((a)=> a.order_status === 0)
    this.acceptedOrders = this.orders.filter((a)=> a.order_status === 1 || a.order_status === 2)
    this.readyOrders = this.orders.filter((a)=> a.order_status === 3)

  },
  props: {

  },
  methods: {
    showlist: (e) => {
      e.target.nextElementSibling.classList.toggle("active")
    },
    openOrder: (e) => {
      console.log(e)
    }
  }
};
</script>

<style scoped lang="less">
.orders_panel {

  .orders_type {
    margin: 15px 0;
    cursor: pointer;

    &_header {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      background: white;
    }
    &_list {
      display: none;

      &.active {
        display: block;
      }
    }
  }
}
  .order_info {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 10px 0;
    background: #a2a2a2;
    border: 1px solid red;

    & span {
      padding: 0 3px;
      margin: 2px 0;
    }
  }
</style>
