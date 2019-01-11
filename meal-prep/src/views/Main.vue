<template>
  <div class="main">    
    <div class="main_panel">
      <div class="main_panel_header">
        <div>Обработка заказа</div> 
        <div>Заказ</div>
      </div>

      <div class="main_panel_aside">
        <Orders :orders="orders" v-on:getCurrentOrder="getCurrentOrder"/>
      </div>
      
      <div class="main_panel_body">
        <CurrentOrder :currentOrder="currentOrder"/>   
      </div>
    
    </div>
  </div>

</template>


<script>
import Orders from "@/components/Orders.vue";
import CurrentOrder from "@/components/CurrentOrder.vue";
import { HTTP } from '@/request/http-common'

export default {
  name: "Main",
  components: {
    Orders,
    CurrentOrder,
  },
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
      currentOrder: {
          id: 1,
          order_status: 0,
          order_cost: 12.5,
          special_preferences: "",
          cutlery: 1,
          registration_time: "2018-12-30T22:20:32.170Z",
          restaurant_arrival_time: "2018-12-30T22:49:15.110Z",
          dishes: [
              {
                  price: 9.5,
                  quantity: 1,
                  name: "Нагетсы",
                  size: "9 штук",
                  options: [
                      {
                          name: "Дополнительный нагетс",
                          price: 2,
                          count: 1
                      }
                  ]
              },
              {
                  price: 1,
                  quantity: 1,
                  name: "Картошка фри",
                  size: "Большая",
                  options: []
              }
          ]
      },
      date: 1,
    }
  },
  mounted(){
    HTTP.get('/system/restaurant/orders')
    .then(res => {
      this.date = res.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  props: {

  },
  methods: {
    getCurrentOrder(id) {

      HTTP.get(`/system/restaurant/order/${id}`)
      .then(res => {
        this.currentOrder = res.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
};
</script>

<style scoped lang="less">
  .main {

    &_panel {
      display:flex;
      flex-flow: row wrap;

      & > * {
        flex: 1 100%;
      }
      
      &_header {
        background: #89c300;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 45px;
        padding: 0 15px;
      }

      &_aside {
        background: #eaeaea;
        flex: 1;
        height: 80vh
      }

      &_body {
        padding: 10px;
        flex: 3 0px;
        // background: #d8d8d8;
      }
    }
  }
</style>