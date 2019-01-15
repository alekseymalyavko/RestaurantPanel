<template>
  <div class="popup_wrapper" v-if="openPopup">
    <div class="form">

      <form name="popup" @submit="sendOrder">
        <h2>Принять заказ</h2><span class="close_button" @click="$emit('close')">×</span>
        <p>Клиент ожидает доставку заказа в {{arrivalTime}}</p>
        
        <div class="calculator">
          <div class="calculator_block">
            <div class="calculator_sign" @click="sub">
              <span>-</span>
              5 мин
            </div>
            <div class="calculator_sign" @click="add">
              <span>+</span>
              5 мин
            </div>
          </div>

          <div class="calculator_block_main">
            <span>Доставка </span>
            <span><strong>в течении {{minutes}} мин</strong></span>
            <span>в {{arrivalTimeWithDelivery}}</span>
          </div>
        </div>

        <input type="number" hidden name="orderId" v-model="orderId">
        <input type="number" hidden name="minutes" v-model="minutes">
        <input type="submit" value="Отправить">
      </form>
    </div>

  </div>
</template>

<script>
import { HTTP } from '@/request/http-common'
import moment from 'moment'

export default {
  name: "Popup",
  data () {
    return {
      orderId: this.currentOrder.id,
      minutes: 15,
      arrivalTime: moment(this.currentOrder.restaurant_arrival_time).format('LT'),
      arrivalTimeWithDelivery: moment(this.currentOrder.restaurant_arrival_time).add(this.minutes,'m').format('LT'),
    }
  },
  props: {
    currentOrder: Object,
    openPopup: Boolean,
  },
  watch: {
    minutes: function(val){
      this.arrivalTimeWithDelivery = moment(this.currentOrder.restaurant_arrival_time).add(this.minutes,'m').format('LT');
    }
  },
  mounted(){
    
  },
  methods: {
    add: function(e) {
      this.minutes += 5
    },
    sub: function(e) {
      this.minutes > 5 ? this.minutes -= 5 : false
    },
    sendOrder: function(e) {
      e.preventDefault();
      const body = JSON.stringify({ minutes:this.minutes })
      //для готовки
      HTTP.post(`/system/restaurant/order/${this.orderId}/readylTime`, body)
      .then(res => {
        alert("Отправленно");
        console.log(res)
      })
      .catch(e => {
        this.errors.push(e)
      })

      this.$emit('close');
      // //для доставки
      // HTTP.post(`/system/restaurant/order/${this.orderId}/readyToDelivery`, body)
      // .then(res => {
      //   console.log(res)
      // })
      // .catch(e => {
      //   this.errors.push(e)
      // })

    }
  },
  
};
</script>

<style scoped lang="less">
  .popup {
    &_wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: #000000d1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .form {
    display: block;
    margin: auto;
    width: 400px;
    min-height: 200px;
    background: #ececec;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #b9b9b9;
    position: relative;
  }
  .calculator {
    position: relative;
    padding: 40px 0;

    &_block {
      width: 350px;
      background: grey;
      border-radius: 2px;
      // height: 40px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select:none;

      & .calculator_sign {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;

        & span {
          font-size: 25px;
          font-weight: 600;
        }
      }

      &_main {
        width: 135px;
        background: #fff;
        position: absolute;
        top: 17px;
        left: 26%;
        height: 70px;
        padding: 20px;
        border: 1px solid grey;
        display: flex;
        flex-direction: column;

        & span {
          margin: 3px 0;
        }
      }
    }
  }
  .close_button {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 0.6;
    font-size: 40px;
    padding: 5px;
    cursor: pointer;
  }
</style>
