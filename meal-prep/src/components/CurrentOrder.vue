<template>
  <div class="current_order_panel">
    <div class="current_order_panel_header">

      <div class="current_order_panel_header_first">
        <div class="current_order_panel_header_type">
          <span v-if="currentOrder.order_status === 0" class="new">Новый</span>
          <span v-if="currentOrder.order_status === 1 || currentOrder.order_status === 2" class="checked">Принят</span>
          <span v-if="currentOrder.order_status === 3" class="ready">Готов к выдаче</span>
        </div>

        <div class="current_order_panel_header_time" v-if="currentOrder.order_status === 0">
          Ожидается доставка до {{arrivalTime}}
        </div>
        <div class="current_order_panel_header_time" v-if="currentOrder.order_status > 0">
          Доставка до {{arrivalTime}}
        </div>
      </div>

      <div class="acceptButton new" @click="handlePopup" v-if="currentOrder.order_status === 0">
        Принять заказ
      </div>
      <div class="acceptButton checked" @click="readyToDelivery" v-if="currentOrder.order_status === 1 || currentOrder.order_status === 2">
        Готов к выдаче
      </div>
      <div class="acceptButton ready" @click="giveToDelivery" v-if="currentOrder.order_status === 3">
        Передать курьеру
      </div>
      
    
    </div>
    
    <div class="current_order_table">

      <div class="current_order_info">

        <div class="current_order_info_list" :key="dish.id" v-for="dish in currentOrder.dishes">
          <div class="current_order_info_list_dish">

            <div class="current_order_info_list_dish_main">
              <span>{{dish.quantity}} x {{dish.name}} </span> <span>{{dish.price}} BYN</span>
            </div> 
            <div class="current_order_info_list_dish_secondary" :key="option.id" v-for="option in dish.options">
              <span>{{option.count}} x {{option.name}} </span>
            </div>

          </div>
        </div>

        <div class="current_order_info_total">
          <div class="current_order_info_total_calc">
            <p>Промежуточная сумма <span>{{currentOrder.order_cost}}  BYN</span></p>
            <p>Стоимость доставки <span>0.00 BYN</span></p>  
          </div>
          <div class="current_order_info_total_price">
            <p>ИТОГО <span>{{currentOrder.order_cost}} BYN</span></p>
          </div>
        </div>

        <div class="current_order_info_more">
          <p>ПРИМЕЧАНИЕ К ЗАКАЗУ:</p>
          <ul>
            <li v-if="currentOrder.special_preferences">{{currentOrder.special_preferences}}</li>
            <li v-if="!currentOrder.special_preferences">Нет</li>
          </ul>
        </div>
      </div>
      
      <div class="current_order_courier">
        <p class="current_order_courier_info">ИНФОРМАЦИЯ О КУРЬЕРЕ:</p>
        <div class="current_order_courier_name">{{currentOrder.courier_name}}</div>
        <div class="current_order_courier_name">{{currentOrder.courier_phone}}</div>
        <p class="current_order_courier_info_delivery">ИНСТРУКЦИИ ПО ДОСТАВКЕ:</p>
        <p class="current_order_courier_info_people">Количество персон: {{currentOrder.cutlery}}</p>
      </div>

    </div>


    <Popup :currentOrder="currentOrder" :openPopup="openPopup" v-on:close="openPopup = false"/>.
  
  </div>
</template>

<script>
import Popup from "@/components/Popup.vue"
import moment from 'moment'
import { HTTP } from '@/request/http-common'

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
      const body = JSON.stringify({ minutes: this.minutes });

      HTTP.post(`/system/restaurant/order/${this.currentOrder.id}/readyToDelivery`, body)
      .then(res => {
        this.$store.dispatch("loadData");
      })
      .catch(e => {
        console.log(e);
        this.$router.push("/");
      })
    },
    giveToDelivery: function(e) {
      const body = JSON.stringify({ minutes: this.minutes });

      HTTP.post(`/system/restaurant/order/${this.currentOrder.id}/handed`, body)
      .then(res => {
        this.$store.dispatch("loadData");
      })
      .catch(e => {
        console.log(e);
        this.$router.push("/");
      })
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
        height: 65px;
        padding: 0 15px;
        border-bottom: 1px solid #DCDDDE;
        
        &_first {
          display: flex;
          align-items: center;

          & > div:first-child {
            margin-right: 18px;
          }
        }
        &_time {
          text-align: left;
          font-size: 16px;
        }
        &_type {
          span {
            color: #fff;
            padding: 4px 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 2px;
            font-size: 16px;
          }
        }
      }
    }
    &_table {
      display:flex;
      height: calc(100vh - 130px);

      .current_order_info {
        width: 70%;
        overflow: auto;
        padding-right: 15px;
        padding-bottom: 30px;
      }
      .current_order_courier {
        width: 30%;
        padding: 0px 15px 0px 10px;
        text-align: left;
        
        &_info {
          font-size: 14px;
          font-style: italic;

          &_delivery {
            margin-top: 24px;
            margin-bottom: 8px;
            font-size: 14px;
            font-style: italic;
          }

          &_people {
            font-size: 14px;
            margin-top: 8px;
          }
        }

        & > div {
          font-weight: 600;
          font-size: 24px;
          margin: 3px 0;
        }
      }
    }
    &_info {
      // padding: 20px;
      text-align: left;
      &_list {
        // padding: 5px 10px;

        &_dish {
          font-weight: 500;
          font-size: 16px;
          padding: 10px 16px;
          border-bottom: 1px solid #DCDDDE;

          &_main {
            display: flex;
            justify-content: space-between;
          }
          &_secondary{
            display: flex;
            flex-direction: column;
            font-size: 14px;
            color: #808080;
            margin-top: 8px;   
            margin-left: 28px;
          }

        }
      }
      &_total {
        padding-top: 16px;

        p {
          margin: 8px 0;
          display: flex;
          justify-content: space-between;
          padding: 0 10px;
          font-size: 16px;
        }

        &_calc {
          font-size: 14px;

          & p:first-child {
            font-weight: 600;
          }

          & p:last-child {
            color: #808080;
          }
        }
        &_price {
          margin-top: 5px;
          padding: 5px 0px;
          background: #1E282C;
          font-weight: 600;
          font-size: 18px;
          color: #fff;
        }
      }
      &_more {
          padding: 0 10px;
          & > p {
            font-weight: 600;
            font-style: italic;
            font-size: 14px;
            margin-bottom: 8px;
          }
          & > ul {
            margin: 0;
            font-weight: 500;
            font-size: 14px;
            padding-left: 20px;
          }
      }
    }
  }
  .acceptButton {
    padding: 14px 20px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 2px;
    font-size: 18px;
  }

  .new {
    background: #39E27F;
  }
  .checked {
    background: #1FA6E0;
  }
  .ready {
    background: #FC6621;
  }
  
  
</style>
