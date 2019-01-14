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
        <CurrentOrder :currentOrder="currentOrder" /> 
        <!-- <div class="loading_wrapper" v-if="!currentOrder.id"><div class="loading"></div></div>-->
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
      orders: [],
      currentOrder: {
    "id": 1,
    "order_status": 0,
    "order_cost": "12.5",
    "special_preferences": "",
    "cutlery": 1,
    "courier_name":"Денис",
    "courier_surname":"Киррилович",
    "courier_lastname":"Скачко",
    "courier_phone":"+375293451287",
    "registration_time": "2018-12-30T22:20:32.170Z",
    "restaurant_arrival_time": "2018-12-30T22:49:15.110Z",
    "dishes": [
        {
            "price": "9.5",
            "quantity": 1,
            "name": "Нагетсы",
            "size": "9 штук",
            "options": [
                {
                    "name": "Дополнительный нагетс",
                    "price": "2",
                    "count": "1"
                }
            ]
        },
        {
            "price": "1",
            "quantity": 1,
            "name": "Картошка фри",
            "size": "Большая",
            "options": []
        }
    ]
},
    }
  },
  mounted(){
    HTTP.get('/system/restaurant/orders')
    .then(res => {
      console.log(res.data)
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    getCurrentOrder(id) {

      HTTP.get(`/system/restaurant/order/${id}`)
      .then(res => {
        console.log(res.data)
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
        position:relative;
        // background: #d8d8d8;
      }
    }
  }
  .loading {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255,255,255,.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
  }
  .loading_wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: #000000d1;
    display:flex;
    justify-content:center;
    align-items:center;
  }

  @keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
</style>