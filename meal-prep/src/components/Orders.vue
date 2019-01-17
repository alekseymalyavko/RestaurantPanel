<template>
  <div class="orders_panel">
    <div>
      
      <div class="orders_type" >
        <div class="orders_type_header">Новый <span>{{ newOrders.length }}</span></div>
        
        <div class="orders_type_list">
          <div :key="order.id" v-for="order in newOrders" :class="{active: isActive(order.id)}">
            <div class="order_info" @click="getCurrentOrder(order.id)">
              <span class="order_info_name">{{order.courier_name}} <span class="order_info_name_num">(№ {{order.id}})</span></span>
              <span class="order_info_time"><span>Ожидается доставка до {{convertTime(order.registration_time)}}</span> <span>{{convertTime(order.restaurant_arrival_time)}}</span></span>
              <span class="order_info_cost">{{order.order_cost}} BYN</span>
            </div>
          </div>
          <div class="order_info_empty" v-if="!newOrders[0]">
            Нет новых заказов
          </div>
        </div>

      </div>
      
      <div class="orders_type">
        <div class="orders_type_header">Принят <span>{{ acceptedOrders.length }}</span></div>
        
        <div class="orders_type_list">
          <div :key="order.id" v-for="order in acceptedOrders" :class="{active: isActive(order.id)}">
            <div class="order_info" @click="getCurrentOrder(order.id)">
              <span class="order_info_name">{{order.courier_name}} <span class="order_info_name_num">(№ {{order.id}})</span></span>
              <span class="order_info_time"><span>Доставка до {{convertTime(order.registration_time)}}</span> <span>{{convertTime(order.restaurant_arrival_time)}}</span></span>
              <span class="order_info_cost">{{order.order_cost}} BYN</span>
            </div>
          </div>
          <div class="order_info_empty" v-if="!acceptedOrders[0]">
            Нет принятых заказов
          </div>
        </div>

      </div>

      <div class="orders_type">
        <div class="orders_type_header">Готов к выдаче <span>{{ readyOrders.length }}</span></div>
        
        <div class="orders_type_list">
          <div :key="order.id" v-for="order in readyOrders" :class="{active: isActive(order.id)}">
            <div class="order_info" @click="getCurrentOrder(order.id)">
              <span class="order_info_name">{{order.courier_name}} <span class="order_info_name_num">(№ {{order.id}})</span></span>
              <span class="order_info_time"><span>Доставка до {{convertTime(order.registration_time)}}</span> <span>{{convertTime(order.restaurant_arrival_time)}}</span></span>
              <span class="order_info_cost">{{order.order_cost}} BYN</span>
            </div>
          </div>
          <div class="order_info_empty" v-if="!readyOrders[0]">
            Нет готовых заказов
          </div>
        </div>

      </div>

    </div>
    

  </div>
</template>

<script>
import moment from 'moment'

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
    isActive(target) {
      return target === this.$store.getters.getCurrentOrder.id
    },
    getCurrentOrder(id) {
      this.$store.dispatch("getCurrentOrder", id);
    },
    convertTime(time){
      return moment(time).format('LT')
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
      .active {
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

    & > span {
      pointer-events: none;
    }
    &:hover {
      background: #D6D8D9;
    }

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
