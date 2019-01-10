<template>
  <div class="main">    
    <div class="main_panel">
      <div class="main_panel_header">
        <div>Обработка заказа</div> 
        <div>Заказ {{order}}</div>
      </div>

      <div class="main_panel_aside">
        <Orders/>
      </div>
      
      <div class="main_panel_body">
        <CurrentOrder/>   
      </div>
    
    </div>
    <Popup/>
  </div>

</template>


<script>
import Orders from "@/components/Orders.vue";
import CurrentOrder from "@/components/CurrentOrder.vue";
import Popup from "@/components/Popup.vue";

export default {
  name: "Main",
  components: {
    Orders,
    CurrentOrder,
    Popup
  },
  data () {
    return {
      order: 56
    }
  },
  props: {

  },
  methods: {
    
  }
};
</script>

<style scoped lang="less">
  .main {

    &_panel {
      display:flex;
      flex-flow: row wrap;
      & > * {
        padding: 1em;
        flex: 1 100%;
      }
      &_header {
        background: #89c300;
        display: flex;
        justify-content: space-between;
        height: 25px;
      }

      &_aside {
        background: #eaeaea;
        flex: 1;
      }

      &_body {
        background: grey;
        flex: 4 0px;
      }
    }
  }
</style>