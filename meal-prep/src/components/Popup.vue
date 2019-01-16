<template>
  <div class="popup_wrapper" v-if="openPopup">
    <div class="form">

      <form name="popup" @submit="sendOrder">
        <span class="close_button" @click="$emit('close')">×</span>
        <h2>Принять заказ</h2>
        
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
            <span>Курьер прибудет</span>
            <span><strong>через {{minutes}} мин</strong></span>
            <span>в {{arrivalTimeWithDelivery}}</span>
          </div>
        </div>

        <input type="number" hidden name="orderId" v-model="orderId">
        <input type="number" hidden name="minutes" v-model="minutes">
        <input type="submit" value="Подтвердить">
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

      HTTP.post(`/system/restaurant/order/${this.orderId}/readylTime`, body)
      .then(res => {
        this.$store.dispatch("loadData");
        this.$emit('close');
      })
      .catch(e => {
        this.$router.push("/");
      })

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
    background: #F7F7F7;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #b9b9b9;
    position: relative;
    padding-top: 50px;

    h2 {
      font-size: 18px;
      position: absolute;
      top: 0;
      width: 100%;
      padding-bottom: 10px;
      border-bottom: 1px solid #E5E6E8;
    }
  }
  .calculator {
    position: relative;
    padding: 40px 0;

    &_block {
      background: #D6D8D9;
      border-radius: 2px ;

      width: 350px;
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
        font-size: 12px;

        & span {
          font-size: 40px;
          font-weight: 600;
        }
      }

      &_main {
        background: #E5E6E8;
        border-radius: 2px;
        width: 230px;
        position: absolute;
        top: 22px;
        left: 16%;
        padding: 20px 10px;
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
    z-index: 99;
  }
</style>
