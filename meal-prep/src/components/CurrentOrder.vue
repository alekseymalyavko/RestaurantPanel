<template>
  <div class="current_order_panel">
    <div class="current_order_panel_header">

      <div class="current_order_panel_header_type">
        <span v-if="currentOrder.order_status === 0" >Новый</span>
        <span v-if="currentOrder.order_status === 1 || currentOrder.order_status === 2">Принят</span>
        <span v-if="currentOrder.order_status === 3">Готов к выдаче</span>
      </div>

      <div class="current_order_panel_header_time" v-if="currentOrder.order_status > 0">
        Ожидается доставка {{arrivalTime}}
      </div>

      <div class="acceptButton" @click="handlePopup" v-if="currentOrder.order_status === 0">
        Принять заказ
      </div>

      <div class="acceptButton" @click="readyToDelivery" v-if="currentOrder.order_status === 1 || currentOrder.order_status === 2">
        Готов к выдаче
      </div>

      <div class="acceptButton" @click="giveToDelivery" v-if="currentOrder.order_status === 3">
        Передать курьеру
      </div>
    
    </div>
    
    <div class="current_order_table">

      <div class="current_order_info">
        <div class="current_order_info_list" :key="dish.id" v-for="dish in currentOrder.dishes">
          <div class="current_order_info_list_dish">
            <span>{{dish.quantity}} x {{dish.name}} ({{dish.size}})</span> <span>{{dish.price}} руб.</span>
          </div>
        </div>
        <div class="current_order_info_total">
          <div class="current_order_info_total_calc">
            <p>Промежуточная сумма <span>{{currentOrder.order_cost}}  руб.</span></p>
            <p>Стоимость доставки <span>0.00 руб.</span></p>  
          </div>
          <div class="current_order_info_total_price">
            <p>Итого <span>{{currentOrder.order_cost}} руб.</span></p>  
          </div>
        </div>
      </div>
      
      <div class="current_order_courier">
        <div class="current_order_courier_name">{{currentOrder.courier_name}}</div>
        <div class="current_order_courier_name">{{currentOrder.courier_phone}}</div>
      </div>

    </div>


    <Popup :currentOrder="currentOrder" :openPopup="openPopup" v-on:close="openPopup = false"/>.
  
  </div>
</template>

<script>
import Popup from "@/components/Popup.vue"
import moment from 'moment'

export default {
  name: "CurrentOrder",
  components: {
    Popup
  },
  props: {
    currentOrder: Object,
  },
  data () {
    return {
      arrivalTime: moment(this.currentOrder.restaurant_arrival_time).format('LT'),
      openPopup: false,
    }
  },
  mounted () {

  },
  methods: {
    handlePopup: function(e) {
      this.openPopup = true
    },
    readyToDelivery: function(e) {
      console.log(this.currentOrder.id)
      // HTTP.post(`/system/restaurant/order/${this.orderId}/readyToDelivery`, body)
      // .then(res => {
      //   console.log(res)
      // })
      // .catch(e => {
      //   this.errors.push(e)
      // })
    },
    giveToDelivery: function(e) {
      console.log(this.currentOrder.id)
    }
  }
};
</script>

<style scoped lang="less">
  .current_order {
    &_panel {

      &_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15px;

        &_type {
          padding: 3px 10px;
          background: #0070ff;
          border-radius: 15px;
          color: #fff;
        }
      }
    }
    &_table {
      display:flex;

      .current_order_info {
        width: 70%;
      }
      .current_order_courier {
        width: 30%;
        padding: 0 20px;
        text-align: left;
        
        & > div {
          font-weight: 600;
          font-size: 18px;
          margin: 10px 0;
        }
      }
    }
    &_info {
      // padding: 20px;
      text-align: left;
      &_list {
        padding: 5px 10px;
        border-bottom: 1px solid grey;

        &_dish {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
        }
      }
      &_total {
        padding-top: 20px;

        p {
          margin: 5px 0;
          display: flex;
          justify-content: space-between;
          padding: 0 10px;
        }

        &_calc {
          font-size: 14px;
        }
        &_price {
          padding: 10px 0;
          background: #eaeaea;
          border-radius:3px;
          font-weight: 600;
        }
      }
    }
  }
  .acceptButton {
    padding: 10px;
    width: 120px;
    height: 30px;
    background: orange;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 3px;
  }
  
</style>
