<template>
  <div class="orders_panel">
    <div>
      
      <div class="orders_type" >
        <div class="orders_type_header">Новый <span>{{ newOrders.length }}</span></div>
        
        <!-- <div class="orders_type_list"> -->
          <!-- <div :key="order.id" v-for="order in newOrders"> -->
            <!-- <div class="order_info" @click="getCurrentOrder(order.id)">
              <span class="order_info_name">Алексей <span class="order_info_name_num">(№ 3)</span></span>
              <span class="order_info_time"><span>Ожидается доставка до 16:20</span> <span>15:20</span></span>
              <span class="order_info_cost">110.00 BYN</span>
            </div> -->
          <!-- </div> -->
          <!-- <div class="order_info_empty">
            Нет новых заказов
          </div>
        </div> -->

        <div class="orders_type_list">
          <div :key="order.id" v-for="order in newOrders">
            <div class="order_info" @click="getCurrentOrder(order.id)">
              <span>Номер: {{order.id}}</span>
              <span>Стоимость: {{order.order_cost}}</span>
              <span>Сделан заказ: {{new Date(order.registration_time).toLocaleDateString()}}</span>
            </div>
          </div>
        </div>

      </div>
      
      <div class="orders_type">
        <div class="orders_type_header">Принят <span>{{ acceptedOrders.length }}</span></div>
        
        <div class="orders_type_list">
          <div :key="order.id" v-for="order in acceptedOrders">
            <div class="order_info" @click="getCurrentOrder(order.id)">
              <span>Номер: {{order.id}}</span>
              <span>Стоимость: {{order.order_cost}}</span>
              <span>Сделан заказ: {{new Date(order.registration_time).toLocaleDateString()}}</span>
            </div>
          </div>
        </div>

      </div>

      <div class="orders_type">
        <div class="orders_type_header">Готов к выдаче <span>{{ readyOrders.length }}</span></div>
        
        <div class="orders_type_list">
          <div :key="order.id" v-for="order in readyOrders">
            <div class="order_info" @click="getCurrentOrder(order.id)">
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
      newOrders: [],
      acceptedOrders: [],
      readyOrders: [],
    }
  },
  props: {
    orders: Array,
  },
  mounted () {
    this.newOrders = this.orders.filter((a)=> a.order_status === 0)
    this.acceptedOrders = this.orders.filter((a)=> a.order_status === 1 || a.order_status === 2)
    this.readyOrders = this.orders.filter((a)=> a.order_status === 3)
  },
  methods: {
    showlist: (e) => {
      // console.log(e)
      e.target.parentElement.classList.toggle("active")
    },
    openOrder: (e) => {
      console.log(e)
    },
    getCurrentOrder(id) {
      this.$store.dispatch("getCurrentOrder", id);
    }
  }
};
</script>

<style scoped lang="less">
.orders_panel {

  .orders_type {
    // margin: 5px 0;
    cursor: pointer;

    &_header {
      display: flex;
      justify-content: space-between;
      padding: 7px 10px;
      background: #1E282C;
      position: relative;
      font-size: 14px;
      color:#fff;
      text-transform: uppercase;

    }
    &_list {
      
      & > div {
        background: #D6D8D9;
      }
      & > div:nth-child(odd){
        background: #fff;
      }
    }
  }
}
  .order_info {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 10px 5px;
    font-size: 14px;

    &_name {
      font-weight: 600;
      font-size: 20px;
      display: flex;
      align-items: center;

      &_num {
        margin-left: 10px;
        font-size: 12px;
        font-weight: 500;
        color: #808080;
      }
    }

    &_time {
      font-weight: normal;
      font-size: 12px;
      margin: 14px 0 9px 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    &_cost {
      font-size: 12px;
      color: #808080;
    }

    &_empty {
      font-size: 14px;
      text-align: left;
      padding: 7px 5px;
    }
  }
</style>
