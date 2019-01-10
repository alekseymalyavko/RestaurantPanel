<template>
  <div class="popup_wrapper" v-show="false">
    <div class="form">
      <form name="popup" @submit="sendOrder">
        <h2>Принять заказ</h2>
        <p>Клиент ожидает доставку заказа в 16:56</p>
        
        <div class="calculator">
          <div class="calculator_block">
            <div class="calculator_sign" @click="minutes -= 5">
              <span>-</span>
              5 мин
            </div>
            <div class="calculator_sign" @click="minutes += 5">
              <span>+</span>
              5 мин
            </div>
          </div>

          <div class="calculator_block_main">
            <span>Доставка </span>
            <span><strong>в течении {{minutes}} мин</strong></span>
            <span>в 15:25</span>
          </div>
        </div>

        <input type="number" hidden name="minutes" v-model="minutes">
        <input type="submit" value="Отправить">
      </form>
    </div>

  </div>
</template>

<script>
export default {
  name: "Popup",
  data () {
    return {
      minutes: 15
    }
  },
  methods: {
    sendOrder: function(e) {
      e.preventDefault();
      // const minutes = this.minutes;
      console.log(this.minutes)
    }
  }
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
</style>
