<template>
  <div class="main">    
    <div class="main_panel">
      <div class="main_panel_header">
        <div>Обработка заказа</div> 
        <div>Заказ {{currentOrder.id}}</div>
      </div>

      <div class="main_panel_aside">
        <Orders :orders="orders" :key="Math.random()"/>
      </div>
      
      <div class="main_panel_body">
        <CurrentOrder :currentOrder="currentOrder" v-show="currentOrder.id"/> 
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
import { mapState, mapGetters } from 'vuex';


export default {
  name: "Main",
  components: {
    Orders,
    CurrentOrder,
  },
  computed: {
    ...mapState(['orders', 'currentOrder']),
  },
  created() {
    this.$store.dispatch("loadData");
  },
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
        background: #E5E7E8;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        height: 65px;
        padding: 0 15px;
        border: 1px solid rgba(128, 128, 128, 0.2);

        & > div:first-child {
          margin-right: 45%;
        }
      }

      &_aside {
        background: #eaeaea;
        flex: 1;
        height: calc(100vh - 65px);
        overflow: auto;
        min-width: 220px;
      }

      &_body {
        flex: 3 0px;
        position:relative;
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