<template>
  <div class="main">    
    <div class="main_panel">
      <div class="main_panel_header">
        <div>Обработка заказа</div> 
        <div>Заказ</div>
      </div>

      <div class="main_panel_aside">
        <Orders :orders="orders" :key="Math.random()" v-on:getCurrentOrder="getCurrentOrder"/>
      </div>
      
      <div class="main_panel_body">
        <CurrentOrder :currentOrder="currentOrder" :key="Math.random()" v-show="currentOrder.id"/> 
        <!-- <div class="loading_wrapper" v-if="!currentOrder.id"><div class="loading"></div></div>-->
      </div>
    
    </div>
  </div>

</template>


<script>
import Orders from "@/components/Orders.vue";
import CurrentOrder from "@/components/CurrentOrder.vue";
import { HTTP } from '@/request/http-common'
import { exit } from '@/request/exit';
import { deleteCookie } from '@/request/cookie';


export default {
  name: "Main",
  components: {
    Orders,
    CurrentOrder,
  },
  data () {
    return {
      orders: [],
      currentOrder: {},
    }
  },
  created() {
    HTTP.get('/system/restaurant/orders')
    .then(res => {
      this.orders = res.data
    })
    .catch(e => {
      exit(e)
    })
  },
  methods: {
    getCurrentOrder(id) {
      console.log(id)
      HTTP.get(`/system/restaurant/order/${id}`)
      .then(res => {
        this.currentOrder = res.data
      })
      .catch(e => {
        exit(e)
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
        height: calc(100vh - 45px);
        overflow: auto;
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